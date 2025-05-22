import { useEffect, useState } from 'react';
import { collection, getDocs, addDoc, deleteDoc, doc, serverTimestamp } from 'firebase/firestore';
import { db } from '../lib/firebase';

export interface SavedMeal {
	id?: string;
	recipeId: number;
	recipeName: string;
	kcal?: number;
	date?: string;
	mealType?: string;
	createdAt: Date; 
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
				const meals = snapshot.docs.map(doc => {
					const data = doc.data();
					return {
						id: doc.id,
						...data,
						createdAt: data.createdAt?.toDate() ?? new Date(0), 
					} as SavedMeal;
				});

				
				const sortedMeals = meals.sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
				setSavedMeals(sortedMeals);
			} catch (error) {
				console.error('Error fetching saved meals:', error);
			}
		};

		fetchSavedMeals();
	}, [userId]);

	const addSavedMeal = async (meal: Omit<SavedMeal, 'id'>) => {
		// Removed createdAt from Omit
		if (!userId) return;
		try {
			const docRef = await addDoc(collection(db, 'users', userId, 'savedMeals'), {
				...meal,
				createdAt: serverTimestamp(),
			});

			const newMeal: SavedMeal = {
				...meal,
				id: docRef.id,
				createdAt: new Date(),
			};

			setSavedMeals(prev => [newMeal, ...prev]);
			return docRef.id;
		} catch (error) {
			console.error('Error adding meal:', error);
			throw error;
		}
	};

	const removeSavedMeal = async (mealId: string) => {
		if (!userId) return;
		try {
			await deleteDoc(doc(db, 'users', userId, 'savedMeals', mealId));
			setSavedMeals(prev => prev.filter(meal => meal.id !== mealId));
		} catch (error) {
			console.error('Error removing meal:', error);
			throw error;
		}
	};

	return { savedMeals, addSavedMeal, removeSavedMeal };
}
