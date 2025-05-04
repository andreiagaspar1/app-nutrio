import { createBrowserRouter } from 'react-router'
import { AppLayout } from '../pages/_layouts/app'
import { AuthLayout } from '../pages/_layouts/auth'
import { Login } from '../pages/auth/login'
import { Register } from '../pages/auth/register/Register'
import { ForgotPassword } from '../pages/auth/forgot-password'
import { ResetPassword } from '../pages/auth/reset-password'

export const router = createBrowserRouter([
    {
        path: '', element: <AppLayout />,
        children: []
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