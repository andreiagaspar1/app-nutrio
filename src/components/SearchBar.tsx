import { MagnifyingGlass } from '@phosphor-icons/react';

interface SearchBarProps {
	searchTerm: string;
	onSearchChange: (term: string) => void;
	categories: string[];
	selectedCategory: string;
	onCategoryChange: (category: string) => void;
}

export function SearchBar({ searchTerm, onSearchChange, categories, selectedCategory, onCategoryChange }: SearchBarProps) {
	return (
		<div className='mb-6'>
			<div className='flex flex-col md:hidden gap-4 mb-4'>
				<div className='mb-3'>
					<div className='relative w-full'>
						<input
							type='text'
							placeholder='Search for a recipe'
							value={searchTerm}
							onChange={e => onSearchChange(e.target.value)}
							className='w-full pr-10 pl-4 py-2 text-sm rounded-md border border-neutral-300 focus:outline-none focus:ring-1 focus:ring-green-400'
						/>
						<MagnifyingGlass size={20} className='absolute right-3 top-1/2 transform -translate-y-1/2 text-neutral-400' />
					</div>
				</div>

				<div className='flex space-x-6 text-sm mt-1'>
					{categories.map(cat => (
						<button
							key={cat}
							onClick={() => onCategoryChange(cat)}
							className={`relative pb-1 font-medium transition cursor-pointer ${selectedCategory === cat ? 'text-green-500' : 'text-neutral-600 hover:text-green-400'}`}
						>
							{cat}
							{selectedCategory === cat && <span className='absolute left-0 bottom-0 w-full h-[1.5px] bg-green-400'></span>}
						</button>
					))}
				</div>
			</div>

			<div className='hidden md:flex md:items-center md:justify-between'>
				<div className='flex space-x-6 text-sm'>
					{categories.map(cat => (
						<button
							key={cat}
							onClick={() => onCategoryChange(cat)}
							className={`relative pb-1 font-medium transition cursor-pointer ${selectedCategory === cat ? 'text-green-500' : 'text-neutral-600 hover:text-green-400'}`}
						>
							{cat}
							{selectedCategory === cat && <span className='absolute left-0 bottom-0 w-full h-[1px] bg-green-400'></span>}
						</button>
					))}
				</div>

				<div className='relative w-72'>
					<input
						type='text'
						placeholder='Search for a recipe'
						value={searchTerm}
						onChange={e => onSearchChange(e.target.value)}
						className='w-full pr-10 pl-4 py-2 text-sm rounded-md border border-neutral-300 focus:outline-none focus:ring-1 focus:ring-green-400'
					/>
					<MagnifyingGlass size={20} className='absolute right-3 top-1/2 transform -translate-y-1/2 text-neutral-400' />
				</div>
			</div>
		</div>
	);
}
