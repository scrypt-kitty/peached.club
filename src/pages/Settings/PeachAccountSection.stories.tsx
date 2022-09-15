import React from 'react';
import { ThemeProvider } from 'styled-components';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import { PeachAccountSection, PeachAccountSectionProps } from '.';
import { darkTheme, lightTheme } from '../../Theme/theme';

const PAS = (props: PeachAccountSectionProps & { variant: string }) => {
	const { variant, ...rest } = props;
	return (
		<ThemeProvider theme={variant === 'dark' ? darkTheme : lightTheme}>
			<PeachAccountSection {...rest} />
		</ThemeProvider>
	);
};

export default {
	title: 'Settings/PeachAccountSection',
	component: PAS,
	argTypes: {
		variant: {
			options: ['light', 'dark'],
			control: { type: 'radio' },
		},
	},
} as ComponentMeta<typeof PAS>;

const Template: ComponentStory<typeof PAS> = props => {
	return <PAS {...props} />;
};

export const Primary = Template.bind({});
Primary.args = {
	variant: 'dark',
	logout: () => null,
};
