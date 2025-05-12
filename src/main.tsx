import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { RouterProvider } from 'react-router';
import { Toaster } from 'sonner';
import { router } from './router';
import { UserDataProvider } from './contexts/authContexts/registrationContext';
import { EmailProvider } from './contexts/authContexts/passwordForgotContext'; // Importe o EmailProvider
import './styles/global.css';

createRoot(document.getElementById('root')!).render(
	<StrictMode>
		<UserDataProvider>
			<EmailProvider>
				<RouterProvider router={router} />
				<Toaster richColors />
			</EmailProvider>
		</UserDataProvider>
	</StrictMode>,
);
