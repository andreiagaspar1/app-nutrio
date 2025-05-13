import React, { createContext, useState, useContext } from 'react';
import scrambledEggs from '../../assets/recipes-images/cheesy_spinach_scrambled_egss.jpg';
import yogurtBowl from '../../assets/recipes-images/strawberrys_granola_yogurt_bowl.jpg';
import bananaPancakes from '../../assets/recipes-images/protein_banana_pancakes.jpg';
import overnightOats from '../../assets/recipes-images/creamy_peanut_butter_overnight_oats.jpg';
import muffins from '../../assets/recipes-images/egg_white_broccoli_muffin.jpg';
import chiaPudding from '../../assets/recipes-images/chocolate_chia_pudding_parfait.jpg';
import cottageToast from '../../assets/recipes-images/cottage_cheese_toast_cherry_tomatos.jpg';
import mugCake from '../../assets/recipes-images/salted_caramel_mug_cake.jpg';
import turkeyBolognese from '../../assets/recipes-images/turkey_bolognese_zucchini_noodles.jpg';
import bakedSalmon from '../../assets/recipes-images/oven_baked_salmon.jpg';
import roastedChicken from '../../assets/recipes-images/roasted_chicken_breast.jpg'
import tunaWraps from '../../assets/recipes-images/mediterranean_tuna_wrap.jpg'

interface Recipe {
	id: number;
	name: string;
	kcal: string;
	image: string;
	category: string;
}

interface RecipeContextType {
	allRecipes: Recipe[];
	selectedCategory: string;
	setSelectedCategory: React.Dispatch<React.SetStateAction<string>>;
	searchTerm: string;
	setSearchTerm: React.Dispatch<React.SetStateAction<string>>;
	filteredRecipes: Recipe[];
}


const defaultContextValue: RecipeContextType = {
	allRecipes: [],
	selectedCategory: 'Breakfast',
	setSelectedCategory: () => {},
	searchTerm: '',
	setSearchTerm: () => {},
	filteredRecipes: [],
};

const RecipeContext = createContext<RecipeContextType>(defaultContextValue);


export const useRecipeContext = () => {
	return useContext(RecipeContext);
};


interface RecipeProviderProps {
	children: React.ReactNode;
}

export const RecipeProvider: React.FC<RecipeProviderProps> = ({ children }) => {
	const allRecipes = [
		{
			id: 1,
			name: 'Strawberrys and Granola Yogurt Bowl',
			kcal: '334',
			image: yogurtBowl,
			category: 'Breakfast',
		},
		{
			id: 2,
			name: 'Cheesy Spinach Scrambled Eggs',
			kcal: '290',
			image: scrambledEggs,
			category: 'Breakfast',
		},
		{
			id: 3,
			name: 'Protein Banana Pancakes',
			kcal: '350',
			image: bananaPancakes,
			category: 'Breakfast',
		},
		{
			id: 4,
			name: 'Creamy Peanut Butter Overnight Oats',
			kcal: '450',
			image: overnightOats,
			category: 'Breakfast',
		},
		{
			id: 5,
			name: 'Egg White and Broccoli Muffins',
			kcal: '240',
			image: muffins,
			category: 'Snacks',
		},
		{
			id: 6,
			name: 'Chocolate Chia Pudding Parfait',
			kcal: '170',
			image: chiaPudding,
			category: 'Snacks',
		},
		{
			id: 7,
			name: 'Cottage Cheese Toast w/ Cherry Tomatos',
			kcal: '250',
			image: cottageToast,
			category: 'Snacks',
		},
		{
			id: 8,
			name: 'Salted Caramel Mug Cake',
			kcal: '230',
			image: mugCake,
			category: 'Snacks',
		},
		{
			id: 9,
			name: 'Turkey Bolognese Sauce w/ Zucchini Noodles',
			kcal: '330',
			image: turkeyBolognese,
			category: 'Main Meals',
		},
		{
			id: 10,
			name: 'Oven-Baked Slamon w/ Rice and Asparagus',
			kcal: '410',
			image: bakedSalmon,
			category: 'Main Meals',
		},
		{
			id: 11,
			name: 'Roasted Chicken Breast and Sweet Patatoes',
			kcal: '385',
			image: roastedChicken,
			category: 'Main Meals',
		},
		{
			id: 12,
			name: 'Mediterranean Tuna Wrap',
			kcal: '370',
			image: tunaWraps,
			category: 'Main Meals',
		},
	];

	const [selectedCategory, setSelectedCategory] = useState('Breakfast');
	const [searchTerm, setSearchTerm] = useState('');

	const filteredRecipes = allRecipes.filter(recipe => {
		const matchCategory = recipe.category === selectedCategory;
		const matchSearch = recipe.name.toLowerCase().includes(searchTerm.toLowerCase());
		return matchCategory && matchSearch;
	});

	const value = {
		allRecipes,
		selectedCategory,
		setSelectedCategory,
		searchTerm,
		setSearchTerm,
		filteredRecipes,
	};

	return <RecipeContext.Provider value={value}>{children}</RecipeContext.Provider>;
};
