import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { RouterProvider } from 'react-router';
import { Toaster } from 'sonner';
import { router } from './router';
import { UserDataProvider } from './contexts/authContexts/registrationContext';
import { EmailProvider } from './contexts/authContexts/passwordForgotContext'; 
import {RecipeProvider} from './contexts/appContexts/recipesContext'
import './styles/global.css';

createRoot(document.getElementById('root')!).render(
	<StrictMode>
		<UserDataProvider>
			<EmailProvider>
				<RecipeProvider>
					<RouterProvider router={router} />
					<Toaster richColors />
				</RecipeProvider>
			</EmailProvider>
		</UserDataProvider>
	</StrictMode>,
);
