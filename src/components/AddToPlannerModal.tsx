import { useState } from 'react';
import { WeeklyCalendar } from './Calendar';
import { toast } from 'sonner';

interface AddToPlannerModalProps {
	isOpen: boolean;
	onClose: () => void;
	onAdd: (date: Date, mealType: string) => void;
	selectedRecipeName: string;
	selectedDate: Date;
	onDateChange: (date: Date) => void;
}

export function AddToPlannerModal({ isOpen, onClose, onAdd, selectedDate, onDateChange, selectedRecipeName }: AddToPlannerModalProps) {
	const [mealType, setMealType] = useState('Breakfast');
	const [currentDate, setCurrentDate] = useState(new Date(selectedDate));

	if (!isOpen) return null;

	const navigateWeek = (days: number) => {
		const newDate = new Date(selectedDate);
		newDate.setDate(newDate.getDate() + days);
		onDateChange(newDate);

		if (newDate.getMonth() !== currentDate.getMonth()) {
			setCurrentDate(new Date(newDate.getFullYear(), newDate.getMonth(), 1));
		}
	};

	const handleDateClick = (date: Date) => {
		onDateChange(date);
	};

	return (
		<div className='fixed inset-0 z-50 flex items-center justify-center bg-black/40'>
			<div className='bg-white rounded-lg p-6 w-full max-w-md'>
				<div className='flex justify-end'>
					<button onClick={onClose} className='text-gray-500 hover:text-gray-700 mb-3 cursor-pointer'>
						<svg xmlns='http://www.w3.org/2000/svg' className='h-6 w-6' fill='none' viewBox='0 0 24 24' stroke='currentColor'>
							<path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M6 18L18 6M6 6l12 12' />
						</svg>
					</button>
				</div>

				<WeeklyCalendar currentDate={currentDate} selectedDate={selectedDate} onDateClick={handleDateClick} onWeekChange={navigateWeek} />

				<div className='grid grid-cols-2 gap-2 my-4 mb-8'>
					{['Breakfast', 'Lunch', 'Dinner', 'Snack'].map(type => (
						<button
							key={type}
							onClick={() => setMealType(type)}
							className={`
                py-3 border rounded-sm cursor-pointer transition-colors
                ${mealType === type ? 'bg-green-300 border-green-300 text-white' : 'text-neutral-500 hover:bg-green-300 hover:border-green-300 hover:text-white'}
              `}
						>
							{type}
						</button>
					))}
				</div>

				<button
					onClick={() => {
						onAdd(selectedDate, mealType);
						toast.success(`${selectedRecipeName} was added to ${mealType.toLowerCase()}.`);
					}}
					className='
            w-full py-3 bg-green-400 hover:bg-green-500 
            text-white rounded-lg font-medium cursor-pointer
            transition-colors
          '
				>
					Add
				</button>
			</div>
		</div>
	);
}
