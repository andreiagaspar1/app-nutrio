import React, { createContext, useContext, useState, ReactNode } from 'react';

interface UserData {
	gender: string | null;
	age: number | null;
	height: number | null;
	weight: number | null;
	activityLevel: string | null;
	goal: string | null;
}

interface UserDataContextProps {
	userData: UserData;
	setUserData: React.Dispatch<React.SetStateAction<UserData>>;
}

const UserDataContext = createContext<UserDataContextProps | undefined>(undefined);

export const UserDataProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
	const [userData, setUserData] = useState<UserData>({
		gender: null,
		age: null,
		height: null,
		weight: null,
		activityLevel: null,
		goal: null,
	});

	return <UserDataContext.Provider value={{ userData, setUserData }}>{children}</UserDataContext.Provider>;
};

export const useUserData = (): UserDataContextProps => {
	const context = useContext(UserDataContext);
	if (!context) {
		throw new Error('useUserData must be used within a UserDataProvider');
	}
	return context;
};
