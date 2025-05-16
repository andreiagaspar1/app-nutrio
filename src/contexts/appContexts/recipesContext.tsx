import React, { createContext, useState, useContext } from 'react';
import scrambledEggsThumb from '../../assets/recipes-images/cheesy_spinach_scrambled_egss_thumb.jpg';
import scrambledEggsFull from '../../assets/recipes-images/Spinach_scrambled_eggs_full.jpg';
import yogurtBowlThumb from '../../assets/recipes-images/strawberrys_granola_yogurt_bowl_thumb.jpg';
import yogurtBowlFull from '../../assets/recipes-images/Strawberrys_yogurt_bowl_full.jpg';
import bananaPancakesThumb from '../../assets/recipes-images/protein_banana_pancakes_thumb.jpg';
import bananaPancakesFull from '../../assets/recipes-images/banana_pancakes_full.jpg';
import overnightOatsThumb from '../../assets/recipes-images/creamy_peanut_butter_overnight_oats_thumb.jpg';
import overnightOatsFull from '../../assets/recipes-images/Overnight_oats_full.jpg';
import muffinsThumb from '../../assets/recipes-images/egg_white_broccoli_muffin_thumb.jpg';
import muffinsFull from '../../assets/recipes-images/Egg_muffin_full.jpg';
import chiaPuddingThumb from '../../assets/recipes-images/chocolate_chia_pudding_parfait_thumb.jpg';
import chiaPuddingFull from '../../assets/recipes-images/Chia_pudding_parfait_full.jpg';
import cottageToastThumb from '../../assets/recipes-images/cottage_cheese_toast_cherry_tomatos_thumb.jpg';
import cottageToastFull from '../../assets/recipes-images/Cottage_cheese_toast_full.jpg';
import mugCakeThumb from '../../assets/recipes-images/salted_caramel_mug_cake_thumb.jpg';
import mugCakeFull from '../../assets/recipes-images/Salted_caramel_mug_cake_full.jpg';
import turkeyBologneseThumb from '../../assets/recipes-images/turkey_bolognese_zucchini_noodles_thumb.jpg';
import turkeyBologneseFull from '../../assets/recipes-images/Turkey_bolognese_full.jpg';
import bakedSalmonThumb from '../../assets/recipes-images/oven_baked_salmon_thumb.jpg';
import bakedSalmonFull from '../../assets/recipes-images/Baked_salmon_full.jpg';
import roastedChickenThumb from '../../assets/recipes-images/roasted_chicken_breast_thumb.jpg';
import roastedChickenFull from '../../assets/recipes-images/Roasted_Chicken_full.jpg';
import tunaWrapsThumb from '../../assets/recipes-images/mediterranean_tuna_wrap_thumb.jpg';
import tunaWrapsFull from '../../assets/recipes-images/Tuna_wrap_full.jpg';

export interface Recipe {
	id: number;
	name: string;
	kcal: number;
	image: {
		thumbnail: string;
		full: string;
	};
	category: string;
	ingredients?: string[];
	preparation?: string[];
	totalTime?: string;
	protein?: number;
	carbs?: number;
	fats?: number;
}

