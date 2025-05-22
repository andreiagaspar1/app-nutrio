import { useState } from 'react';
import { Plus, Trash } from '@phosphor-icons/react';
import { SavedRecipesAddModal } from '../../components/SavedRecipesAddModal';
import { useRecipeContext } from '../../contexts/appContexts/recipesContext';
import { useUserData } from '../../hooks/useUserData';
import { useSavedMeals } from '../../hooks/useSavedMeals';
import { MagnifyingGlass } from '@phosphor-icons/react';
import { RecipeModal } from '../../components/RecipeModal';
import { toast } from 'sonner';

export function Saved() {
	const { allRecipes, setSelectedRecipe, setIsModalOpen } = useRecipeContext();
	const [isAddModalOpen, setIsAddModalOpen] = useState(false);
	const { userId } = useUserData();
	const { savedMeals, addSavedMeal, removeSavedMeal } = useSavedMeals(userId);
	const [searchTerm, setSearchTerm] = useState('');

	const filteredMeals = savedMeals.filter(meal => meal.recipeName.toLowerCase().includes(searchTerm.toLowerCase()));

	const handleAddRecipe = () => {
		setIsAddModalOpen(true);
	};

	const handleRecipeClick = (recipeId: number) => {
		const recipe = allRecipes.find(r => r.id === recipeId);
		if (!recipe || !userId) return;

		const isAlreadySaved = savedMeals.some(meal => meal.recipeId === recipeId);
		if (isAlreadySaved) {
			toast.error('This recipe is already saved');
			return;
		}

		const newMeal = {
			recipeId,
			recipeName: recipe.name,
			kcal: recipe.kcal,
			date: new Date().toISOString().split('T')[0],
			mealType: 'saved',
			createdAt: new Date(),
		};

		addSavedMeal(newMeal);
		setIsAddModalOpen(false);
	};

	const handleRemoveRecipe = (mealId: string) => {
		if (!userId) return;
		removeSavedMeal(mealId);
	};

	const handleRecipeCardClick = (recipeId: number) => {
		const recipe = allRecipes.find(r => r.id === recipeId);
		if (recipe) {
			setSelectedRecipe(recipe);
			setIsModalOpen(true);
		}
	};

	return (
		<section>
			<div className='flex flex-col gap-4 mb-6'>
				<div className='flex justify-between items-center'>
					<h1 className='text-base md:text-xl font-semibold'>Saved Recipes</h1>
					<button onClick={handleAddRecipe} className='flex items-center gap-2 bg-green-400 hover:bg-green-500 text-white px-4 py-2.5 rounded-lg text-sm transition-colors cursor-pointer'>
						<Plus size={18} />
						<span>Add Recipe</span>
					</button>
				</div>

				<div className='relative w-full mt-2 mb-2'>
					<input
						type='text'
						placeholder='Search your saved recipes...'
						value={searchTerm}
						onChange={e => setSearchTerm(e.target.value)}
						className='w-full pr-10 pl-4 py-2 text-sm rounded-lg border border-neutral-200 focus:outline-none focus:ring-1 focus:ring-green-400'
					/>
					<MagnifyingGlass size={18} className='absolute right-3 top-1/2 transform -translate-y-1/2 text-neutral-400' />
				</div>
			</div>

			<div className='bg-white rounded-xl p-6 mb-10 mt-2 shadow-[0_0_6px_0_rgba(0,0,0,0.1)]'>
				{filteredMeals.length > 0 ? (
					<ul className='space-y-3'>
						{filteredMeals.map(meal => {
							const fullRecipe = allRecipes.find(recipe => recipe.id === meal.recipeId);
							const recipeImage = fullRecipe?.image?.thumbnail || '/placeholder-image.jpg';

							return (
								<li
									key={meal.id}
									className='flex justify-between items-center w-full gap-3 cursor-pointer bg-neutral-50 rounded-lg p-4 hover:bg-neutral-100 transition-colors'
									onClick={() => handleRecipeCardClick(meal.recipeId)}
								>
									<div className='flex-shrink-0 h-25 w-25'>
										<img src={recipeImage} alt={meal.recipeName} className='w-full h-full rounded-md object-cover' />
									</div>
									<div className='flex-1 min-w-0'>
										<p className='text-sm font-medium line-clamp-2 mb-1'>{meal.recipeName}</p>
										<p className='text-xs text-neutral-500'>{meal.kcal} kcal</p>
										{meal.createdAt && <p className='text-xs text-neutral-400 mt-1'>Saved on: {new Date(meal.createdAt).toLocaleDateString()}</p>}
									</div>
									<button
										onClick={e => {
											e.stopPropagation();
											handleRemoveRecipe(meal.id!);
										}}
										className='text-red-400 hover:text-red-500 cursor-pointer flex-shrink-0'
									>
										<Trash size={16} />
									</button>
								</li>
							);
						})}
					</ul>
				) : (
					<p className='text-xs text-neutral-400 italic'>{searchTerm ? 'No recipes match your search' : 'No saved recipes yet'}</p>
				)}
			</div>

			<SavedRecipesAddModal isOpen={isAddModalOpen} onClose={() => setIsAddModalOpen(false)} onAddRecipe={handleRecipeClick} allRecipes={allRecipes} userId={userId || ''} />

			<RecipeModal />
		</section>
	);
}
