import { useRecipeContext } from '../../contexts/appContexts/recipesContext';
import { RecipeModal } from '../../components/RecipeModal';
import { MacrosCard} from '../../components/MacrosCard';
import { SearchBar } from '../../components/SearchBar';
import { RecipesGrid } from '../../components/RecipesGrid';

export function HomePage() {
	const { selectedCategory, setSelectedCategory, searchTerm, setSearchTerm, filteredRecipes, setSelectedRecipe, setIsModalOpen } = useRecipeContext();

	const categories = ['Breakfast', 'Snacks', 'Main Meals'];

	const handleRecipeClick = (recipe: Parameters<typeof setSelectedRecipe>[0]) => {
		setSelectedRecipe(recipe);
		setIsModalOpen(true);
	};

	return (
		<>
			<section className='mb-8'>
				<h1 className='text-base md:text-xl font-semibold mb-7'>Good Morning, Name</h1>
				<MacrosCard date='Monday, 21 May' />
			</section>

			<section className='mt-15'>
				<h2 className='text-base md:text-lg font-semibold mb-6 md:mb-6'>Meal Recipes</h2>

				<SearchBar searchTerm={searchTerm} onSearchChange={setSearchTerm} categories={categories} selectedCategory={selectedCategory} onCategoryChange={setSelectedCategory} />

				<RecipesGrid recipes={filteredRecipes} onRecipeClick={handleRecipeClick} />

				<RecipeModal />
			</section>
		</>
	);
}