interface RecipeContextType {
	allRecipes: Recipe[];
	savedRecipes: Recipe[]; // Nova propriedade
	addSavedRecipe: (recipe: Recipe) => void; // Nova função
	removeSavedRecipe: (recipeId: number) => void; // Nova função
	selectedCategory: string;
	setSelectedCategory: React.Dispatch<React.SetStateAction<string>>;
	searchTerm: string;
	setSearchTerm: React.Dispatch<React.SetStateAction<string>>;
	filteredRecipes: Recipe[];
	selectedRecipe: Recipe | null;
	setSelectedRecipe: React.Dispatch<React.SetStateAction<Recipe | null>>;
	isModalOpen: boolean;
	setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const RecipeContext = createContext<RecipeContextType>({
	allRecipes: [],
	savedRecipes: [], 
	addSavedRecipe: () => {},
	removeSavedRecipe: () => {},
	selectedCategory: 'Breakfast',
	setSelectedCategory: () => {},
	searchTerm: '',
	setSearchTerm: () => {},
	filteredRecipes: [],
	selectedRecipe: null,
	setSelectedRecipe: () => {},
	isModalOpen: false,
	setIsModalOpen: () => {},
});

interface RecipeProviderProps {
	children: React.ReactNode;
}

export const RecipeProvider: React.FC<RecipeProviderProps> = ({ children }) => {
	const allRecipes = [
		{
			id: 1,
			name: 'Strawberrys and Granola Yogurt Bowl',
			kcal: 334,
			image: {
				thumbnail: yogurtBowlThumb,
				full: yogurtBowlFull,
			},
			category: 'Breakfast',
			ingredients: ['150g plain greek yogurt', '75g strawberrys', '30g protein granola', '10g honey'],
			preparation: [
				'Add the Greek yogurt to a bowl.',
				'Top with sliced strawberries and protein granola.',
				'Drizzle honey over the top.',
				'Enjoy immediately or layer in a jar for meal prep - just keep granola separate until eating to maintain texture.',
			],
			totalTime: '3 min',
			protein: 25,
			carbs: 33,
			fats: 7,
		},
		{
			id: 2,
			name: 'Cheesy Spinach Scrambled Eggs',
			kcal: 245,
			image: {
				thumbnail: scrambledEggsThumb,
				full: scrambledEggsFull,
			},
			category: 'Breakfast',
			ingredients: ['1 whole egg', '2 egg whites', '40g spinach (fresh or frozen)', '15g low-fat shredded cheese', '1 tsp olive oil or nonstick spray', 'Salt and pepper to taste'],
			preparation: [
				'Sauté spinach in a non-stick skillet with a bit of oil or cooking spray.',
				'Whisk together the whole egg and egg whites, season with salt and pepper.',
				'Add eggs to the skillet and gently scramble with the spinach.',
				'Once almost set, sprinkle in the low-fat cheese and stir until melted.',
				'Serve immediately, optionally with a slice of whole-grain toast.',
			],
			totalTime: '7 min',
			protein: 22,
			carbs: 3,
			fats: 12,
		},
		{
			id: 3,
			name: 'Protein Banana Pancakes',
			kcal: 358,
			image: {
				thumbnail: bananaPancakesThumb,
				full: bananaPancakesFull,
			},
			category: 'Breakfast',
			ingredients: [
				'1 medium ripe banana',
				'2 egg whites',
				'1 scoop (30g) vanilla whey protein',
				'20g oat flour',
				'1/2 tsp baking powder',
				'1/2 tsp cinnamon (optional)',
				'Nonstick spray for cooking',
			],
			preparation: [
				'Mash banana, then mix in egg whites until combined.',
				'Add whey protein, oat flour, baking powder, and cinnamon. Stir into a batter.',
				'Heat nonstick skillet with spray and cook pancakes in batches.',
				'Flip after 2-3 minutes or when bubbles form, then cook other side.',
				'Serve with Greek yogurt or sugar-free syrup.',
			],
			totalTime: '10 min',
			protein: 30,
			carbs: 29,
			fats: 5,
		},

		{
			id: 4,
			name: 'Creamy Peanut Butter Overnight Oats',
			kcal: 382,
			image: {
				thumbnail: overnightOatsThumb,
				full: overnightOatsFull,
			},
			category: 'Breakfast',
			ingredients: [
				'40g rolled oats',
				'150ml unsweetened almond milk',
				'1 scoop (30g) vanilla protein powder',
				'10g powdered peanut butter (e.g., PB2)',
				'1/2 banana, mashed',
				'1/2 tsp vanilla extract',
				'Optional: pinch of salt or sweetener',
			],
			preparation: [
				'In a jar, mix oats, almond milk, protein powder, powdered peanut butter, banana, and vanilla.',
				'Stir thoroughly until smooth. Adjust sweetness as needed.',
				'Refrigerate overnight (or minimum 4 hours).',
				'Stir in the morning and top with banana slices or a sprinkle of cinnamon.',
			],
			totalTime: '5 min prep + overnight chill',
			protein: 32,
			carbs: 34,
			fats: 6,
		},
		{
			id: 5,
			name: 'Egg White and Broccoli Muffins',
			kcal: 142,
			image: {
				thumbnail: muffinsThumb,
				full: muffinsFull,
			},
			category: 'Snacks',
			ingredients: [
				'120ml egg whites (about 4 egg whites)',
				'50g steamed broccoli, finely chopped',
				'20g low-fat feta or shredded cheese',
				'1 tbsp chopped onion or green onion',
				'Salt, pepper, and garlic powder to taste',
				'Nonstick spray',
			],
			preparation: [
				'Preheat oven to 180°C (350°F) and spray a muffin tray with nonstick spray.',
				'Mix egg whites, chopped broccoli, cheese, onion, and seasoning in a bowl.',
				'Pour into 3-4 muffin slots and bake for 15-18 minutes until set.',
				'Let cool slightly and enjoy warm or cold. Store in fridge for 3-4 days.',
			],
			totalTime: '20 min',
			protein: 18,
			carbs: 4,
			fats: 4,
		},
		{
			id: 6,
			name: 'Chocolate Chia Pudding Parfait',
			kcal: 210,
			image: {
				thumbnail: chiaPuddingThumb,
				full: chiaPuddingFull,
			},
			category: 'Snacks',
			ingredients: [
				'150g chocolate protein pudding or Greek yogurt',
				'10g chia seeds',
				'1 tsp cocoa powder (optional, for richer flavor)',
				'20ml unsweetened almond milk',
				'10g granola or crushed rice cakes for crunch (optional)',
				'Fresh berries for topping (optional)',
			],
			preparation: [
				'In a bowl, mix protein pudding, chia seeds, cocoa powder, and almond milk.',
				'Let sit for 10-15 minutes (or refrigerate longer for thicker texture).',
				'Layer into a jar or bowl with granola and berries if using.',
				'Enjoy immediately or keep chilled until ready to serve.',
			],
			totalTime: '15 min',
			protein: 20,
			carbs: 12,
			fats: 7,
		},
		{
			id: 7,
			name: 'Cottage Cheese Toast w/ Cherry Tomatoes',
			kcal: 178,
			image: {
				thumbnail: cottageToastThumb,
				full: cottageToastFull,
			},
			category: 'Snacks',
			ingredients: [
				'1 slice whole grain or high-protein bread',
				'80g low-fat cottage cheese',
				'4-5 cherry tomatoes, halved',
				'Salt, pepper, and dried oregano or basil',
				'Optional: drizzle of balsamic glaze (sugar-free)',
			],
			preparation: [
				'Toast the bread to your preference.',
				'Spread cottage cheese evenly over the toast.',
				'Top with cherry tomatoes and sprinkle with seasoning.',
				'Drizzle with balsamic glaze if desired. Serve immediately.',
			],
			totalTime: '5 min',
			protein: 17,
			carbs: 15,
			fats: 5,
		},
		{
			id: 8,
			name: 'Salted Caramel Mug Cake',
			kcal: 235,
			image: {
				thumbnail: mugCakeThumb,
				full: mugCakeFull,
			},
			category: 'Snacks',
			ingredients: [
				'1 scoop (30g) salted caramel whey protein',
				'15g oat flour or almond flour',
				'1/4 tsp baking powder',
				'1 egg white',
				'40ml almond milk',
				'Pinch of salt',
				'Optional: sugar-free caramel syrup or crushed rice cake on top',
			],
			preparation: [
				'In a microwave-safe mug, mix protein powder, flour, baking powder, and salt.',
				'Add egg white and almond milk. Stir until a smooth batter forms.',
				'Microwave on high for 60-90 seconds, depending on your microwave strength.',
				'Let cool slightly. Top with sugar-free caramel syrup if desired.',
			],
			totalTime: '5 min',
			protein: 26,
			carbs: 9,
			fats: 6,
		},
		{
			id: 9,
			name: 'Turkey Bolognese Sauce w/ Zucchini Noodles',
			kcal: 365,
			image: {
				thumbnail: turkeyBologneseThumb,
				full: turkeyBologneseFull,
			},
			category: 'Main Meals',
			ingredients: [
				'150g lean ground turkey (93% or lower fat)',
				'1 cup crushed tomatoes (no sugar added)',
				'1/2 small onion, finely diced',
				'1 garlic clove, minced',
				'1 tsp olive oil',
				'1 tsp Italian herbs',
				'2 medium zucchinis, spiralized',
				'Salt and pepper to taste',
			],
			preparation: [
				'Heat olive oil in a skillet and sauté onion and garlic until soft.',
				'Add ground turkey and cook until browned.',
				'Pour in crushed tomatoes, add herbs, and simmer for 10-15 minutes.',
				'Steam or sauté zucchini noodles for 1-2 minutes until just tender.',
				'Top noodles with turkey sauce and serve hot.',
			],
			totalTime: '20 min',
			protein: 35,
			carbs: 15,
			fats: 13,
		},
		{
			id: 10,
			name: 'Oven-Baked Salmon w/ Rice and Asparagus',
			kcal: 420,
			image: {
				thumbnail: bakedSalmonThumb,
				full: bakedSalmonFull,
			},
			category: 'Main Meals',
			ingredients: ['120g skinless salmon fillet', '80g cooked brown or basmati rice', '100g asparagus spears', '1 tsp olive oil', 'Lemon juice, garlic powder, salt, and pepper'],
			preparation: [
				'Preheat oven to 200°C (400°F). Line a baking tray with parchment.',
				'Season salmon with lemon juice, garlic powder, salt, and pepper.',
				'Toss asparagus with olive oil and a pinch of salt.',
				'Bake salmon and asparagus for 15-18 minutes until cooked through.',
				'Serve with cooked rice on the side.',
			],
			totalTime: '25 min',
			protein: 34,
			carbs: 22,
			fats: 20,
		},
		{
			id: 11,
			name: 'Roasted Chicken Breast and Sweet Potatoes',
			kcal: 398,
			image: {
				thumbnail: roastedChickenThumb,
				full: roastedChickenFull,
			},
			category: 'Main Meals',
			ingredients: ['150g chicken breast', '120g sweet potato, cubed', '100g green beans or broccoli', '1 tsp olive oil', 'Paprika, garlic powder, salt, and pepper'],
			preparation: [
				'Preheat oven to 200°C (400°F).',
				'Toss sweet potatoes with half the olive oil and seasoning, place on baking tray.',
				'Season chicken breast with remaining oil and spices, place on tray.',
				'Bake all for 25 minutes, adding green beans or broccoli in the last 10 minutes.',
				'Serve hot with a sprinkle of fresh herbs if desired.',
			],
			totalTime: '30 min',
			protein: 38,
			carbs: 28,
			fats: 12,
		},
		{
			id: 12,
			name: 'Mediterranean Tuna Wrap',
			kcal: 362,
			image: {
				thumbnail: tunaWrapsThumb,
				full: tunaWrapsFull,
			},
			category: 'Main Meals',
			ingredients: [
				'1 whole grain or high-protein wrap',
				'100g canned tuna in water, drained',
				'2 tbsp low-fat Greek yogurt',
				'1 tbsp diced red onion',
				'4-5 cherry tomatoes, halved',
				'1 tbsp chopped cucumber or olives',
				'Handful of mixed greens or spinach',
				'Lemon juice, pepper, and oregano to taste',
			],
			preparation: [
				'In a bowl, mix tuna with Greek yogurt, onion, lemon juice, and spices.',
				'Lay out the wrap and layer greens, tuna mix, tomatoes, and cucumber/olives.',
				'Roll tightly and slice in half.',
				'Serve immediately or wrap for lunch on-the-go.',
			],
			totalTime: '10 min',
			protein: 33,
			carbs: 26,
			fats: 12,
		},
	];

    const [savedRecipes, setSavedRecipes] = useState<Recipe[]>([]);
	const [selectedCategory, setSelectedCategory] = useState('Breakfast');
	const [searchTerm, setSearchTerm] = useState('');
	const [selectedRecipe, setSelectedRecipe] = useState<Recipe | null>(null);
	const [isModalOpen, setIsModalOpen] = useState(false);

	const addSavedRecipe = (recipe: Recipe) => {
		if (!savedRecipes.some(r => r.id === recipe.id)) {
			setSavedRecipes([...savedRecipes, recipe]);
		}
	};

	
	const removeSavedRecipe = (recipeId: number) => {
		setSavedRecipes(savedRecipes.filter(r => r.id !== recipeId));
	};


	const filteredRecipes = allRecipes.filter(recipe => {
		const matchCategory = recipe.category === selectedCategory;
		const matchSearch = recipe.name.toLowerCase().includes(searchTerm.toLowerCase());
		return matchCategory && matchSearch;
	});

	const value: RecipeContextType = {
		allRecipes,
		savedRecipes,
		addSavedRecipe,
		removeSavedRecipe,
		selectedCategory,
		setSelectedCategory,
		searchTerm,
		setSearchTerm,
		filteredRecipes,
		selectedRecipe,
		setSelectedRecipe,
		isModalOpen,
		setIsModalOpen,
	};
	return <RecipeContext.Provider value={value}>{children}</RecipeContext.Provider>;
};

export const useRecipeContext = () => {
	const context = useContext(RecipeContext);
	if (!context) {
		throw new Error('useRecipeContext must be used within a RecipeProvider');
	}
	return context;
};
