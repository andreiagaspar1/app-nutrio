import { useState } from 'react';
import { Eye, EyeSlash } from '@phosphor-icons/react';
import { Link } from 'react-router';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useUserData } from '../../../contexts/authContexts/registrationContext';

interface Step1BasicInfoProps {
	onNext: () => void;
}

const basicInfoSchema = z.object({
	name: z.string().min(1, 'Name is required'),
	email: z.string().email('Invalid email address'),
	password: z
		.string()
		.min(8, 'Password must be at least 8 characters')
		.regex(/[A-Z]/, 'Password must contain at least one uppercase letter')
		.regex(/[0-9]/, 'Password must contain at least one number'),
});

type BasicInfoFormData = z.infer<typeof basicInfoSchema>;

export function Step1BasicInfo({ onNext }: Step1BasicInfoProps) {
	const [showPassword, setShowPassword] = useState(false);
	const { userData, updateUserData } = useUserData();

	const {
		register,
		formState: { errors, isValid },
		getValues,
	} = useForm<BasicInfoFormData>({
		resolver: zodResolver(basicInfoSchema),
		mode: 'onChange',
	});

	const handleContinue = () => {
		const formData = getValues();

		updateUserData({
			...userData,
			...formData,
		});

		onNext();
	};

	const togglePasswordVisibility = () => {
		setShowPassword(prev => !prev);
	};

	return (
		<>
			<Link to='/auth/login'>
				<button type='button' className='text-neutral-600 text-sm cursor-pointer absolute top-6 right-6 sm:top-8 sm:right-8'>
					Cancel
				</button>
			</Link>

			<div className='w-full max-w-[280px] sm:max-w-md space-y-6 text-left'>
				<div>
					<h2 className='text-neutral-800 text-lg font-semibold'>Create Profile</h2>
					<p className='text-neutral-600 text-sm'>Let's start with your basic info.</p>
				</div>

				<form noValidate className='space-y-4'>
					<div className='space-y-4'>
						<div>
							<label htmlFor='name' className='block text-sm font-medium text-neutral-800 text-left mb-1'>
								Name
							</label>
							<input
								className={`mt-1 block w-full px-3 py-2 border rounded-md focus:outline-none placeholder:text-sm ${
									errors.name ? 'border-red-500 focus:border-red-500' : 'border-neutral-500 focus:border-green-400'
								}`}
								type='text'
								id='name'
								placeholder='Enter your name'
								{...register('name')}
							/>
							{errors.name && <p className='mt-1 text-sm text-red-500'>{errors.name.message}</p>}
						</div>

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
						</div>

						<div>
							<label htmlFor='password' className='block text-sm font-medium text-neutral-800 text-left mb-1'>
								Password
							</label>
							<div className='relative'>
								<input
									className={`mt-1 block w-full px-3 py-2 border rounded-md focus:outline-none placeholder:text-sm pr-10 ${
										errors.password ? 'border-red-500 focus:border-red-500' : 'border-neutral-500 focus:border-green-400'
									}`}
									type={showPassword ? 'text' : 'password'}
									id='password'
									placeholder='Enter Password'
									{...register('password')}
								/>
								<button type='button' className='absolute top-1/2 right-3 -translate-y-1/2 text-neutral-500' onClick={togglePasswordVisibility}>
									{showPassword ? <Eye size={20} /> : <EyeSlash size={20} />}
								</button>
							</div>
							{errors.password && <p className='mt-1 text-sm text-red-500'>{errors.password.message}</p>}
						</div>
					</div>

					<div className='mt-6 flex justify-center gap-2'>
						{[1, 2, 3, 4, 5].map(step => (
							<span key={step} className={`w-2 h-2 rounded-full ${step === 1 ? 'bg-green-300' : 'bg-neutral-300'}`} />
						))}
					</div>

					<button
						type='button'
						disabled={!isValid}
						onClick={handleContinue}
						className={`w-full py-2 px-4 rounded-md transition-colors ${isValid ? 'bg-green-400 text-white hover:bg-green-500 cursor-pointer' : 'bg-green-300 text-white cursor-not-allowed'}`}
					>
						Continue
					</button>
				</form>
			</div>
		</>
	);
}
