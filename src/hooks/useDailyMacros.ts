import { useEffect, useState } from 'react';
import { usePlannedMeals } from '../../src/hooks/usePlannedMeals';
import { useRecipeContext } from '../../src/contexts/appContexts/recipesContext';

export function useDailyMacros(userId: string | null, selectedDate: Date) {
	const [protein, setProtein] = useState(0);
	const [carbs, setCarbs] = useState(0);
	const [fats, setFats] = useState(0);
	const [calories, setCalories] = useState(0);

	const { allRecipes } = useRecipeContext();
	const { plannedMeals } = usePlannedMeals(userId, selectedDate);

	useEffect(() => {
		let totalProtein = 0;
		let totalCarbs = 0;
		let totalFats = 0;
		let totalCalories = 0;

		for (const meal of plannedMeals) {
			const recipe = allRecipes.find(r => r.id === meal.recipeId);
			if (recipe) {
				totalProtein += recipe.protein || 0;
				totalCarbs += recipe.carbs || 0;
				totalFats += recipe.fats || 0;
				totalCalories += recipe.kcal || 0;
			}
		}

		setProtein(totalProtein);
		setCarbs(totalCarbs);
		setFats(totalFats);
		setCalories(totalCalories);
	}, [plannedMeals, allRecipes]);

	return { protein, carbs, fats, calories };
}
