import { useCallback, useState, useEffect } from 'react';
import { toast } from 'sonner';
import { useSavedMeals } from './useSavedMeals';
import { Recipe } from '../contexts/appContexts/recipesContext';

export const useSaveRecipe = (userId: string | null, recipe: Recipe | null) => {
	const { savedMeals, addSavedMeal, removeSavedMeal } = useSavedMeals(userId);
	const [isSaved, setIsSaved] = useState(false);

	useEffect(() => {
		if (recipe && userId) {
			setIsSaved(savedMeals.some(meal => meal.recipeId === recipe.id));
		}
	}, [recipe, savedMeals, userId]);

	const handleToggleSave = useCallback(async () => {
		if (!recipe || !userId) return;

		try {
			if (isSaved) {
				const mealToRemove = savedMeals.find(meal => meal.recipeId === recipe.id);
				if (mealToRemove?.id) {
					await removeSavedMeal(mealToRemove.id);
					toast.warning(`${recipe.name} was removed from saved recipes`);
					setIsSaved(false);
				}
			} else {
				const newMeal = {
					recipeId: recipe.id,
					recipeName: recipe.name,
					kcal: recipe.kcal,
					date: new Date().toISOString().split('T')[0],
					mealType: 'saved',
					createdAt: new Date(), 
				};
				await addSavedMeal(newMeal);
				toast.success(`${recipe.name} was added to your saved recipes`);
				setIsSaved(true);
			}
		} catch (error) {
			toast.error('An error occurred while saving the recipe');
			console.error('Error toggling save:', error);
		}
	}, [isSaved, recipe, userId, savedMeals, addSavedMeal, removeSavedMeal]);

	return { isSaved, handleToggleSave };
};
