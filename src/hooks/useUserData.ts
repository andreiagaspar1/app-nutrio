import { useEffect, useState } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';
import { auth, db } from '../lib/firebase';

interface UserData {
	userId: string | null;
	userName: string | null;
	dailyCalorieGoal: number | null;
	proteinGoal: number | null;
	carbsGoal: number | null;
	fatGoal: number | null;
}

export function useUserData(): UserData {
	const [userData, setUserData] = useState<UserData>({
		userId: null,
		userName: null,
		dailyCalorieGoal: null,
		proteinGoal: null,
		carbsGoal: null,
		fatGoal: null,
	});

	useEffect(() => {
		const unsubscribe = onAuthStateChanged(auth, async user => {
			if (user) {
				try {
					const userSnap = await getDoc(doc(db, 'users', user.uid));

					if (userSnap.exists()) {
						const data = userSnap.data();
						setUserData({
							userId: user.uid,
							userName: data.name || user.displayName || 'User',
							dailyCalorieGoal: data.calories ?? null,
							proteinGoal: data.proteins ?? null,
							carbsGoal: data.carbs ?? null,
							fatGoal: data.fats ?? null,
						});
					} else {
						setUserData({
							userId: user.uid,
							userName: user.displayName || 'User',
							dailyCalorieGoal: null,
							proteinGoal: null,
							carbsGoal: null,
							fatGoal: null,
						});
					}
				} catch (error) {
					console.error('Error fetching user data:', error);
				}
			} else {
				setUserData({
					userId: null,
					userName: null,
					dailyCalorieGoal: null,
					proteinGoal: null,
					carbsGoal: null,
					fatGoal: null,
				});
			}
		});

		return unsubscribe;
	}, []);

	return userData;
}
