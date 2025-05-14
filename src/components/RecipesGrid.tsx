import { Recipe } from '../contexts/appContexts/recipesContext'; 
import { RecipeCard } from './RecipeCard';

interface RecipesGridProps {
	recipes: Recipe[];
	onRecipeClick: (recipe: Recipe) => void;
}

export function RecipesGrid({ recipes, onRecipeClick }: RecipesGridProps) {
	return (
		<div className='grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 gap-5 mt-10'>
			{recipes.map(recipe => (
				<RecipeCard key={recipe.id} recipe={recipe} onRecipeClick={onRecipeClick} />
			))}
		</div>
	);
}
