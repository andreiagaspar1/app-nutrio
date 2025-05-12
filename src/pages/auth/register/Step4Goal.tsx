import { useState } from 'react';
import { ArrowLeft } from '@phosphor-icons/react';
import { toast } from 'sonner';
import { Link } from 'react-router';
import { useUserData } from '../../../contexts/registrationContext';

interface Step4GoalProps {
	onNext: () => void;
	onPrevious: () => void;
}

export function Step4Goal({ onNext, onPrevious }: Step4GoalProps) {
	const { userData, updateUserData } = useUserData(); 
	const [activeButton, setActiveButton] = useState<string | null>(userData.goal || null); 

	const handleContinue = () => {
		if (!activeButton) {
			toast.warning('Please select your goal.');
			return;
		}

		
		updateUserData({
			...userData, 
			goal: activeButton, 
		});

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
					<div className='flex items-center'>
						<input
							type='radio'
							id='lose'
							name='goal'
							value='lose'
							checked={activeButton === 'lose'}
							onChange={() => {
								setActiveButton('lose');
								updateUserData({
									...userData,
									goal: 'lose', 
								});
							}}
							className='hidden'
						/>
						<label
							htmlFor='lose'
							className={`cursor-pointer w-full px-3 py-2.5 rounded-md flex justify-center items-center text-sm font-medium focus:outline-none ${
								activeButton === 'lose' ? 'bg-neutral-400 text-white border-transparent' : 'text-neutral-400 border border-neutral-500'
							}`}
						>
							Lose Weight
						</label>
					</div>

					<div className='flex items-center'>
						<input
							type='radio'
							id='maintain'
							name='goal'
							value='maintain'
							checked={activeButton === 'maintain'}
							onChange={() => {
								setActiveButton('maintain');
								updateUserData({
									...userData,
									goal: 'maintain', 
								});
							}}
							className='hidden'
						/>
						<label
							htmlFor='maintain'
							className={`cursor-pointer w-full px-3 py-2.5 rounded-md flex justify-center items-center text-sm font-medium focus:outline-none ${
								activeButton === 'maintain' ? 'bg-neutral-400 text-white border-transparent' : 'text-neutral-400 border border-neutral-500'
							}`}
						>
							Maintenance
						</label>
					</div>

					<div className='flex items-center'>
						<input
							type='radio'
							id='build'
							name='goal'
							value='build'
							checked={activeButton === 'build'}
							onChange={() => {
								setActiveButton('build');
								updateUserData({
									...userData,
									goal: 'build', 
								});
							}}
							className='hidden'
						/>
						<label
							htmlFor='build'
							className={`cursor-pointer w-full px-3 py-2.5 rounded-md flex justify-center items-center text-sm font-medium focus:outline-none ${
								activeButton === 'build' ? 'bg-neutral-400 text-white border-transparent' : 'text-neutral-400 border border-neutral-500'
							}`}
						>
							Build Muscle
						</label>
					</div>
				</div>

				<div className='mt-6 flex justify-center gap-2'>
					{[1, 2, 3, 4, 5].map(step => (
						<span key={step} className={`w-2 h-2 rounded-full ${step === 4 ? 'bg-green-300' : 'bg-neutral-300'}`} />
					))}
				</div>

				<button
					className={`w-full py-2 px-4 rounded-md transition-colors ${activeButton ? 'bg-green-400 text-white cursor-pointer hover:bg-green-500' : 'bg-green-300 text-white cursor-not-allowed'}`}
					type='button'
					onClick={handleContinue}
				>
					Continue
				</button>
			</div>
		</>
	);
}
