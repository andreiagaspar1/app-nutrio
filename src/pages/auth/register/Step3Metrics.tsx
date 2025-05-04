import { ArrowLeft } from '@phosphor-icons/react';
import { Link } from 'react-router';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useUserData } from '../../../contexts/registrationContext'; // Import the context

interface Step3MetricsProps {
	onNext: () => void;
	onPrevious: () => void;
}

const metricsSchema = z.object({
	age: z
		.string()
		.min(1, 'Please enter your age')
		.refine(
			val => {
				const num = parseInt(val, 10);
				return !isNaN(num) && num >= 13 && num <= 120;
			},
			{ message: 'Please enter a valid age between 13 and 120' },
		),
	height: z
		.string()
		.min(1, 'Please enter your height')
		.refine(
			val => {
				const num = parseInt(val, 10);
				return !isNaN(num) && num >= 100 && num <= 250;
			},
			{ message: 'Height must be between 100cm and 250cm' },
		),
	weight: z
		.string()
		.min(1, 'Please enter your weight')
		.refine(
			val => {
				const num = parseInt(val, 10);
				return !isNaN(num) && num >= 30 && num <= 300;
			},
			{ message: 'Weight must be between 30kg and 300kg' },
		),
	activity: z.string().min(1, 'Please select your activity level'),
});

type MetricsFormData = z.infer<typeof metricsSchema>;

export function Step3Metrics({ onNext, onPrevious }: Step3MetricsProps) {
	const {
		register,
		handleSubmit,
		formState: { errors, isSubmitting, isValid },
	} = useForm<MetricsFormData>({
		resolver: zodResolver(metricsSchema),
		mode: 'onChange',
	});

	const { setUserData } = useUserData(); 
const onSubmit = (data: MetricsFormData) => {
	
	const updatedData = {
		age: parseInt(data.age, 10),
		height: parseInt(data.height, 10),
		weight: parseInt(data.weight, 10),
		activity: data.activity,
	};

	
	setUserData(prevData => ({
		...prevData,
		...updatedData,
	}));

	
	onNext();
};
	return (
		<>
			<button type='button' className='text-neutral-600 text-sm cursor-pointer flex items-center gap-1 absolute top-6 left-6 sm:top-8 sm:left-8' onClick={onPrevious}>
				<ArrowLeft size={18} />
				<span>Previous</span>
			</button>

			<Link to='/auth/login'>
				<button type='button' className='text-neutral-600 text-sm cursor-pointer absolute top-6 right-6 sm:top-8 sm:right-8'>
					Cancel
				</button>
			</Link>

			<div className='w-full max-w-[280px] sm:max-w-md space-y-6 text-left'>
				<div>
					<h2 className='text-neutral-800 text-lg font-semibold'>Physical Metrics</h2>
					<p className='text-neutral-600 text-sm'>Essential data for personalized results.</p>
				</div>

				<form onSubmit={handleSubmit(onSubmit)} noValidate className='space-y-4'>
					<div className='space-y-4'>
						<div>
							<label htmlFor='age' className='block text-sm font-medium text-neutral-800 text-left mb-1'>
								Age
							</label>
							<input
								type='number'
								id='age'
								placeholder='Your age'
								{...register('age')}
								className={`mt-1 block w-full px-3 py-2 border rounded-md placeholder:text-sm focus:outline-none ${
									errors.age ? 'border-red-500 focus:border-red-500' : 'border-neutral-500 focus:border-green-400'
								}`}
							/>
							{errors.age && <p className='mt-1 text-sm text-red-500'>{errors.age.message}</p>}
						</div>

						<div>
							<label htmlFor='height' className='block text-sm font-medium text-neutral-800 text-left mb-1'>
								Height (cm)
							</label>
							<input
								type='number'
								id='height'
								placeholder='Your height in cm'
								{...register('height')}
								className={`mt-1 block w-full px-3 py-2 border rounded-md placeholder:text-sm focus:outline-none ${
									errors.height ? 'border-red-500 focus:border-red-500' : 'border-neutral-500 focus:border-green-400'
								}`}
							/>
							{errors.height && <p className='mt-1 text-sm text-red-500'>{errors.height.message}</p>}
						</div>

						<div>
							<label htmlFor='weight' className='block text-sm font-medium text-neutral-800 text-left mb-1'>
								Weight (kg)
							</label>
							<input
								type='number'
								id='weight'
								placeholder='Your weight in kg'
								{...register('weight')}
								className={`mt-1 block w-full px-3 py-2 border rounded-md placeholder:text-sm focus:outline-none ${
									errors.weight ? 'border-red-500 focus:border-red-500' : 'border-neutral-500 focus:border-green-400'
								}`}
							/>
							{errors.weight && <p className='mt-1 text-sm text-red-500'>{errors.weight.message}</p>}
						</div>

						<div>
							<label htmlFor='activity' className='block text-sm font-medium text-neutral-800 text-left mb-1'>
								Activity Level
							</label>
							<select
								id='activity'
								{...register('activity')}
								className={`mt-1 block w-full px-3 py-3 border rounded-md text-sm focus:outline-none ${
									errors.activity ? 'border-red-500 focus:border-red-500' : 'border-neutral-500 focus:border-green-400'
								}`}
							>
								<option value='' disabled>
									Select your activity level
								</option>
								<option value='sedentary'>Sedentary - little to no exercise</option>
								<option value='moderate'>Moderate - moderate exercise or sports 3-5 days/week</option>
								<option value='very-active'>Very Active - hard exercise or sports 6-7 days/week</option>
							</select>
							{errors.activity && <p className='mt-1 text-sm text-red-500'>{errors.activity.message}</p>}
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
						disabled={!isValid || isSubmitting}
						className={`w-full py-2 px-4 rounded-md transition-colors ${isValid ? 'bg-green-400 text-white hover:bg-green-500' : 'bg-green-300 text-white cursor-not-allowed'} mt-4`}
					>
						{isSubmitting ? 'Processing...' : 'Continue'}
					</button>
				</form>
			</div>
		</>
	);
}
