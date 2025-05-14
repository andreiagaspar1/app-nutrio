interface MacrosCardProps {
	date: string;
}

export function MacrosCard({ date }: MacrosCardProps) {
	return (
		<div className='bg-white rounded-xl p-4 md:p-10 shadow-[0_0_6px_0_rgba(0,0,0,0.1)]'>
			<div className='flex justify-between items-center mb-6 mt-1'>
				<h2 className='text-sm md:text-lg font-medium text-neutral-800'>Today´s macros</h2>
				<p className='text-xs md:text-sm text-neutral-500'>{date}</p>
			</div>

			<div className='grid grid-cols-3 p-3 gap-4 md:gap-1 lg:gap-3 text-center mb-10 mt-10'>
				{['Protein', 'Carbs', 'Fats'].map(macro => (
					<div key={macro}>
						<div className='w-20 h-20 md:w-24 md:h-24 rounded-full border-2 border-neutral-300 flex items-center justify-center mx-auto mb-2'>
							<p className='text-xl md:text-2xl font-bold'>0</p>
						</div>
						<p className='text-xs md:text-sm text-neutral-700'>{macro}</p>
					</div>
				))}
			</div>

			<div className='flex justify-end mb-3'>
				<p className='text-xs md:text-sm font-medium'>
					Total calories: <span className='font-bold'>0</span>
				</p>
			</div>
		</div>
	);
}
