import { CaretLeft, CaretRight } from '@phosphor-icons/react';

interface WeeklyCalendarProps {
	currentDate: Date;
	selectedDate: Date;
	onDateClick: (date: Date) => void;
	onWeekChange: (days: number) => void;
}

export function WeeklyCalendar({ currentDate, selectedDate, onDateClick, onWeekChange }: WeeklyCalendarProps) {
	
	const getWeekDates = (date: Date) => {
		const startDate = new Date(date);
		const dayOfWeek = startDate.getDay();
		const diff = startDate.getDate() - dayOfWeek + (dayOfWeek === 0 ? -6 : 1);
		startDate.setDate(diff);

		return Array.from({ length: 7 }, (_, i) => {
			const date = new Date(startDate);
			date.setDate(startDate.getDate() + i);
			return date;
		});
	};

	const isToday = (date: Date) => {
		const today = new Date();
		return date.getDate() === today.getDate() && date.getMonth() === today.getMonth() && date.getFullYear() === today.getFullYear();
	};

	const isSelected = (date: Date) => {
		return date.getDate() === selectedDate.getDate() && date.getMonth() === selectedDate.getMonth() && date.getFullYear() === selectedDate.getFullYear();
	};

	const monthYear = currentDate.toLocaleString('default', {
		month: 'long',
		year: 'numeric',
	});

	const weekDates = getWeekDates(selectedDate);

	return (
		<div className='mb-8 bg-white rounded-xl p-6 pt-12 pb-12 shadow-[0_0_6px_0_rgba(0,0,0,0.1)]'>
			<div className='flex justify-center mb-4 mt-4'>
				<h2 className='text-sm md:text-lg font-medium text-neutral-800'>{monthYear}</h2>
			</div>
			<div className='flex items-center justify-between mb-6'>
				<button onClick={() => onWeekChange(-7)} className='text-neutral-500 hover:text-green-500 p-2 cursor-pointer' aria-label='Previous week'>
					<CaretLeft size={20} />
				</button>

				<div className='grid grid-cols-7 gap-4 flex-1 mx-4'>
					{weekDates.map(date => (
						<div key={date.toString()} className='flex flex-col items-center'>
							<div className='text-xs text-neutral-500 mb-2'>{date.toLocaleDateString('en-US', { weekday: 'short' })}</div>
							<button
								onClick={() => onDateClick(date)}
								className={`w-12 h-12 rounded-full flex flex-col items-center justify-center text-sm transition-colors ${
									isSelected(date) ? 'bg-green-400 text-white' : isToday(date) ? 'border-2 border-green-400 text-green-500' : 'hover:bg-neutral-100'
								} ${date.getMonth() !== currentDate.getMonth() ? 'text-neutral-400' : ''}`}
							>
								{date.getDate()}
							</button>
						</div>
					))}
				</div>

				<button onClick={() => onWeekChange(7)} className='text-neutral-500 hover:text-green-500 p-2 cursor-pointer' aria-label='Next week'>
					<CaretRight size={20} />
				</button>
			</div>
		</div>
	);
}