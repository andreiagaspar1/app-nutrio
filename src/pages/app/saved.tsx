import { useState } from 'react';
import { Plus, Trash } from '@phosphor-icons/react';
import { SavedRecipesAddModal } from '../../components/SavedRecipesAddModal';
import { useRecipeContext } from '../../contexts/appContexts/recipesContext';
import { useUserData } from '../../hooks/useUserData';
import { useSavedMeals } from '../../hooks/useSavedMeals';

export function Saved() {
	const { allRecipes } = useRecipeContext();
	const [isAddModalOpen, setIsAddModalOpen] = useState(false);
	const { userId } = useUserData();
	const { savedMeals, addSavedMeal, removeSavedMeal } = useSavedMeals(userId);

	const handleAddRecipe = () => {
		setIsAddModalOpen(true);
	};

	const handleRecipeClick = (recipeId: number) => {
		const recipe = allRecipes.find(r => r.id === recipeId);
		if (!recipe || !userId) return;

		const newMeal = {
			recipeId,
			recipeName: recipe.name,
			kcal: recipe.kcal,
			date: new Date().toISOString().split('T')[0],
			mealType: 'saved',
		};

		addSavedMeal(newMeal);
		setIsAddModalOpen(false);
	};

	const handleRemoveRecipe = (mealId: string) => {
		if (!userId) return;
		removeSavedMeal(mealId);
	};

	return (
		<section>
			<div className='flex justify-between items-center mb-6'>
				{' '}
				
				<h1 className='text-base md:text-xl font-semibold'>Saved Recipes</h1>
				<button onClick={handleAddRecipe} className='flex items-center gap-2 bg-green-400 hover:bg-green-500 text-white px-4 py-2.5 rounded-lg text-sm transition-colors cursor-pointer'>
					<Plus size={18} />
					<span>Add Recipe</span>
				</button>
			</div>

			<div className='bg-white rounded-xl p-6 mb-10 mt-7 shadow-[0_0_6px_0_rgba(0,0,0,0.1)]'>
				{savedMeals.length > 0 ? (
					<ul className='space-y-3'>
						{savedMeals.map(meal => {
							const fullRecipe = allRecipes.find(recipe => recipe.id === meal.recipeId);
							const recipeImage = fullRecipe?.image?.thumbnail || '/placeholder-image.jpg';

							return (
								<li key={meal.id} className='flex justify-between items-center w-full gap-3'>
									<div className='flex-shrink-0 h-25 w-25'>
										<img src={recipeImage} alt={meal.recipeName} className='w-full h-full rounded-md object-cover' />
									</div>
									<div className='flex-1 min-w-0'>
										<p className='text-sm font-medium line-clamp-2 mb-1'>{meal.recipeName}</p>
										<p className='text-xs text-neutral-500'>{meal.kcal} kcal</p>
									</div>
									<button onClick={() => handleRemoveRecipe(meal.id!)} className='text-red-400 hover:text-red-500 cursor-pointer flex-shrink-0'>
										<Trash size={16} />
									</button>
								</li>
							);
						})}
					</ul>
				) : (
					<p className='text-xs text-neutral-400 italic'>No saved recipes yet</p>
				)}
			</div>

			<SavedRecipesAddModal isOpen={isAddModalOpen} onClose={() => setIsAddModalOpen(false)} onAddRecipe={handleRecipeClick} allRecipes={allRecipes} userId={userId || ''} />
		</section>
	);
}
