
import { ArrowLeft } from '@phosphor-icons/react';
import proteinIcon from '../../../assets/register-logos/protein.png'
import carbsIcon from '../../../assets/register-logos/carbs.png'
import fatsIcon from '../../../assets/register-logos/avocado.png'
import {Link} from 'react-router'

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
				<div className='space-y-6'>
					<div className='border border-neutral-500 rounded-md p-6 text-center'>
						<p className='text-neutral-500 text-sm'>Total</p>
						<p className='text-3xl font-semibold text-neutral-800'>1,705</p>
						<p className='text-neutral-400 text-sm'>Kcal</p>
					</div>

					<div className='grid grid-cols-3 gap-4 text-center'>
						<div className='relative'>
							<div className='absolute -top-4 left-1/2 transform -translate-x-1/2'>
								<img src={proteinIcon} alt='Protein' className='h-8 w-8 object-contain' />
							</div>
							<div className='border border-neutral-500 rounded-md p-4 pt-8 aspect-square flex flex-col justify-center items-center'>
								<p className='text-lg font-semibold text-neutral-800'>120g</p>
								<p className='text-neutral-500 text-sm'>Protein</p>
							</div>
						</div>

						<div className='relative'>
							<div className='absolute -top-4 left-1/2 transform -translate-x-1/2'>
								<img src={carbsIcon} alt='Carbs' className='h-10 w-10 object-contain' />
							</div>
							<div className='border border-neutral-500 rounded-md p-4 pt-8 aspect-square flex flex-col justify-center items-center'>
								<p className='text-lg font-semibold text-neutral-800'>225g</p>
								<p className='text-neutral-500 text-sm'>Carbs</p>
							</div>
						</div>

						<div className='relative'>
							<div className='absolute -top-4 left-1/2 transform -translate-x-1/2'>
								<img src={fatsIcon} alt='Fats' className='h-8 w-8 object-contain' />
							</div>
							<div className='border border-neutral-500 rounded-md p-4 pt-8 aspect-square flex flex-col justify-center items-center'>
								<p className='text-lg font-semibold text-neutral-800'>36g</p>
								<p className='text-neutral-500 text-sm'>Fats</p>
							</div>
						</div>
					</div>
				</div>

				<div className='mt-6 flex justify-center gap-2'>
					<span className='w-2 h-2 rounded-full bg-neutral-300'></span>
					<span className='w-2 h-2 rounded-full bg-neutral-300'></span>
					<span className='w-2 h-2 rounded-full bg-neutral-300'></span>
					<span className='w-2 h-2 rounded-full bg-neutral-300'></span>
					<span className='w-2 h-2 rounded-full bg-green-300'></span>
				</div>

				<Link to='/app/home-page'>
					<button className={`w-full mt-8 py-3 px-4 rounded-md bg-green-400 text-white flex items-center justify-center gap-2 hover:bg-green-500 transition-colors cursor-pointer`} type='button'>
						<span>Start now</span>
					</button>
				</Link>
			</div>
		</>
	);
}


