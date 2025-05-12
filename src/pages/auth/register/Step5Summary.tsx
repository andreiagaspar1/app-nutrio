import { ArrowLeft } from '@phosphor-icons/react';
import proteinIcon from '../../../assets/register-logos/protein.png';
import carbsIcon from '../../../assets/register-logos/carbs.png';
import fatsIcon from '../../../assets/register-logos/avocado.png';
import { useUserData } from '../../../contexts/authContexts/registrationContext';
import { MacroDisplay } from '../../../components/MacroDisplay';

interface Step5SummaryProps {
	onPrevious: () => void;
	onSubmit: () => void;
	isSubmitting?: boolean;
}

export function Step5Summary({ onPrevious, onSubmit, isSubmitting }: Step5SummaryProps) {
	const { userData } = useUserData();

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		onSubmit();
	};

	return (
		<div>
			<button type='button' className='text-neutral-600 text-sm cursor-pointer flex items-center gap-1 absolute top-6 left-6 sm:top-8 sm:left-8' onClick={onPrevious} disabled={isSubmitting}>
				<ArrowLeft size={18} />
				<span>Previous</span>
			</button>

			<div className='w-full max-w-[280px] sm:max-w-md space-y-5 text-left'>
				<div className='mb-8'>
					<h2 className='text-neutral-800 text-2xl font-semibold'>Welcome, {userData.name}</h2>
					<p className='text-neutral-600 text-sm'>Here's your daily nutrition needs!</p>
				</div>

				<div className='space-y-7'>
					<div className='border border-neutral-500 rounded-md p-6 text-center flex flex-col items-center'>
						<p className='text-neutral-500 text-sm'>Total</p>
						<input
							type='number'
							value={userData.calories}
							readOnly
							className='text-3xl font-semibold text-neutral-800 text-center border-none focus:outline-none bg-transparent w-[5ch] leading-none'
						/>
						<p className='text-neutral-400 text-sm'>Kcal</p>
					</div>

					<div className='grid grid-cols-3 gap-4'>
						<MacroDisplay value={userData.proteins} label='Protein' icon={proteinIcon} iconClass='h-8 w-8' />

						<MacroDisplay value={userData.carbs} label='Carbs' icon={carbsIcon} iconClass='h-10 w-10' />

						<MacroDisplay value={userData.fats} label='Fats' icon={fatsIcon} iconClass='h-8 w-8' />
					</div>
				</div>

				<div className='mt-6 flex justify-center gap-2'>
					{[1, 2, 3, 4, 5].map(step => (
						<span key={step} className={`w-2 h-2 rounded-full ${step === 5 ? 'bg-green-300' : 'bg-neutral-300'}`} />
					))}
				</div>

				<form onSubmit={handleSubmit}>
					<button
						type='submit'
						disabled={isSubmitting}
						className={`w-full mt-8 py-2 px-4 rounded-md text-white flex items-center justify-center gap-2 transition-colors ${
							isSubmitting ? 'bg-green-300 cursor-wait' : 'bg-green-400 hover:bg-green-500 cursor-pointer'
						}`}
					>
						{isSubmitting ? 'Creating account...' : 'Start now'}
					</button>
				</form>
			</div>
		</div>
	);
}
