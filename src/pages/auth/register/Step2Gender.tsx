import { useState } from 'react';
import { GenderMale, GenderFemale, ArrowLeft } from '@phosphor-icons/react';
import { toast } from 'sonner';
import { Link } from 'react-router';
import { useUserData } from '../../../contexts/registrationContext'

interface Step2GenderProps {
	onNext: () => void;
	onPrevious: () => void;
}

export function Step2Gender({ onNext, onPrevious }: Step2GenderProps) {
	const [selectedGender, setSelectedGender] = useState('');
	const { setUserData } = useUserData(); // Access setUserData from context

	const handleContinue = () => {
		if (!selectedGender) {
			toast.warning('Please select a gender first.');
			return;
		}

		setUserData(prevData => ({
			...prevData,
			gender: selectedGender,
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
					<h2 className='text-neutral-800 text-lg font-semibold'>Select your Gender</h2>
					<p className='text-neutral-600 text-sm'>Your gender will affect your needs.</p>
				</div>

				<div className='flex flex-col items-center py-14 gap-14'>
					<div className='flex gap-8'>
						<div className='flex flex-col items-center space-y-2'>
							<button
								type='button'
								className={`w-18 h-18 rounded-full p-0 border-1 flex items-center justify-center ${selectedGender === 'male' ? 'border-green-400' : 'border-neutral-500'} transition-colors`}
								onClick={() => setSelectedGender('male')}
							>
								<GenderMale size={30} className={`${selectedGender === 'male' ? 'text-green-400' : 'text-neutral-600'}`} />
							</button>
							<span className={`text-sm font-medium ${selectedGender === 'male' ? 'text-green-400' : 'text-neutral-600'} transition-colors`}>Male</span>
						</div>

						<div className='flex flex-col items-center space-y-2'>
							<button
								type='button'
								className={`w-18 h-18 rounded-full p-0 border-1 flex items-center justify-center ${selectedGender === 'female' ? 'border-green-400' : 'border-neutral-500'} transition-colors`}
								onClick={() => setSelectedGender('female')}
							>
								<GenderFemale size={30} className={`${selectedGender === 'female' ? 'text-green-400' : 'text-neutral-600'}`} />
							</button>
							<span className={`text-sm font-medium ${selectedGender === 'female' ? 'text-green-400' : 'text-neutral-600'} transition-colors`}>Female</span>
						</div>
					</div>
				</div>

				<div className='flex justify-center gap-2'>
					<span className='w-2 h-2 rounded-full bg-neutral-300'></span>
					<span className='w-2 h-2 rounded-full bg-green-300'></span>
					<span className='w-2 h-2 rounded-full bg-neutral-300'></span>
					<span className='w-2 h-2 rounded-full bg-neutral-300'></span>
					<span className='w-2 h-2 rounded-full bg-neutral-300'></span>
				</div>

				<button
					className={`w-full py-2 px-4 rounded-md transition-colors ${selectedGender ? 'bg-green-400 text-white cursor-pointer hover:bg-green-500' : 'bg-green-300 text-white cursor-not-allowed'}`}
					type='button'
					onClick={handleContinue}
				>
					Continue
				</button>
			</div>
		</>
	);
}
