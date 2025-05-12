import React, { createContext, useContext, useState, ReactNode, Dispatch, SetStateAction } from 'react';

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
	setUserData: Dispatch<SetStateAction<UserData>>;
}


const UserDataContext = createContext<UserDataContextType | undefined>(undefined);


export const useUserData = () => {
	const context = useContext(UserDataContext);
	if (!context) {
		throw new Error('useUserData must be used within a UserDataProvider');
	}
	return context;
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
		calories: 1705,
		proteins: 120,
		carbs: 225,
		fats: 36,
	});

	return <UserDataContext.Provider value={{ userData, setUserData }}>{children}</UserDataContext.Provider>;
};
