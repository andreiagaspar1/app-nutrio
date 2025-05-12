import React, { createContext, useContext, useState, ReactNode } from 'react';

export interface UserData {
	name: string;
	email: string;
	password: string;
	gender: string;
	activity: string;
	age: number;
	height: number;
	weight: number;
	goal: string;
	calories: number;
	proteins: number;
	carbs: number;
	fats: number;
}

interface UserDataContextType {
	userData: UserData;
	updateUserData: (newData: UserData) => void;
}

const UserDataContext = createContext<UserDataContextType | undefined>(undefined);

export const useUserData = () => {
	const context = useContext(UserDataContext);
	if (!context) {
		throw new Error('useUserData must be used within a UserDataProvider');
	}
	return context;
};

const calculateNutrition = (data: UserData): Pick<UserData, 'calories' | 'proteins' | 'carbs' | 'fats'> => {
	const { gender, weight, height, age, activity, goal } = data;

	let bmr = 0;
	if (gender === 'female') {
		bmr = 10 * weight + 6.25 * height - 5 * age - 161;
	} else if (gender === 'male') {
		bmr = 10 * weight + 6.25 * height - 5 * age + 5;
	}

	let multiplier = 1;
	if (activity === 'sedentary') multiplier = 1.3;
	else if (activity === 'moderate') multiplier = 1.6;
	else if (activity === 'very-active') multiplier = 1.9;

	let calories = bmr * multiplier;

	if (goal === 'lose') calories -= 400;
	else if (goal === 'build') calories += 200;

	const proteinGrams = weight * 2;
	const fatGrams = weight * 0.5;

	const proteinCals = proteinGrams * 4;
	const fatCals = fatGrams * 9;
	const remainingCals = calories - (proteinCals + fatCals);
	const carbGrams = remainingCals / 4;

	return {
		calories: Math.round(calories),
		proteins: Math.round(proteinGrams),
		fats: Math.round(fatGrams),
		carbs: Math.max(0, Math.round(carbGrams)),
	};
};

export const UserDataProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
	const [userData, setUserData] = useState<UserData>({
		name: '',
		email: '',
		password: '',
		gender: '',
		activity: '',
		age: 0,
		height: 0,
		weight: 0,
		goal: '',
		calories: 0,
		proteins: 0,
		carbs: 0,
		fats: 0,
	});

	const updateUserData = (newData: Partial<UserData>) => {
		const updated = { ...userData, ...newData };
		const calculated = calculateNutrition(updated);
		setUserData({ ...updated, ...calculated });
	};

	return <UserDataContext.Provider value={{ userData, updateUserData }}>{children}</UserDataContext.Provider>;
};
