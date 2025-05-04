import { createBrowserRouter } from 'react-router'
import { AppLayout } from '../pages/_layouts/app'
import { AuthLayout } from '../pages/_layouts/auth'
import { Login } from '../pages/auth/login'
import { Register } from '../pages/auth/register/Register'
import { ForgotPassword } from '../pages/auth/forgot-password'
import { ResetPassword } from '../pages/auth/reset-password'
import {HomePage} from '../pages/app/home-page'

export const router = createBrowserRouter([
    {
        path: 'app', element: <AppLayout />,
        children: [
            {path: 'home-page', element: <HomePage/>},
        ]
     },
	{
		path: 'auth',
		element: <AuthLayout />,
		children: [
			{ path: 'login', element: <Login /> },
			{ path: 'register', element: <Register /> },
			{ path: 'password/forgot', element: <ForgotPassword /> },
			{ path: 'password/reset', element: <ResetPassword /> },
		],
	},
]);