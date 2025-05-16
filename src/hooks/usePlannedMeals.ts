import { useEffect, useState } from 'react';
import { collection, query, where, getDocs, addDoc, deleteDoc, doc } from 'firebase/firestore';
import { db } from '../lib/firebase';

interface PlannedMeal {
	id?: string;
	recipeId: number;
	date: string;
	mealType: string;
	recipeName?: string;
	kcal?: number;
}

export function usePlannedMeals(userId: string | null, selectedDate: Date) {
	const [plannedMeals, setPlannedMeals] = useState<PlannedMeal[]>([]);

	const formatDate = (date: Date) => date.toISOString().split('T')[0];

	useEffect(() => {
		const loadMeals = async () => {
			if (!userId) return;
			const q = query(collection(db, 'users', userId, 'plannedMeals'), where('date', '==', formatDate(selectedDate)));
			const snapshot = await getDocs(q);
			const meals = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })) as PlannedMeal[];
			setPlannedMeals(meals);
		};
		loadMeals();
	}, [userId, selectedDate]);

	const addMeal = async (newMeal: Omit<PlannedMeal, 'id'>) => {
		if (!userId) return;
		const docRef = await addDoc(collection(db, 'users', userId, 'plannedMeals'), newMeal);
		setPlannedMeals(prev => [...prev, { ...newMeal, id: docRef.id }]);
	};

	const removeMeal = async (recipeId: number, mealType: string) => {
		if (!userId) return;
		const dateStr = formatDate(selectedDate);
		const mealToDelete = plannedMeals.find(meal => meal.recipeId === recipeId && meal.mealType === mealType && meal.date === dateStr);
		if (mealToDelete?.id) {
			await deleteDoc(doc(db, 'users', userId, 'plannedMeals', mealToDelete.id));
			setPlannedMeals(prev => prev.filter(m => m.id !== mealToDelete.id));
		}
	};

	return { plannedMeals, addMeal, removeMeal };
}
