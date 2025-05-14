import { Recipe } from '../contexts/appContexts/recipesContext'; // Adjust the import path as needed

interface RecipeCardProps {
	recipe: Recipe;
	onRecipeClick: (recipe: Recipe) => void;
}

export function RecipeCard({ recipe, onRecipeClick }: RecipeCardProps) {
	return (
		<div className='bg-white rounded-xl overflow-hidden relative'>
			<button onClick={() => onRecipeClick(recipe)} className='w-full h-45 focus:outline-none cursor-pointer'>
				<img src={recipe.image.thumbnail} alt={recipe.name} className='w-full h-full object-cover rounded-t-xl' />
			</button>
			<div className='p-4'>
				<h3 className='text-sm font-semibold mb-1'>{recipe.name}</h3>
				<p className='text-xs text-neutral-600 mb-2'>{recipe.kcal} kcal</p>
			</div>
			<button className='absolute bottom-4 right-4 bg-green-400/30 hover:bg-green-400 text-green-600 hover:text-white rounded-full w-6 h-6 flex items-center justify-center text-xl transition-colors duration-200 cursor-pointer'>
				+
			</button>
		</div>
	);
}
