export function MealTypeSelectModal({ isOpen, onClose, onSelectMealType }: { isOpen: boolean; onClose: () => void; onSelectMealType: (mealType: string) => void }) {
	const mealTypes = ['Breakfast', 'Snacks', 'Lunch', 'Dinner'];

	if (!isOpen) return null;

	return (
		<div className='fixed inset-0 bg-black/30 flex items-center justify-center z-50 p-4'>
			<div className='bg-white rounded-xl max-w-sm w-full p-6 flex flex-col gap-4'>
				<h3 className='text-lg font-semibold mb-4'>Select Meal</h3>
				<div className='flex flex-col gap-3'>
					{mealTypes.map(type => (
						<button key={type} onClick={() => onSelectMealType(type)} className='py-2 px-4 bg-neutral-300 hover:bg-green-500 text-white rounded transition cursor-pointer'>
							{type}
						</button>
					))}
					<button onClick={onClose} className='mt-4 text-center text-sm text-neutral-600 hover:underline cursor-pointer'>
						Cancel
					</button>
				</div>
			</div>
		</div>
	);
}
