import React, { useState } from 'react';
import { useRecipeContext } from '../contexts/appContexts/recipesContext';
import { X, BookmarkSimple } from '@phosphor-icons/react';
import { useUserData } from '../hooks/useUserData';
import { usePlannedMeals } from '../hooks/usePlannedMeals';
import { AddToPlannerModal } from './AddToPlannerModal'; // Ajuste caminho conforme necessário

export const RecipeModal: React.FC = () => {
	const { selectedRecipe, isModalOpen, setIsModalOpen } = useRecipeContext();
	const { userId } = useUserData();

	const [isAddToPlannerOpen, setIsAddToPlannerOpen] = useState(false);
	const [selectedDate, setSelectedDate] = useState(new Date());

	// Passa userId e selectedDate para buscar ou adicionar refeições planejadas
	const { addMeal } = usePlannedMeals(userId, selectedDate);

	if (!isModalOpen || !selectedRecipe) return null;

	const handleAddToPlanner = (date: Date, mealType: string) => {
		if (!selectedRecipe) return;

		const newMeal = {
			recipeId: selectedRecipe.id,
			recipeName: selectedRecipe.name,
			kcal: selectedRecipe.kcal,
			mealType,
			date: date.toISOString().split('T')[0], // Formato YYYY-MM-DD
		};

		addMeal(newMeal);
		setIsAddToPlannerOpen(false);
		setIsModalOpen(false);
	};

	return (
		<>
			<div className='fixed inset-0 z-50'>
				<div className='fixed inset-0 bg-black/30 backdrop-blur-sm transition-opacity' onClick={() => setIsModalOpen(false)} />

				<div className='fixed inset-0 sm:flex sm:items-center sm:justify-center'>
					<div className='h-full sm:h-fit w-full sm:max-w-lg bg-white sm:rounded-xl shadow-xl flex flex-col sm:max-h-[90vh] sm:mx-auto sm:my-auto overflow-hidden relative'>
						<button onClick={() => setIsModalOpen(false)} className='absolute right-4 top-4 z-10 bg-white rounded-full p-2 shadow-md hover:bg-gray-100 cursor-pointer'>
							<X size={20} />
						</button>

						<div className='relative h-54 sm:h-54 w-full flex-shrink-0'>
							<img src={selectedRecipe.image?.full} alt={selectedRecipe.name} className='w-full h-full object-cover' />
						</div>

						<div className='flex-1 overflow-y-auto px-6 pt-6 pb-32 bg-white rounded-t-3xl -mt-6 relative z-10'>
							<div className='flex justify-between items-start mb-4'>
								<h2 className='text-lg md:text-xl font-semibold flex-1 break-words pr-2'>{selectedRecipe.name}</h2>
								<button className='text-neutral-300 hover:text-neutral-400 cursor-pointer'>
									<BookmarkSimple size={28} weight='fill' />
								</button>
							</div>

							<div className='flex flex-row gap-3 mb-6 mt-7'>
								<div className='border border-neutral-400 rounded-md py-3 px-3 text-center w-1/3 flex flex-col justify-center min-h-[80px]'>
									<p className='font-bold text-base md:text-md'>{selectedRecipe.kcal} kcal</p>
									<p className='text-xs md:text-sm text-neutral-600'>Calories</p>
								</div>
								<div className='border border-neutral-400 rounded-md py-3 px-3 w-2/3 flex flex-col justify-center min-h-[80px]'>
									<div className='flex justify-between divide-x divide-gray-300 text-center h-full'>
										<div className='flex-1 px-2 flex flex-col justify-center'>
											<p className='font-bold text-base md:text-md'>{selectedRecipe.protein}g</p>
											<p className='text-xs md:text-sm text-neutral-600'>Protein</p>
										</div>
										<div className='flex-1 px-2 flex flex-col justify-center'>
											<p className='font-bold text-base md:text-md'>{selectedRecipe.carbs}g</p>
											<p className='text-xs md:text-sm text-neutral-600'>Carbs</p>
										</div>
										<div className='flex-1 px-2 flex flex-col justify-center'>
											<p className='font-bold text-base md:text-md'>{selectedRecipe.fats}g</p>
											<p className='text-xs md:text-sm text-neutral-600'>Fats</p>
										</div>
									</div>
								</div>
							</div>

							<div className='mb-6 mt-7'>
								<h3 className='text-base md:text-lg font-semibold mb-2'>Ingredients</h3>
								<ul className='space-y-2'>
									{selectedRecipe.ingredients?.map((ingredient, index) => (
										<li key={index} className='flex items-start text-sm md:text-base'>
											<span className='inline-block w-4 h-4 border border-gray-400 rounded-full mt-1 mr-2'></span>
											<span>{ingredient}</span>
										</li>
									))}
								</ul>
							</div>

							<div className='mb-6 mt-10'>
								<h3 className='text-base md:text-lg font-semibold mb-2'>Preparation</h3>
								<ol className='space-y-3 text-sm md:text-base'>
									{selectedRecipe.preparation?.map((step, index) => (
										<li key={index} className='flex'>
											<span className='font-bold mr-2'>{index + 1}.</span>
											<span>{step}</span>
										</li>
									))}
								</ol>
							</div>

							{selectedRecipe.totalTime && (
								<div className='text-sm md:text-md text-neutral-500 mt-10'>
									<span className='font-medium'>Total Time: </span> {selectedRecipe.totalTime}
								</div>
							)}
						</div>

						<div className='absolute bottom-16 left-0 right-0 h-25 bg-gradient-to-t from-white to-transparent pointer-events-none z-10'></div>

						<div className='sticky bottom-0 left-0 right-0 bg-white p-6 z-20'>
							<button onClick={() => setIsAddToPlannerOpen(true)} className='w-full bg-green-400 hover:bg-green-500 text-white py-3 rounded-lg font-medium transition-colors cursor-pointer'>
								Add to Meal Plan
							</button>
						</div>
					</div>
				</div>
			</div>

			<AddToPlannerModal
				isOpen={isAddToPlannerOpen}
				onClose={() => setIsAddToPlannerOpen(false)}
				onAdd={handleAddToPlanner}
				selectedRecipeName={selectedRecipe.name}
				selectedDate={selectedDate}
				onDateChange={setSelectedDate}
			/>
		</>
	);
};
