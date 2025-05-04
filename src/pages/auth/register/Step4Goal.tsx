import { useState } from 'react';
import { ArrowLeft } from '@phosphor-icons/react';
import { toast } from 'sonner';
import {Link} from 'react-router'

interface Step4GoalProps {
	onNext: () => void;
	onPrevious: () => void;
}

export function Step4Goal({ onNext, onPrevious }: Step4GoalProps) {
	const [activeButton, setActiveButton] = useState<string | null>(null);

	const handleContinue = () => {
		if (!activeButton) {
			toast.warning('Please select your goal.');
			return;
		}
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
					<h2 className='text-neutral-800 text-lg font-semibold'>Select your Goal</h2>
					<p className='text-neutral-600 text-sm'>Your goal will shape your journey.</p>
				</div>

				<div className='mt-10 mb-10 space-y-4'>
					<button
						type='button'
						className={`mt-1 block w-full px-3 py-2 rounded-md focus:outline-none ${
							activeButton === 'lose' ? 'bg-neutral-400 text-white border-transparent' : 'text-neutral-400 border border-neutral-500'
						}`}
						onClick={() => setActiveButton('lose')}
					>
						Lose Weight
					</button>

					<button
						type='button'
						className={`mt-1 block w-full px-3 py-2 rounded-md focus:outline-none ${
							activeButton === 'maintain' ? 'bg-neutral-400 text-white border-transparent' : 'text-neutral-400 border border-neutral-500'
						}`}
						onClick={() => setActiveButton('maintain')}
					>
						Maintenance
					</button>

					<button
						type='button'
						className={`mt-1 block w-full px-3 py-2 rounded-md focus:outline-none ${
							activeButton === 'build' ? 'bg-neutral-400 text-white border-transparent' : 'text-neutral-400 border border-neutral-500'
						}`}
						onClick={() => setActiveButton('build')}
					>
						Build Muscle
					</button>
				</div>

				<div className='mt-6 flex justify-center gap-2'>
					<span className='w-2 h-2 rounded-full bg-neutral-300'></span>
					<span className='w-2 h-2 rounded-full bg-neutral-300'></span>
					<span className='w-2 h-2 rounded-full bg-neutral-300'></span>
					<span className='w-2 h-2 rounded-full bg-green-300'></span>
					<span className='w-2 h-2 rounded-full bg-neutral-300'></span>
				</div>

				<button
					className={`w-full py-2 px-4 rounded-md transition-colors ${activeButton ? 'bg-green-400 text-white cursor-pointer hover:bg-green-500' : 'bg-gray-300 text-gray-500 cursor-not-allowed'}`}
					type='button'
					onClick={handleContinue}
				>
					Continue
				</button>
			</div>
		</>
	);
}
