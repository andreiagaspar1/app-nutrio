import { useEffect, useState } from 'react';
import { collection, getDocs, addDoc, deleteDoc, doc } from 'firebase/firestore';
import { db } from '../lib/firebase';

export interface SavedMeal {
	id?: string;
	recipeId: number;
	recipeName: string;
	kcal?: number;
	date?: string; 
	mealType?: string; 
}

export function useSavedMeals(userId: string | null) {
	const [savedMeals, setSavedMeals] = useState<SavedMeal[]>([]);

	useEffect(() => {
		if (!userId) {
			setSavedMeals([]);
			return;
		}

		const fetchSavedMeals = async () => {
			try {
				const snapshot = await getDocs(collection(db, 'users', userId, 'savedMeals'));
				const meals = snapshot.docs.map(doc => ({
					id: doc.id,
					...doc.data(),
				})) as SavedMeal[];
				setSavedMeals(meals);
			} catch (error) {
				console.error('Error fetching saved meals:', error);
			}
		};

		fetchSavedMeals();
	}, [userId]);

	const addSavedMeal = async (meal: Omit<SavedMeal, 'id'>) => {
		if (!userId) return;
		try {
			const docRef = await addDoc(collection(db, 'users', userId, 'savedMeals'), meal);
			setSavedMeals(prev => [...prev, { ...meal, id: docRef.id }]);
			return docRef.id;
		} catch (error) {
			console.error('Error adding meal:', error);
		}
	};

	const removeSavedMeal = async (mealId: string) => {
		if (!userId) return;
		try {
			await deleteDoc(doc(db, 'users', userId, 'savedMeals', mealId));
			setSavedMeals(prev => prev.filter(meal => meal.id !== mealId));
		} catch (error) {
			console.error('Error removing meal:', error);
		}
	};

	return { savedMeals, addSavedMeal, removeSavedMeal };
}
