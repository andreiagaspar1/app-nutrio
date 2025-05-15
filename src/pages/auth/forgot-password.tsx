import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { ArrowLeft } from '@phosphor-icons/react';
import { useEmailContext } from '../../contexts/authContexts/passwordForgotContext';
import { Link } from 'react-router-dom';
import { sendPasswordResetEmail } from 'firebase/auth';
import { auth } from '../../lib/firebase';

const forgotPasswordSchema = z.object({
	email: z.string().email('Invalid email address'),
});

type ForgotPasswordFormData = z.infer<typeof forgotPasswordSchema>;

export function ForgotPassword() {
	const { setEmail, email } = useEmailContext();
	const [isEmailSent, setIsEmailSent] = useState(false);
	const [isProcessing, setIsProcessing] = useState(false);
	const [error, setError] = useState('');

	const {
		register,
		handleSubmit,
		formState: { errors, isValid },
	} = useForm<ForgotPasswordFormData>({
		resolver: zodResolver(forgotPasswordSchema),
		mode: 'onChange',
	});

	const sendResetEmail = async (emailToSend: string) => {
		try {
			setIsProcessing(true);
			await sendPasswordResetEmail(auth, emailToSend, {
				url: `${window.location.origin}/auth/login`,
			});
			setIsEmailSent(true);
			setError('');
		} catch (err: unknown) {
			if (err instanceof Error) {
				setError(err.message || 'Failed to send reset link');
			} else {
				setError('An unexpected error occurred');
			}
		} finally {
			setIsProcessing(false);
		}
	};

	const onSubmit = (data: ForgotPasswordFormData) => {
		setEmail(data.email);
		sendResetEmail(data.email);
	};

	
	const handleResend = () => {
		if (email) sendResetEmail(email);
	};

	if (isEmailSent) {
		return (
			<div className='w-full max-w-[280px] sm:max-w-md space-y-6 text-left'>
				<div>
					<h2 className='text-neutral-800 text-lg font-semibold'>Check your email</h2>
					<p className='text-neutral-600 text-sm'>
						We've sent a password reset link to <span className='font-medium'>{email}</span>.
					</p>
					{error && <p className='text-sm text-red-500 mt-2'>{error}</p>}
				</div>

				<div className='mt-10'>
					<p className='text-sm text-neutral-800 font-medium'>Didn't get it?</p>
					<button
						className={`w-full py-2 px-4 rounded-md mt-4 transition-colors ${isProcessing ? 'bg-green-300 cursor-not-allowed text-white' : 'bg-green-400 hover:bg-green-500 text-white'}`}
						onClick={handleResend}
						disabled={isProcessing}
					>
						{isProcessing ? 'Resending...' : 'Resend link'}
					</button>
				</div>

				<div className='text-center text-sm text-neutral-600 pt-2 flex items-center justify-center mt-10'>
					<ArrowLeft size={18} className='mr-2' />
					Back to
					<span className='mx-2'>
						<Link to='/auth/login' className='text-green-400 hover:underline'>
							Log in
						</Link>
					</span>
				</div>
			</div>
		);
	}

	return (
		<div className='w-full max-w-[280px] sm:max-w-md space-y-6 text-left'>
			<div>
				<h2 className='text-neutral-800 text-lg font-semibold'>Forgot Password</h2>
				<p className='text-neutral-600 text-sm'>Enter your email to receive a password reset link.</p>
			</div>

			<form noValidate onSubmit={handleSubmit(onSubmit)} className='space-y-4'>
				<div>
					<label htmlFor='email' className='block text-sm font-medium text-neutral-800 text-left mb-1'>
						Email
					</label>
					<input
						className={`mt-1 block w-full px-3 py-2 border rounded-md focus:outline-none placeholder:text-sm ${
							errors.email ? 'border-red-500 focus:border-red-500' : 'border-neutral-500 focus:border-green-400'
						}`}
						type='email'
						id='email'
						placeholder='Enter your email address'
						{...register('email')}
					/>
					{errors.email && <p className='mt-1 text-sm text-red-500'>{errors.email.message}</p>}
					{error && <p className='mt-1 text-sm text-red-500'>{error}</p>}
				</div>

				<div className='mt-7'>
					<button
						type='submit'
						disabled={!isValid || isProcessing}
						className={`w-full py-2 px-4 rounded-md transition-colors ${isValid && !isProcessing ? 'bg-green-400 text-white hover:bg-green-500' : 'bg-green-300 text-white cursor-not-allowed'}`}
					>
						{isProcessing ? 'Sending...' : 'Reset my password'}
					</button>
				</div>

				<div className='text-center text-sm text-neutral-600 pt-2 flex items-center justify-center mt-10'>
					<ArrowLeft size={18} className='mr-2' />
					Back to
					<span className='mx-2'>
						<Link to='/auth/login' className='text-green-400 hover:underline'>
							Log in
						</Link>
					</span>
				</div>
			</form>
		</div>
	);
}
