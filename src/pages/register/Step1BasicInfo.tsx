import React, { useState } from 'react';
import { Eye, EyeSlash } from '@phosphor-icons/react';

export const Step1BasicInfo = () => {
	const [formData, setFormData] = useState({
		name: '',
		email: '',
		password: '',
	});

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { name, value } = e.target;
		setFormData({ ...formData, [name]: value });
    };
    
    const [showPassword, setShowPassword] = useState(false);

    const togglePasswordVisibility = () => {
			setShowPassword(prev => !prev);
		};
    
	return (
		<div className='min-w-[280px] px-4 flex flex-col items-center justify-center min-h-screen relative'>
			<button type='button' className='text-neutral-600 text-sm cursor-pointer absolute top-6 right-6 sm:top-8 sm:right-8'>
				Cancel
			</button>
			<div className='w-full max-w-[280px] sm:max-w-md space-y-6 text-left'>
				<div>
					<h2 className='text-neutral-800 text-lg font-semibold'>Create Profile</h2>
					<p className='text-neutral-600 text-sm'>Let´s start with your basic info.</p>
				</div>

				<form className='space-y-4'>
					<label htmlFor='name' className='block text-sm font-medium text-neutral-800 text-left mb-1'>
						Name
					</label>
					<input
						className='mt-1 block w-full px-3 py-2 border border-neutral-500 rounded-md focus:outline-none focus:border-green-400 placeholder:text-sm'
						type='text'
						name='name'
						placeholder='Enter your name'
						value={formData.name}
                        onChange={handleChange}
                        required
					/>
					<label htmlFor='email' className='block text-sm font-medium text-neutral-800 text-left mb-1'>
						Email
					</label>
					<input
						className='mt-1 block w-full px-3 py-2 border border-neutral-500 rounded-md focus:outline-none focus:border-green-400 placeholder:text-sm'
						type='email'
						name='email'
						placeholder='Enter your email adress'
						value={formData.email}
                        onChange={handleChange}
                        required
					/>
					<label htmlFor='password' className='block text-sm font-medium text-neutral-800 text-left mb-1'>
						Password
					</label>
					<div className='relative'>
						<input
							className='mt-1 block w-full px-3 py-2 border border-neutral-500 rounded-md focus:outline-none focus:border-green-400 placeholder:text-sm pr-10'
							type={showPassword ? 'text' : 'password'}
							name='password'
							placeholder='Enter Password'
							value={formData.password}
                            onChange={handleChange}
                            required
						/>
                        <button type='button' className='absolute top-1/2 right-3 -translate-y-1/2 text-neutral-500' onClick={togglePasswordVisibility}>
							{showPassword ? <EyeSlash size={20} /> : <Eye size={20} />}
						</button>
					</div>
				</form>

				<div className='flex justify-center gap-2'>
					<span className='w-2 h-2 rounded-full bg-green-300'></span> {/* Active */}
					<span className='w-2 h-2 rounded-full bg-neutral-300'></span>
					<span className='w-2 h-2 rounded-full bg-neutral-300'></span>
					<span className='w-2 h-2 rounded-full bg-neutral-300'></span>
					<span className='w-2 h-2 rounded-full bg-neutral-300'></span>
				</div>
				<button className='w-full py-2 px-4 bg-green-400 text-white rounded-md hover:bg-green-600 transition-colors cursor-pointer' type='submit'>
					Continue
				</button>
			</div>
		</div>
	);
};
