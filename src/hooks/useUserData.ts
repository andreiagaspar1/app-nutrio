import { useEffect, useState } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';
import { auth, db } from '../lib/firebase';

export function useUserData() {
	const [userId, setUserId] = useState<string | null>(null);
	const [userName, setUserName] = useState<string | null>(null);
	const [dailyCalorieGoal, setDailyCalorieGoal] = useState<number | null>(null);
	const [proteinGoal, setProteinGoal] = useState<number | null>(null);
	const [carbsGoal, setCarbsGoal] = useState<number | null>(null);
	const [fatGoal, setFatGoal] = useState<number | null>(null);

	useEffect(() => {
		const unsubscribe = onAuthStateChanged(auth, async user => {
			if (user) {
				setUserId(user.uid);
				const userSnap = await getDoc(doc(db, 'users', user.uid));
				if (userSnap.exists()) {
					const data = userSnap.data();
					setUserName(data?.userName || user.displayName || null);
					setDailyCalorieGoal(data?.calories ?? null);
					setProteinGoal(data?.proteins ?? null);
					setCarbsGoal(data?.carbs ?? null);
					setFatGoal(data?.fats ?? null);
				}
			} else {
               
				setUserId(null);
				setUserName(null);
				setDailyCalorieGoal(null);
				setProteinGoal(null);
				setCarbsGoal(null);
				setFatGoal(null);
			}
		});
		return () => unsubscribe();
	}, []);

	return {
		userId,
		userName,
		dailyCalorieGoal,
		proteinGoal,
		carbsGoal,
		fatGoal,
	};
}

