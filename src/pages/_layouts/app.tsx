import { useState } from 'react';
import { Outlet, Link, useLocation } from 'react-router-dom';
import { House, CalendarBlank, BookmarkSimple, User, List, X } from '@phosphor-icons/react';
import Logo from '../../assets/Logo.png';

export function AppLayout() {
	const location = useLocation();
	const [isMenuOpen, setIsMenuOpen] = useState(false);

	const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

	return (
		<div className='min-h-screen bg-white text-neutral-800 relative'>
			
			<header className='sticky top-0 z-20 bg-white py-4 px-6 md:py-6 md:px-6'>
				<div className='mx-auto w-full max-w-3xl flex justify-center md:justify-between items-center'>
					<Link to='/app/home-page' className='flex md:block'>
						<img src={Logo} alt='Nutrio Logo' className='h-14 w-auto md:px-6 md:h-15' />
					</Link>

					<button onClick={toggleMenu} className='hidden md:block text-neutral-800 cursor-pointer md:px-6' aria-label='Abrir menu'>
						<List size={28} />
					</button>
				</div>
			</header>

			{isMenuOpen && (
				<>
					<div className='hidden md:block fixed inset-0 z-30 bg-black/50' onClick={toggleMenu} />

					<aside className='hidden md:block fixed top-0 right-0 h-full w-72 bg-white z-40 p-6'>
						<div className='flex justify-between items-center mb-6'>
							<h2 className='text-lg font-semibold'>Menu</h2>
							<button onClick={toggleMenu} className='text-neutral-800 cursor-pointer p-1' aria-label='Fechar menu'>
								<X size={26} />
							</button>
						</div>

						<nav className='space-y-6'>
							{[
								{ to: '/app/home-page', label: 'Home', icon: House },
								{ to: '/app/planner', label: 'Planner', icon: CalendarBlank },
								{ to: '/app/saved', label: 'Saved', icon: BookmarkSimple },
								{ to: '/app/profile', label: 'Profile', icon: User },
							].map(({ to, label, icon: Icon }) => (
								<Link key={to} to={to} onClick={toggleMenu} className={`flex items-center gap-3 text-base ${location.pathname === to ? 'text-green-400' : 'text-neutral-700'}`}>
									<Icon size={24} />
									<span>{label}</span>
								</Link>
							))}
						</nav>
					</aside>
				</>
			)}

			
			<main className='mx-auto w-full max-w-3xl px-6 py-6 pb-24 md:px-6'>
				<Outlet />
			</main>

		
			<nav className='fixed bottom-0 left-0 right-0 bg-white flex justify-around py-5 px-6 z-10 md:hidden shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.1)]'>
				{[
					{ to: '/app/home-page', label: 'Home', icon: House },
					{ to: '/app/planner', label: 'Planner', icon: CalendarBlank },
					{ to: '/app/saved', label: 'Saved', icon: BookmarkSimple },
					{ to: '/app/profile', label: 'Profile', icon: User },
				].map(({ to, label, icon: Icon }) => {
					const isActive = location.pathname === to;
					return (
						<Link key={to} to={to} className={`flex flex-col items-center p-2 ${isActive ? 'text-green-400' : 'text-neutral-700'}`}>
							<Icon size={24} weight={isActive ? 'fill' : 'regular'} />
							<span className='text-xs mt-1.5'>{label}</span>
						</Link>
					);
				})}
			</nav>
		</div>
	);
}
