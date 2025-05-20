import { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { User, signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut, onAuthStateChanged } from 'firebase/auth';
import { auth } from '../../lib/firebase'; 

interface AuthContextType {
	user: User | null;
	loading: boolean;
	login: (email: string, password: string) => Promise<void>;
	register: (email: string, password: string) => Promise<void>;
	logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = (): AuthContextType => {
	const context = useContext(AuthContext);
	if (!context) {
		throw new Error('useAuth must be used within an AuthProvider');
	}
	return context;
};

export const AuthProvider = ({ children }: { children: ReactNode }) => {
	const [user, setUser] = useState<User | null>(null);
	const [loading, setLoading] = useState(true);

	const login = async (email: string, password: string) => {
		await signInWithEmailAndPassword(auth, email, password);
	};

	const register = async (email: string, password: string) => {
		await createUserWithEmailAndPassword(auth, email, password);
	};

	const logout = async () => {
		await signOut(auth);
		setUser(null);
	};

	useEffect(() => {
		const unsubscribe = onAuthStateChanged(auth, firebaseUser => {
			setUser(firebaseUser);
			setLoading(false);
		});
		return unsubscribe;
	}, []);

	return <AuthContext.Provider value={{ user, loading, login, register, logout }}>{children}</AuthContext.Provider>;
};
