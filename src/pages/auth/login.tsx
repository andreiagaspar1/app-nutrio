import { useState } from 'react';
import { Eye, EyeSlash } from '@phosphor-icons/react';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import Logo from '../../assets/Logo.png';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../lib/firebase';
import { FirebaseError } from 'firebase/app';

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
	const [errorMessage, setErrorMessage] = useState<string | null>(null);
	const [isLoading, setIsLoading] = useState(false);
	const navigate = useNavigate();

	const {
		register,
		handleSubmit,
		formState: { errors, isValid },
	} = useForm<LoginFormData>({
		resolver: zodResolver(loginSchema),
		mode: 'onChange',
	});

	const onSubmit = async (data: LoginFormData) => {
		setErrorMessage(null);
		setIsLoading(true);

		try {
		 await signInWithEmailAndPassword(auth, data.email, data.password);
			navigate('/app/home-page');
		} catch (error) {
			if (error instanceof FirebaseError) {
				
				if (error.code === 'auth/invalid-credential') {
					setErrorMessage('Incorrect email or password. Please try again.');
				} else if (error.code === 'auth/user-not-found') {
					
					setErrorMessage('No account found with this email. Please check or sign up.');
				} else {
					
					switch (error.code) {
						case 'auth/invalid-email':
							setErrorMessage('Please enter a valid email address.');
							break;
						case 'auth/too-many-requests':
							setErrorMessage('Too many attempts. Please try again later.');
							break;
						case 'auth/user-disabled':
							setErrorMessage('This account has been disabled. Please contact support.');
							break;
						case 'auth/network-request-failed':
							setErrorMessage('Network error. Please check your internet connection.');
							break;
						default:
							setErrorMessage('Login failed. Please try again.');
							console.error('Firebase auth error:', error);
					}
				}
			} else {
				setErrorMessage('An unexpected error occurred.');
				console.error('Non-Firebase error:', error);
			}
		} finally {
			setIsLoading(false);
		}
	};

	const togglePasswordVisibility = () => {
		setShowPassword(prev => !prev);
	};

	return (
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
							autoComplete='email'
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
								autoComplete='current-password'
							/>
							<button
								type='button'
								className='absolute top-1/2 right-3 -translate-y-1/2 text-neutral-500'
								onClick={togglePasswordVisibility}
								aria-label={showPassword ? 'Hide password' : 'Show password'}
							>
								{showPassword ? <Eye size={20} /> : <EyeSlash size={20} />}
							</button>
						</div>
						{errors.password && <p className='mt-1 text-sm text-red-500'>{errors.password.message}</p>}

						<div className='flex items-center justify-between mt-4 mb-10'>
							<Link to='/auth/password/forgot' className='text-neutral-600 text-sm hover:underline'>
								Forgot your password?
							</Link>
						</div>
					</div>
				</div>

				{errorMessage && (
					<div className='p-3 bg-red-50 rounded-md'>
						<p className='text-sm text-red-600'>{errorMessage}</p>
					</div>
				)}

				<button
					type='submit'
					disabled={!isValid || isLoading}
					className={`w-full py-2 px-4 rounded-md transition-colors ${
						isValid && !isLoading ? 'bg-green-400 text-white hover:bg-green-500 cursor-pointer' : 'bg-green-300 text-white cursor-not-allowed'
					}`}
					aria-disabled={!isValid || isLoading}
				>
					{isLoading ? (
						<span className='inline-flex items-center justify-center'>
							<svg className='animate-spin -ml-1 mr-2 h-4 w-4 text-white' xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24'>
								<circle className='opacity-25' cx='12' cy='12' r='10' stroke='currentColor' strokeWidth='4'></circle>
								<path className='opacity-75' fill='currentColor' d='M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z'></path>
							</svg>
							Processing...
						</span>
					) : (
						'Log in'
					)}
				</button>

				<div className='text-center text-sm text-neutral-600 pt-2 mt-5'>
					Don't have an account?{' '}
					<Link to='/auth/register' className='text-green-400 underline underline-offset-2'>
						Sign up
					</Link>
				</div>
			</form>
		</div>
	);
}
