import React from 'react';
import { ComponentMeta } from '@storybook/react';
import { Post } from './Post';

import { darkTheme, PeachThemeProvider } from '../../Theme/theme';

export const Story = () => {
	return (
		<PeachThemeProvider theme={darkTheme}>
			<Post />
		</PeachThemeProvider>
	);
};

export default {
	component: Story,
	title: 'Post/PostPage',
} as ComponentMeta<typeof Story>;
