import { createContext, useContext, ReactNode, useState } from 'react';


type EmailContextType = {
	email: string | null;
	setEmail: (email: string) => void;
};


const EmailContext = createContext<EmailContextType | undefined>(undefined);


export const EmailProvider = ({ children }: { children: ReactNode }) => {
	const [email, setEmail] = useState<string | null>(null);

	return <EmailContext.Provider value={{ email, setEmail }}>{children}</EmailContext.Provider>;
};


export const useEmailContext = (): EmailContextType => {
	const context = useContext(EmailContext);
	if (!context) {
		throw new Error('useEmailContext must be used within an EmailProvider');
	}
	return context;
};
