import { useState } from 'react';
import { Plus } from '@phosphor-icons/react';
import { RecipeModal } from '../../components/RecipeModal';
import { useRecipeContext } from '../../contexts/appContexts/recipesContext';
import { WeeklyCalendar } from '../../components/Calendar';

export function Planner() {
	const { setIsModalOpen } = useRecipeContext();
	const [currentDate, setCurrentDate] = useState(new Date());
	const [selectedDate, setSelectedDate] = useState(new Date());

	const navigateWeek = (days: number) => {
		const newDate = new Date(selectedDate);
		newDate.setDate(newDate.getDate() + days);
		setSelectedDate(newDate);

		if (newDate.getMonth() !== currentDate.getMonth()) {
			setCurrentDate(new Date(newDate.getFullYear(), newDate.getMonth(), 1));
		}
	};

	const isToday = (date: Date) => {
		const today = new Date();
		return date.getDate() === today.getDate() && date.getMonth() === today.getMonth() && date.getFullYear() === today.getFullYear();
	};

	const handleAddRecipe = () => {
		setIsModalOpen(true);
	};

	const handleDateClick = (date: Date) => {
		setSelectedDate(date);
	};

	return (
		<div className='max-w-3xl mx-auto py-6 px-4'>
			<h1 className='text-base md:text-xl font-semibold mb-6'>Meal Planner</h1>

			{/* Calendário semanal */}
			<WeeklyCalendar currentDate={currentDate} selectedDate={selectedDate} onDateClick={handleDateClick} onWeekChange={navigateWeek} />

			{/* Rest of your Planner component remains the same */}
			<div className='flex justify-between items-center mb-6'>
				<h2 className='text-sm md:text-lg font-medium text-neutral-800'>
					{selectedDate.toLocaleDateString('en-US', {
						weekday: 'long',
						day: 'numeric',
						month: 'short',
					})}
					{isToday(selectedDate) && <span className='ml-2 text-xs text-green-500'>Today</span>}
				</h2>

				<button onClick={handleAddRecipe} className='flex items-center gap-2 bg-green-400 hover:bg-green-500 text-white px-4 py-2.5 rounded-lg text-sm transition-colors'>
					<Plus size={18} />
					<span>Add Recipe</span>
				</button>
			</div>

			{/* Refeições */}
			<div className='bg-white rounded-xl p-6 shadow-[0_0_6px_0_rgba(0,0,0,0.1)]'>
				{['Breakfast', 'Snacks', 'Lunch', 'Dinner'].map(mealType => (
					<div key={mealType} className='mb-6 last:mb-0'>
						<div className='flex justify-between items-center mb-4'>
							<h3 className='text-sm font-semibold'>{mealType}</h3>
							<button onClick={handleAddRecipe} className='text-green-400 hover:text-green-500 text-xs flex items-center gap-1'>
								<Plus size={14} />
								<span>Add</span>
							</button>
						</div>

						<div className='bg-neutral-50 rounded-lg p-4 min-h-20'>
							<p className='text-xs text-neutral-400 italic'>No meals added yet</p>
						</div>

						<hr className='my-4 border-neutral-100' />
					</div>
				))}
			</div>

			{/* Total de calorias */}
			<div className='mt-6 pt-4 border-t border-neutral-200 flex justify-end'>
				<div className='text-sm font-medium'>
					Total calories: <span className='font-bold'>0</span>
				</div>
			</div>

			<RecipeModal />
		</div>
	);
}
