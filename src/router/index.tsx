import { createBrowserRouter, Navigate } from 'react-router-dom';
import { AppLayout } from '../pages/_layouts/app';
import { AuthLayout } from '../pages/_layouts/auth';

import { Login } from '../pages/auth/login';
import { Register } from '../pages/auth/register/Register';
import { ForgotPassword } from '../pages/auth/forgot-password';
import { ResetPassword } from '../pages/auth/reset-password';

import { HomePage } from '../pages/app/home-page';
import { Planner } from '../pages/app/planner';
import { Saved } from '../pages/app/saved';
import { Profile } from '../pages/app/profile';

export const router = createBrowserRouter([
	{
		path: '/',
		element: <Navigate to='/auth/login' replace />, // ✅ default route to login
	},
	{
		path: '/auth',
		element: <AuthLayout />,
		children: [
			{ path: 'login', element: <Login /> },
			{ path: 'register', element: <Register /> },
			{ path: 'password/forgot', element: <ForgotPassword /> },
			{ path: 'password/reset', element: <ResetPassword /> },
		],
	},
	{
		path: '/app',
		element: <AppLayout />,
		children: [
			{ index: true, element: <HomePage /> },
			{ path: 'home-page', element: <HomePage /> },
			{ path: 'planner', element: <Planner/> },
			{ path: 'saved', element: <Saved/> },
			{ path: 'profile', element: <Profile/> },
		],
	},
	{
		path: '*',
		element: <div>404 - Page Not Found</div>,
	},
]);
