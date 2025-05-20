interface LogOutModalProps {
	show: boolean;
	onCancel: () => void;
	onConfirm: () => void;
}

export function LogOutModal({ show, onCancel, onConfirm }: LogOutModalProps) {
	if (!show) return null;

	return (
		<div className='fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm transition-opacity'>
			<div className='bg-white rounded-xl p-6 w-11/12 max-w-sm text-center shadow-lg'>
				<h2 className='text-base sm:text-lg font-semibold mb-2 mt-4'>Log Out?</h2>
				<p className='text-xs sm:text-sm text-neutral-600 mb-6'>Are you sure you want to logout?</p>
				<div className='flex flex-col gap-3'>
					<button onClick={onCancel} className='bg-neutral-300 text-black text-sm sm:text-base py-2 rounded-md font-medium hover:bg-neutral-400 transition cursor-pointer'>
						Cancel
					</button>
					<button onClick={onConfirm} className='bg-red-500 text-white text-sm sm:text-base py-2 rounded-md font-medium hover:bg-red-600 transition cursor-pointer mb-5'>
						Logout
					</button>
				</div>
			</div>
		</div>
	);
}
