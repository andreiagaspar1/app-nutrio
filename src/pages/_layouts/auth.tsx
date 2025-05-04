import {Outlet} from 'react-router'

export function AuthLayout() {
    return (
			<div className='min-w-[280px] px-4 flex flex-col items-center justify-center min-h-screen relative'>

				<main className='w-full max-w-[280px] sm:max-w-md space-y-6 text-left'>
					<Outlet/>
				</main>
			</div>
		);
}