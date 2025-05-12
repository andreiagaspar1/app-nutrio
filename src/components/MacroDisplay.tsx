interface MacroDisplayProps {
	value: number;
	label: string;
	icon: string;
	iconClass?: string; 
}

export function MacroDisplay({ value, label, icon, iconClass = '' }: MacroDisplayProps) {
	return (
		<div className='relative'>
			<div className='absolute -top-4 left-1/2 transform -translate-x-1/2'>
				<img src={icon} alt={label} className={`object-contain ${iconClass}`} />
			</div>
			<div className='border border-neutral-500 rounded-md p-4 pt-8 aspect-square flex flex-col justify-center items-center'>
				<div className='text-xl font-semibold text-neutral-800 flex items-baseline'>
					<span>{value}</span>
					<span className='text-md'>g</span>
				</div>
				<p className='text-neutral-500 text-sm'>{label}</p>
			</div>
		</div>
	);
}
