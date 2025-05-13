import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Eye, EyeSlash } from '@phosphor-icons/react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { confirmPasswordReset } from 'firebase/auth';
import { auth } from '../../lib/firebase';

const resetPasswordSchema = z
	.object({
		newPassword: z.string().min(8, 'Password must be at least 8 characters').regex(/[A-Z]/, 'Must contain at least one uppercase letter').regex(/[0-9]/, 'Must contain at least one number'),
		confirmPassword: z.string().min(8, 'Password must be at least 8 characters').regex(/[A-Z]/, 'Must contain at least one uppercase letter').regex(/[0-9]/, 'Must contain at least one number'),
	})
	.refine(data => data.newPassword === data.confirmPassword, {
		message: 'Passwords do not match',
		path: ['confirmPassword'],
	});

type ResetPasswordFormData = z.infer<typeof resetPasswordSchema>;

export function ResetPassword() {
	const [searchParams] = useSearchParams();
	const oobCode = searchParams.get('oobCode');

	const [showPassword, setShowPassword] = useState(false);
	const [showConfirmPassword, setShowConfirmPassword] = useState(false);
	const [isProcessing, setIsProcessing] = useState(false);
	const [isSuccess, setIsSuccess] = useState(false);
	const [error, setError] = useState('');

	const {
		register,
		handleSubmit,
		formState: { errors, isValid },
	} = useForm<ResetPasswordFormData>({
		resolver: zodResolver(resetPasswordSchema),
		mode: 'onChange',
	});

	useEffect(() => {
		if (!oobCode) {
			setError('Invalid or expired password reset link.');
		}
	}, [oobCode]);

	const onSubmit = async (data: ResetPasswordFormData) => {
		if (!oobCode) return;

		setIsProcessing(true);
		setError('');

		try {
			await confirmPasswordReset(auth, oobCode, data.newPassword);
			setIsSuccess(true);
		} catch (err: unknown) {
			if (err instanceof Error) {
				setError(err.message || 'Something went wrong.');
			} else {
				setError('Something went wrong.');
			}
		} finally {
			setIsProcessing(false);
		}
	};

	const togglePasswordVisibility = () => setShowPassword(prev => !prev);
	const toggleConfirmPasswordVisibility = () => setShowConfirmPassword(prev => !prev);

	if (isSuccess) {
		return (
			<div className='w-full max-w-[280px] sm:max-w-md space-y-6 text-left'>
				<h2 className='text-neutral-800 text-lg font-semibold'>Password reset successful</h2>
				<p className='text-neutral-600 text-sm'>
					Your password has been updated. You can now{' '}
					<a href='/auth/login' className='text-green-400 hover:underline font-medium'>
						log in
					</a>{' '}
					with your new password.
				</p>
			</div>
		);
	}

	return (
		<div className='w-full max-w-[280px] sm:max-w-md space-y-6 text-left'>
			<div>
				<h2 className='text-neutral-800 text-lg font-semibold'>Reset Password</h2>
				<p className='text-neutral-600 text-sm'>Enter a new password for your account.</p>
			</div>

			<form noValidate onSubmit={handleSubmit(onSubmit)} className='space-y-4'>
				<div>
					<label htmlFor='newPassword' className='block text-sm font-medium text-neutral-800 text-left mb-1'>
						New Password
					</label>
					<div className='relative'>
						<input
							className={`mt-1 block w-full px-3 py-2 border rounded-md focus:outline-none placeholder:text-sm pr-10 ${
								errors.newPassword ? 'border-red-500 focus:border-red-500' : 'border-neutral-500 focus:border-green-400'
							}`}
							type={showPassword ? 'text' : 'password'}
							id='newPassword'
							placeholder='Enter new password'
							{...register('newPassword')}
						/>
						<button type='button' className='absolute top-1/2 right-3 -translate-y-1/2 text-neutral-500' onClick={togglePasswordVisibility}>
							{showPassword ? <Eye size={20} /> : <EyeSlash size={20} />}
						</button>
					</div>
					{errors.newPassword && <p className='mt-1 text-sm text-red-500'>{errors.newPassword.message}</p>}
				</div>

				<div>
					<label htmlFor='confirmPassword' className='block text-sm font-medium text-neutral-800 text-left mb-1'>
						Confirm Password
					</label>
					<div className='relative'>
						<input
							className={`mt-1 block w-full px-3 py-2 border rounded-md focus:outline-none placeholder:text-sm pr-10 ${
								errors.confirmPassword ? 'border-red-500 focus:border-red-500' : 'border-neutral-500 focus:border-green-400'
							}`}
							type={showConfirmPassword ? 'text' : 'password'}
							id='confirmPassword'
							placeholder='Confirm new password'
							{...register('confirmPassword')}
						/>
						<button type='button' className='absolute top-1/2 right-3 -translate-y-1/2 text-neutral-500' onClick={toggleConfirmPasswordVisibility}>
							{showConfirmPassword ? <Eye size={20} /> : <EyeSlash size={20} />}
						</button>
					</div>
					{errors.confirmPassword && <p className='mt-1 text-sm text-red-500'>{errors.confirmPassword.message}</p>}
				</div>

				{error && <p className='text-sm text-red-500 mt-2'>{error}</p>}

				<div className='mt-8'>
					<button
						type='submit'
						disabled={!isValid || isProcessing}
						className={`w-full py-2 px-4 rounded-md transition-colors ${isValid && !isProcessing ? 'bg-green-400 text-white hover:bg-green-500' : 'bg-green-300 text-white cursor-not-allowed'}`}
					>
						{isProcessing ? 'Updating...' : 'Reset my password'}
					</button>
				</div>
			</form>
		</div>
	);
}
