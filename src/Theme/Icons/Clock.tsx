import React from 'react';

interface IconProps {
    darkMode: boolean;
    title: string;
    titleId: string;
}

function Clock({ darkMode, title, titleId }: React.SVGProps<SVGSVGElement> & IconProps) {
	return (
		<svg
			xmlns='http://www.w3.org/2000/svg'
			width={24}
			height={24}
			viewBox='0 0 24 24'
			fill='none'
			stroke={darkMode ? '#ffffff' : '#000000'}
			strokeWidth={2}
			strokeLinecap='round'
			strokeLinejoin='round'
            className='prefix__feather prefix__feather-clock'
            aria-labelledby={titleId}
		>
            <title id={titleId}>{title}</title>
			<circle cx={12} cy={12} r={10} />
			<path d='M12 6v6l4 2' />
		</svg>
	);
}

export default Clock;
