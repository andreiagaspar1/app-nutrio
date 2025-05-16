import { useRecipeContext } from '../../contexts/appContexts/recipesContext';
import { RecipeModal } from '../../components/RecipeModal';
import { MacrosCard } from '../../components/MacrosCard';
import { SearchBar } from '../../components/SearchBar';
import { RecipesGrid } from '../../components/RecipeGrid';
import { useDailyMacros } from '../../hooks/useDailyMacros';
import { useUserData } from '../../hooks/useUserData';

export function HomePage() {
	const { selectedCategory, setSelectedCategory, searchTerm, setSearchTerm, filteredRecipes, setSelectedRecipe, setIsModalOpen } = useRecipeContext();

	const { userId, dailyCalorieGoal, proteinGoal, carbsGoal, fatGoal } = useUserData();

	
	const selectedDate = new Date();
	const formattedDate = selectedDate.toLocaleDateString('en-GB', {
		weekday: 'long',
		day: 'numeric',
		month: 'short',
	});

	const { protein, carbs, fats, calories } = useDailyMacros(userId, selectedDate);

	const categories = ['Breakfast', 'Snacks', 'Main Meals'];

	const handleRecipeClick = (recipe: Parameters<typeof setSelectedRecipe>[0]) => {
		setSelectedRecipe(recipe);
		setIsModalOpen(true);
	};

	return (
		<>
			<section className='mb-8'>
				<h1 className='text-base md:text-xl font-semibold mb-7'>Good Morning!</h1>
				<MacrosCard
					date={formattedDate}
					protein={protein}
					carbs={carbs}
					fats={fats}
					calories={calories}
					calorieGoal={dailyCalorieGoal ?? undefined}
					proteinGoal={proteinGoal ?? undefined}
					carbsGoal={carbsGoal ?? undefined}
					fatsGoal={fatGoal ?? undefined}
				/>
			</section>

			<section className='mt-10'>
				<h2 className='text-base md:text-lg font-semibold mb-4 md:mb-4'>Meal Recipes</h2>

				<SearchBar searchTerm={searchTerm} onSearchChange={setSearchTerm} categories={categories} selectedCategory={selectedCategory} onCategoryChange={setSelectedCategory} />

				<RecipesGrid recipes={filteredRecipes} onRecipeClick={handleRecipeClick} />

				<RecipeModal />
			</section>
		</>
	);
}
