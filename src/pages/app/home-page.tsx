import { useRecipeContext } from '../../contexts/appContexts/recipesContext';
import { MagnifyingGlass } from '@phosphor-icons/react';

export function HomePage() {
	const { selectedCategory, setSelectedCategory, searchTerm, setSearchTerm, filteredRecipes } = useRecipeContext();

	const categories = ['Breakfast', 'Snacks', 'Main Meals'];


	return (
		<>
			<section className='mb-8'>
				<h1 className='text-base md:text-xl font-semibold mb-7'>Good Morning, Name</h1>

				<div className='bg-white rounded-xl p-4 md:p-10 shadow-md'>
					<div className='flex justify-between items-center mb-6 mt-3'>
						<h2 className='text-sm md:text-lg font-medium text-neutral-800'>Today´s macros</h2>
						<p className='text-xs md:text-sm text-neutral-500'>Monday, 21 May</p>
					</div>

					<div className='grid grid-cols-3 p-3 gap-4 md:gap-2 lg:gap-4 text-center mb-10 mt-10'>
						{['Protein', 'Carbs', 'Fats'].map(macro => (
							<div key={macro}>
								<div className='w-16 h-16 md:w-20 md:h-20 rounded-full border-2 border-neutral-300 flex items-center justify-center mx-auto mb-2'>
									<p className='text-lg md:text-xl font-bold'>0</p>
								</div>
								<p className='text-xs md:text-sm text-neutral-700'>{macro}</p>
							</div>
						))}
					</div>

					<div className='flex justify-end mb-3'>
						<p className='text-xs md:text-sm font-medium'>
							Total calories: <span className='font-bold'>0</span>
						</p>
					</div>
				</div>
			</section>

			<section className='mt-15'>
				<h2 className='text-base md:text-lg font-semibold mb-4'>Meal Recipes</h2>

				{/* Filters + Search bar */}
				{/* Filters + Search bar */}
				<div className='mb-6'>
					{/* Mobile layout */}
					<div className='flex flex-col md:hidden gap-4 mb-4'>
						{/* Search input */}
						<div className='relative w-full'>
							<input
								type='text'
								placeholder='Search for a recipe'
								value={searchTerm}
								onChange={e => setSearchTerm(e.target.value)}
								className='w-full pr-10 pl-4 py-2 text-sm rounded-md border border-neutral-300 focus:outline-none focus:ring-1 focus:ring-green-400'
							/>
							<MagnifyingGlass size={20} className='absolute right-3 top-1/2 transform -translate-y-1/2 text-neutral-400' />
						</div>

						{/* Filter buttons */}
						<div className='flex space-x-6 text-sm'>
							{categories.map(cat => (
								<button
									key={cat}
									onClick={() => setSelectedCategory(cat)}
									className={`relative pb-1 font-medium transition ${selectedCategory === cat ? 'text-green-500' : 'text-neutral-600 hover:text-green-400'}`}
								>
									{cat}
									{selectedCategory === cat && <span className='absolute left-0 -bottom-1 w-full h-0.5 bg-green-400'></span>}
								</button>
							))}
						</div>
					</div>

					{/* Desktop layout */}
					<div className='hidden md:flex md:items-center md:justify-between'>
						{/* Filter buttons */}
						<div className='flex space-x-6 text-sm'>
							{categories.map(cat => (
								<button
									key={cat}
									onClick={() => setSelectedCategory(cat)}
									className={`relative pb-1 font-medium transition ${selectedCategory === cat ? 'text-green-500' : 'text-neutral-600 hover:text-green-400'}`}
								>
									{cat}
									{selectedCategory === cat && <span className='absolute left-0 -bottom-1 w-full h-0.5 bg-green-400'></span>}
								</button>
							))}
						</div>

						{/* Search input */}
						<div className='relative w-72'>
							<input
								type='text'
								placeholder='Search for a recipe'
								value={searchTerm}
								onChange={e => setSearchTerm(e.target.value)}
								className='w-full pr-10 pl-4 py-2 text-sm rounded-md border border-neutral-300 focus:outline-none focus:ring-1 focus:ring-green-400'
							/>
							<MagnifyingGlass size={20} className='absolute right-3 top-1/2 transform -translate-y-1/2 text-neutral-400' />
						</div>
					</div>
				</div>

				{/* Recipe cards */}
				<div className='grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 gap-4 mt-15'>
					{filteredRecipes.map(recipe => (
						<div key={recipe.id} className='bg-white rounded-xl overflow-hidden relative'>
							<img src={recipe.image} alt={recipe.name} className='w-full h-40 object-cover rounded-t-xl' />
							<div className='p-4'>
								<h3 className='text-sm font-semibold mb-1'>{recipe.name}</h3>
								<p className='text-xs text-neutral-600 mb-2'>{recipe.kcal} kcal</p>
							</div>
							<button className='absolute bottom-4 right-4 bg-green-400 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm'>+</button>
						</div>
					))}
				</div>
			</section>
		</>
	);
}
