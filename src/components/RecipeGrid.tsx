import { useState } from 'react';
import { Recipe } from '../contexts/appContexts/recipesContext';
import { RecipeCard } from './RecipeCard';
import { AddToPlannerModal } from './AddToPlannerModal';
import { useUserData } from '../hooks/useUserData';
import { usePlannedMeals } from '../hooks/usePlannedMeals';

interface RecipesGridProps {
	recipes: Recipe[];
	onRecipeClick: (recipe: Recipe) => void;
}

export function RecipesGrid({ recipes, onRecipeClick }: RecipesGridProps) {
	const [isAddToPlannerOpen, setIsAddToPlannerOpen] = useState(false);
	const [selectedRecipe, setSelectedRecipe] = useState<Recipe | null>(null);
	const [selectedDate, setSelectedDate] = useState(new Date());
	const { userId } = useUserData();
	const { addMeal } = usePlannedMeals(userId, selectedDate);

	const handleQuickAddClick = (recipe: Recipe) => {
		setSelectedRecipe(recipe);
		setIsAddToPlannerOpen(true);
	};

	const handleAddToPlanner = (date: Date, mealType: string) => {
		if (!selectedRecipe) return;

		const newMeal = {
			recipeId: selectedRecipe.id,
			recipeName: selectedRecipe.name,
			kcal: selectedRecipe.kcal,
			mealType,
			date: date.toISOString().split('T')[0],
		};

		addMeal(newMeal);
		setIsAddToPlannerOpen(false);
	};

	return (
		<>
			<div className='grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 gap-5 mt-5 mb-10'>
				{recipes.map(recipe => (
					<RecipeCard key={recipe.id} recipe={recipe} onRecipeClick={onRecipeClick} onQuickAddClick={handleQuickAddClick} />
				))}
			</div>

			{selectedRecipe && (
				<AddToPlannerModal
					isOpen={isAddToPlannerOpen}
					onClose={() => setIsAddToPlannerOpen(false)}
					onAdd={handleAddToPlanner}
					selectedRecipeName={selectedRecipe.name}
					selectedDate={selectedDate}
					onDateChange={setSelectedDate}
				/>
			)}
		</>
	);
}
