import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { RouterProvider } from 'react-router';
import { Toaster } from 'sonner';
import { router } from './router';
import { UserDataProvider } from './contexts/registrationContext';
import './styles/global.css';

createRoot(document.getElementById('root')!).render(
	<StrictMode>
		<UserDataProvider>
			<RouterProvider router={router} />
			<Toaster richColors />
		</UserDataProvider>
	</StrictMode>,
);
