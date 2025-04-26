import React, { useState } from 'react';
import { Eye, EyeSlash } from '@phosphor-icons/react';
import { Toaster, toast } from 'sonner';

interface Step1BasicInfoProps {
	onNext: () => void;
}

export function Step1BasicInfo({ onNext }: Step1BasicInfoProps) {
	const [formData, setFormData] = useState({
		name: '',
		email: '',
		password: '',
	});

	const [showPassword, setShowPassword] = useState(false);
	const [errors, setErrors] = useState({
		name: false,
		email: false,
		password: false,
	});

	function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
		const { name, value } = e.target;
		setFormData(prev => ({ ...prev, [name]: value }));
		setErrors(prev => ({ ...prev, [name]: false }));
	}

	function validateForm() {
		const newErrors = {
			name: formData.name === '',
			email: formData.email === '',
			password: formData.password === '',
		};

		setErrors(newErrors);

		const isValid = !newErrors.name && !newErrors.email && !newErrors.password;
		if (!isValid) {
			toast.warning('Please fill in all the fields.');
		}
		return isValid;
	}

	function togglePasswordVisibility() {
		setShowPassword(prev => !prev);
	}

	function handleSubmit(e: React.FormEvent) {
		e.preventDefault();
		if (validateForm()) {
			onNext();
		}
	}

	return (
		<div className='min-w-[280px] px-4 flex flex-col items-center justify-center min-h-screen relative'>
			<Toaster position='top-center' richColors />
			<button type='button' className='text-neutral-600 text-sm cursor-pointer absolute top-6 right-6 sm:top-8 sm:right-8'>
				Cancel
			</button>

			<div className='w-full max-w-[280px] sm:max-w-md space-y-6 text-left'>
				<div>
					<h2 className='text-neutral-800 text-lg font-semibold'>Create Profile</h2>
					<p className='text-neutral-600 text-sm'>Let's start with your basic info.</p>
				</div>

				<form onSubmit={handleSubmit} noValidate className='space-y-4'>
					<div className='space-y-4'>
						<label htmlFor='name' className='block text-sm font-medium text-neutral-800 text-left mb-1'>
							Name
						</label>
						<input
							className={`mt-1 block w-full px-3 py-2 border rounded-md focus:outline-none placeholder:text-sm ${
								errors.name ? 'border-red-500 focus:border-red-500' : 'border-neutral-500 focus:border-green-400'
							}`}
							type='text'
							name='name'
							placeholder='Enter your name'
							value={formData.name}
							onChange={handleChange}
						/>

						<label htmlFor='email' className='block text-sm font-medium text-neutral-800 text-left mb-1'>
							Email
						</label>
						<input
							className={`mt-1 block w-full px-3 py-2 border rounded-md focus:outline-none placeholder:text-sm ${
								errors.email ? 'border-red-500 focus:border-red-500' : 'border-neutral-500 focus:border-green-400'
							}`}
							type='email'
							name='email'
							placeholder='Enter your email address'
							value={formData.email}
							onChange={handleChange}
						/>

						<label htmlFor='password' className='block text-sm font-medium text-neutral-800 text-left mb-1'>
							Password
						</label>
						<div className='relative'>
							<input
								className={`mt-1 block w-full px-3 py-2 border rounded-md focus:outline-none placeholder:text-sm pr-10 ${
									errors.password ? 'border-red-500 focus:border-red-500' : 'border-neutral-500 focus:border-green-400'
								}`}
								type={showPassword ? 'text' : 'password'}
								name='password'
								placeholder='Enter Password'
								value={formData.password}
								onChange={handleChange}
							/>
							<button type='button' className='absolute top-1/2 right-3 -translate-y-1/2 text-neutral-500' onClick={togglePasswordVisibility}>
								{showPassword ? <EyeSlash size={20} /> : <Eye size={20} />}
							</button>
						</div>
					</div>

					<div className='mt-8 flex justify-center gap-2'>
						<span className='w-2 h-2 rounded-full bg-green-300'></span>
						<span className='w-2 h-2 rounded-full bg-neutral-300'></span>
						<span className='w-2 h-2 rounded-full bg-neutral-300'></span>
						<span className='w-2 h-2 rounded-full bg-neutral-300'></span>
						<span className='w-2 h-2 rounded-full bg-neutral-300'></span>
					</div>

					<button
						type='submit'
						className={`w-full py-2 px-4 rounded-md transition-colors ${
							formData.name && formData.email && formData.password ? 'bg-green-400 text-white hover:bg-green-500 cursor-pointer' : 'bg-gray-300 text-gray-500 cursor-not-allowed'
						}`}
					>
						Continue
					</button>
				</form>
			</div>
		</div>
	);
}
