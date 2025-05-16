import { useState, useEffect } from 'react';
interface MacrosCardProps {
	date: string;
	protein: number;
	carbs: number;
	fats: number;
	calories: number;
	proteinGoal?: number;
	carbsGoal?: number;
	fatsGoal?: number;
	calorieGoal?: number;
}

function ProgressCircle({ progress, color, size = 96, strokeWidth = 5 }: { progress: number; color: string; size?: number; strokeWidth?: number }) {
	const radius = (size - strokeWidth) / 2;
	const circumference = 2 * Math.PI * radius;
	const strokeDashoffset = circumference * (1 - progress);

	return (
		<svg width={size} height={size} className='mx-auto block'>
			<circle cx={size / 2} cy={size / 2} r={radius} stroke='#ddd' strokeWidth={strokeWidth} fill='none' />
			<circle
				cx={size / 2}
				cy={size / 2}
				r={radius}
				stroke={color}
				strokeWidth={strokeWidth}
				fill='none'
				strokeDasharray={circumference}
				strokeDashoffset={strokeDashoffset}
				strokeLinecap='round'
				transform={`rotate(-90 ${size / 2} ${size / 2})`}
				style={{ transition: 'stroke-dashoffset 1s ease-out' }}
			/>
		</svg>
	);
}

export function MacrosCard(props: MacrosCardProps) {
	const { date, protein, carbs, fats, calories, proteinGoal = 0, carbsGoal = 0, fatsGoal = 0, calorieGoal = 0 } = props;

	
	const [windowWidth, setWindowWidth] = useState<number>(typeof window !== 'undefined' ? window.innerWidth : 1000);

	useEffect(() => {
		function handleResize() {
			setWindowWidth(window.innerWidth);
		}
		window.addEventListener('resize', handleResize);
		return () => window.removeEventListener('resize', handleResize);
	}, []);

	
	const size = windowWidth < 768 ? 80 : 96;
	const strokeWidth = windowWidth < 768 ? 5 : 5;

	const getProgressStyle = (actual: number, goal: number) => {
		if (!goal)
			return {
				color: '#d1d5db',
				progress: 0,
			};

		const progress = Math.min(actual / goal, 1);
		let color = '';

		if (actual < goal) color = '#22c55e';
		else if (actual === goal) color = '#16a34a';
		else color = '#facc15';

		return {
			color,
			progress,
		};
	};

	return (
		<div className='bg-white rounded-xl p-4 md:p-10 shadow-[0_0_6px_0_rgba(0,0,0,0.1)]'>
			<div className='flex justify-between items-center mb-6 mt-1'>
				<h2 className='text-sm md:text-lg font-medium text-neutral-800'>Today´s macros</h2>
				<p className='text-xs md:text-sm text-neutral-500'>{date}</p>
			</div>

			<div className='grid grid-cols-3 p-3 gap-4 md:gap-1 lg:gap-3 text-center mb-10 mt-10'>
				{[
					{ label: 'Protein', value: protein, goal: proteinGoal },
					{ label: 'Carbs', value: carbs, goal: carbsGoal },
					{ label: 'Fats', value: fats, goal: fatsGoal },
				].map(({ label, value, goal }) => {
					const { color, progress } = getProgressStyle(value, goal);

					return (
						<div key={label}>
							<div className='relative rounded-full flex items-center justify-center mx-auto mb-2' style={{ width: size, height: size }}>
								<ProgressCircle progress={progress} color={color} size={size} strokeWidth={strokeWidth} />
								<p className='absolute text-xl md:text-2xl font-bold'>{value}g</p>
							</div>
							<p className='text-xs md:text-sm text-neutral-700'>{label}</p>
							{goal > 0 && <p className='text-xs text-neutral-400 mt-1'>Goal: {goal}g</p>}
						</div>
					);
				})}
			</div>

			<div className='flex justify-end mb-3'>
				<p className='text-xs md:text-sm font-medium'>
					Total calories:{' '}
					<span className={`font-bold ${calorieGoal && calories > calorieGoal ? 'text-red-500' : 'text-green-500'}`}>
						{calories}
						{calorieGoal ? ` / ${calorieGoal}` : ''}
					</span>
				</p>
			</div>
		</div>
	);
}
