import React from 'react';
import { useTheme } from 'styled-components';

import { SVGIcon } from './constants';

const SvgComponent = (props: SVGIcon) => {
	const { title, ...rest } = props;
	const theme = useTheme();
	return (
		<svg
			xmlns='http://www.w3.org/2000/svg'
			width={24}
			height={24}
			fill='none'
			stroke={theme.text.primary}
			strokeWidth={2}
			strokeLinecap='round'
			strokeLinejoin='round'
			className='feather feather-music'
			{...rest}
		>
			{title && <title>{title}</title>}
			<path d='M9 18V5l12-2v13' />
			<circle cx={6} cy={18} r={3} />
			<circle cx={18} cy={16} r={3} />
		</svg>
	);
};

export default SvgComponent;
