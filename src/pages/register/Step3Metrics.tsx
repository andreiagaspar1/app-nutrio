import React, { useState } from 'react';
import { ArrowLeft } from '@phosphor-icons/react';
import { Toaster, toast } from 'sonner';

interface Step3MetricsProps {
	onNext: () => void;
	onPrevious: () => void;
}

export function Step3Metrics({ onNext, onPrevious }: Step3MetricsProps) {
	const [formData, setFormData] = useState({
		age: '',
		height: '',
		weight: '',
		activity: '',
	});

	const [errors, setErrors] = useState({
		age: false,
		height: false,
		weight: false,
		activity: false,
	});

	function validateHeight(height: string): boolean {
		const heightValue = parseInt(height, 10);
		return !isNaN(heightValue) && heightValue >= 100 && heightValue <= 250;
	}

	function validateAge(age: string): boolean {
		const ageValue = parseInt(age, 10);
		return !isNaN(ageValue) && ageValue >= 13 && ageValue <= 120;
	}

	function validateWeight(weight: string): boolean {
		const weightValue = parseInt(weight, 10);
		return !isNaN(weightValue) && weightValue >= 30 && weightValue <= 300;
	}

	const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
		const { name, value } = e.target;
		setFormData(prev => ({ ...prev, [name]: value }));
		setErrors(prev => ({ ...prev, [name]: false }));
	};

	function validateForm() {
		let isValid = true;
		const newErrors = {
			age: false,
			height: false,
			weight: false,
			activity: false,
		};

		
		if (!formData.age) {
			newErrors.age = true;
			toast.warning('Please enter your age');
			isValid = false;
		} else if (!validateAge(formData.age)) {
			newErrors.age = true;
			toast.warning('Please enter a valid age between 13 and 120');
			isValid = false;
		}

		if (!formData.height) {
			newErrors.height = true;
			if (isValid) toast.warning('Please enter your height');
			isValid = false;
		} else if (!validateHeight(formData.height)) {
			newErrors.height = true;
			toast.warning('Height must be between 100cm and 250cm');
			isValid = false;
		}

		if (!formData.weight) {
			newErrors.weight = true;
			if (isValid) toast.warning('Please enter your weight');
			isValid = false;
		} else if (!validateWeight(formData.weight)) {
			newErrors.weight = true;
			toast.warning('Weight must be between 30kg and 300kg');
			isValid = false;
		}

		if (!formData.activity) {
			newErrors.activity = true;
			if (isValid) toast.warning('Please select your activity level');
			isValid = false;
		}

		setErrors(newErrors);
		return isValid;
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

			<button type='button' className='text-neutral-600 text-sm cursor-pointer flex items-center gap-1 absolute top-6 left-6 sm:top-8 sm:left-8' onClick={onPrevious}>
				<ArrowLeft size={18} />
				<span>Previous</span>
			</button>

			<button type='button' className='text-neutral-600 text-sm cursor-pointer absolute top-6 right-6 sm:top-8 sm:right-8'>
				Cancel
			</button>

			<div className='w-full max-w-[280px] sm:max-w-md space-y-6 text-left'>
				<div>
					<h2 className='text-neutral-800 text-lg font-semibold'>Physical Metrics</h2>
					<p className='text-neutral-600 text-sm'>Essential data for personalized results.</p>
				</div>

				<form onSubmit={handleSubmit} noValidate className='space-y-4'>
					<div className='space-y-4'>
						<div>
							<label htmlFor='age' className='block text-sm font-medium text-neutral-800 text-left mb-1'>
								Age
							</label>
							<input
								className={`mt-1 block w-full px-3 py-2 border rounded-md focus:outline-none placeholder:text-sm ${
									errors.age ? 'border-red-500 focus:border-red-500' : 'border-neutral-500 focus:border-green-400'
								}`}
								type='number'
								name='age'
								placeholder='Your age'
								value={formData.age}
								onChange={handleChange}
							/>
						</div>

						
						<div>
							<label htmlFor='height' className='block text-sm font-medium text-neutral-800 text-left mb-1'>
								Height (cm)
							</label>
							<input
								className={`mt-1 block w-full px-3 py-2 border rounded-md focus:outline-none placeholder:text-sm ${
									errors.height ? 'border-red-500 focus:border-red-500' : 'border-neutral-500 focus:border-green-400'
								}`}
								type='number'
								name='height'
								placeholder='Your height in cm'
								value={formData.height}
								onChange={handleChange}
							/>
						</div>

					
						<div>
							<label htmlFor='weight' className='block text-sm font-medium text-neutral-800 text-left mb-1'>
								Weight (kg)
							</label>
							<input
								className={`mt-1 block w-full px-3 py-2 border rounded-md focus:outline-none placeholder:text-sm ${
									errors.weight ? 'border-red-500 focus:border-red-500' : 'border-neutral-500 focus:border-green-400'
								}`}
								type='number'
								name='weight'
								placeholder='Your weight in kg'
								value={formData.weight}
								onChange={handleChange}
							/>
						</div>

					
						<div>
							<label htmlFor='activity' className='block text-sm font-medium text-neutral-800 text-left mb-1'>
								Activity Level
							</label>
							<select
								className={`mt-1 block w-full px-3 py-3 border rounded-md focus:outline-none text-sm ${
									errors.activity ? 'border-red-500 focus:border-red-500' : 'border-neutral-500 focus:border-green-400'
								} ${!formData.activity ? 'text-neutral-400' : 'text-neutral-800'}`}
								name='activity'
								value={formData.activity}
								onChange={handleChange}
							>
								<option value='' disabled className='text-neutral-400'>
									Select your activity level
								</option>
								<option value='sedentary'>Sedentary - little to no exercise</option>
								<option value='moderate'>Moderate - moderate exercise or sports 3-5 days/week</option>
								<option value='very-active'>Very Active - hard exercise or sports 6-7 days/week</option>
							</select>
						</div>
					</div>

					<div className='mt-6 flex justify-center gap-2'>
						<span className='w-2 h-2 rounded-full bg-neutral-300'></span>
						<span className='w-2 h-2 rounded-full bg-neutral-300'></span>
						<span className='w-2 h-2 rounded-full bg-green-300'></span>
						<span className='w-2 h-2 rounded-full bg-neutral-300'></span>
						<span className='w-2 h-2 rounded-full bg-neutral-300'></span>
					</div>

					<button
						type='submit'
						className={`w-full py-2 px-4 rounded-md transition-colors ${
							formData.age && formData.height && formData.weight && formData.activity ? 'bg-green-400 text-white hover:bg-green-500 cursor-pointer' : 'bg-gray-300 text-gray-500 cursor-not-allowed'
						} mt-4`}
					>
						Continue
					</button>
				</form>
			</div>
		</div>
	);
}
