import { X, Plus } from '@phosphor-icons/react';
import { useRecipeContext } from '../contexts/appContexts/recipesContext';
import { SearchBar } from './SearchBar';

interface PlannerAddModalProps {
	isOpen: boolean;
	onClose: () => void;
	mealType?: string;
	onAddRecipe: (recipeId: number) => void;
}

export function PlannerAddModal({ isOpen, onClose, mealType, onAddRecipe }: PlannerAddModalProps) {
	const { searchTerm, setSearchTerm, selectedCategory, setSelectedCategory, filteredRecipes } = useRecipeContext();

	if (!isOpen) return null;

	const categories = ['Breakfast', 'Snacks', 'Main Meals'];

	return (
		<div className='fixed inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center z-50 p-4'>
			<div className='bg-white rounded-xl w-full max-w-2xl max-h-[80vh] flex flex-col'>
				<div className='flex justify-between items-center pt-6 px-6'>
					<h2 className='text-lg font-semibold'>Add Recipe to {mealType || 'Planner'}</h2>
					<button onClick={onClose} className='text-neutral-500 hover:text-neutral-700 cursor-pointer'>
						<X size={24} />
					</button>
				</div>

				<div className='p-6 overflow-y-auto flex-grow'>
					<SearchBar searchTerm={searchTerm} onSearchChange={setSearchTerm} categories={categories} selectedCategory={selectedCategory} onCategoryChange={setSelectedCategory} variant='modal' />

					<div className='grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 gap-4 mt-6'>
						{filteredRecipes.map(recipe => (
							<div key={recipe.id} className='bg-white rounded-xl overflow-hidden relative border border-neutral-100 shadow-sm'>
								<img
									src={recipe.image.thumbnail}
									alt={recipe.name}
									className='w-full h-44 object-cover rounded-t-xl' 
								/>
								<div className='p-4'>
									{' '}
									
									<h3 className='text-sm font-semibold mb-1 line-clamp-2'>{recipe.name}</h3>
									<p className='text-xs text-neutral-600'>{recipe.kcal} kcal</p>
								</div>
								<button
									onClick={() => onAddRecipe(recipe.id)}
									className='absolute bottom-3 right-3 bg-green-400/30 hover:bg-green-400 text-green-600 hover:text-white rounded-full w-6 h-6 flex items-center justify-center transition-colors duration-200 cursor-pointer'
								>
									<Plus size={16} weight='bold' />
								</button>
							</div>
						))}
					</div>
				</div>
			</div>
		</div>
	);
}
