
import { ArrowLeft } from '@phosphor-icons/react';

interface Step5SummaryProps {
	onPrevious: () => void;
}



export function Step5Summary({onPrevious} : Step5SummaryProps) {
	
	const nutritionData = {
		calories: 1705,
		proteins: 120,
		carbs: 225,
		fats: 36,
	};

	return (
		<>
			<button type='button' className='text-neutral-600 text-sm cursor-pointer flex items-center gap-1 absolute top-6 left-6 sm:top-8 sm:left-8' onClick={onPrevious}>
				<ArrowLeft size={18} />
				<span>Previous</span>
			</button>

			<div className='w-full max-w-[280px] sm:max-w-md space-y-6 text-left'>
				<div>
					<h1 className='text-neutral-800 text-2xl font-semibold'>Welcome, Name</h1>
					<p className='text-neutral-600 mt-2'>Here is your daily nutrition needs!</p>
				</div>

				<div className='mt-6 flex justify-center gap-2'>
					<span className='w-2 h-2 rounded-full bg-neutral-300'></span>
					<span className='w-2 h-2 rounded-full bg-neutral-300'></span>
					<span className='w-2 h-2 rounded-full bg-neutral-300'></span>
					<span className='w-2 h-2 rounded-full bg-green-300'></span>
					<span className='w-2 h-2 rounded-full bg-neutral-300'></span>
				</div>

				<button className={`w-full mt-8 py-3 px-4 rounded-md bg-green-400 text-white flex items-center justify-center gap-2 hover:bg-green-500 transition-colors`} type='button'>
					<span>Start now</span>
				</button>
			</div>
		</>
	);
}


