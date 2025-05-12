import { useState } from 'react';
import { Eye, EyeSlash } from '@phosphor-icons/react';
import { Link } from 'react-router';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import Logo from '../../assets/Logo.png';

const loginSchema = z.object({
	email: z.string().email('Invalid email address'),
	password: z
		.string()
		.min(8, 'Password must be at least 8 characters')
		.regex(/[A-Z]/, 'Password must contain at least one uppercase letter')
		.regex(/[0-9]/, 'Password must contain at least one number'),
});

type LoginFormData = z.infer<typeof loginSchema>;

export function Login() {
	const [showPassword, setShowPassword] = useState(false);

	const {
		register,
		handleSubmit,
		formState: { errors, isValid },
	} = useForm<LoginFormData>({
		resolver: zodResolver(loginSchema),
		mode: 'onChange',
	});

	const onSubmit = (data: LoginFormData) => {
		console.log('Login data:', data);
		
	};

	const togglePasswordVisibility = () => {
		setShowPassword(prev => !prev);
	};

	return (
		<>
			<div className='w-full max-w-[280px] sm:max-w-md space-y-6 text-left'>
				<div className='flex justify-center'>
					<img src={Logo} alt='Nutrio Logo' className='h-14' />
				</div>

				<div>
					<h2 className='text-neutral-800 text-lg font-semibold'>Login</h2>
				</div>

				<form noValidate onSubmit={handleSubmit(onSubmit)} className='space-y-4'>
					<div className='space-y-4'>
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
									placeholder='Enter password'
									{...register('password')}
								/>
								<button type='button' className='absolute top-1/2 right-3 -translate-y-1/2 text-neutral-500' onClick={togglePasswordVisibility}>
									{showPassword ? <Eye size={20} /> : <EyeSlash size={20} />}
								</button>
							</div>
							{errors.password && <p className='mt-1 text-sm text-red-500'>{errors.password.message}</p>}

							<div className='flex items-center justify-between mt-4 mb-10'>
								<div className='flex items-center'>
									<input type='checkbox' id='remember' className='w-4 h-4 rounded border-neutral-500 focus:ring-green-400' />
									<label htmlFor='remember' className='ml-2 text-neutral-600 text-sm'>
										Remember me
									</label>
								</div>
								<Link to='/auth/password/forgot' className='text-neutral-600 text-sm hover:underline'>
									Forgot your password?
								</Link>
							</div>
						</div>
					</div>

					<button
						type='submit'
						disabled={!isValid}
						className={`w-full py-2 px-4 rounded-md transition-colors ${isValid ? 'bg-green-400 text-white hover:bg-green-500 cursor-pointer' : 'bg-green-300 text-white cursor-not-allowed'}`}
					>
						Log in
					</button>

					<div className='text-center text-sm text-neutral-600 pt-2 mt-5'>
						Don't have an account?{' '}
						<Link to='/auth/register' className='text-green-400 hover:underline'>
							Sign up
						</Link>
					</div>
				</form>
			</div>
		</>
	);
}
