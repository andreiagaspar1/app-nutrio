import { Recipe } from '../contexts/appContexts/recipesContext';

interface PlannedMeal {
	recipeId: number;
	date: string;
	mealType: string;
}

interface Macros {
  protein: number;
  carbs: number;
  fats: number;
  calories: number;
}

export function calculateTotalMacros(groupedMeals: { recipes: Recipe[] }[]): Macros {
	return groupedMeals.reduce(
		(totals, meal) => {
			meal.recipes.forEach(recipe => {
				totals.protein += recipe.protein || 0;
				totals.carbs += recipe.carbs || 0;
				totals.fats += recipe.fats || 0;
				totals.calories += recipe.kcal || 0;
			});
			return totals;
		},
		{ protein: 0, carbs: 0, fats: 0, calories: 0 },
	);
}


export function groupMealsByType(plannedMeals: PlannedMeal[], allRecipes: Recipe[], selectedDate: Date) {
	const formatDate = (date: Date) => date.toISOString().split('T')[0];
	const selectedDateStr = formatDate(selectedDate);

	const mealsForDate = plannedMeals.filter(meal => meal.date === selectedDateStr);

	return ['Breakfast', 'Snacks', 'Lunch', 'Dinner'].map(mealType => {
		const recipes = mealsForDate
			.filter(meal => meal.mealType === mealType)
			.map(meal => allRecipes.find(r => r.id === meal.recipeId))
			.filter((r): r is Recipe => r !== undefined);

		return { mealType, recipes };
	});
}

export function calculateTotalCalories(groupedMeals: { recipes: Recipe[] }[]) {
	return groupedMeals.reduce((total, meal) => total + meal.recipes.reduce((sum, recipe) => sum + (recipe.kcal || 0), 0), 0);
}
