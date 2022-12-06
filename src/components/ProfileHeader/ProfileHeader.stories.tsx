import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import styled from 'styled-components';
import { MantineProvider } from '@mantine/core';

import {
	ProfileHeaderComponent,
	ProfileHeaderComponentProps,
} from './ProfileHeader';
import { DEFAULT_AVATAR_SRC } from '../../constants';

import { darkTheme, lightTheme } from '../../Theme/theme';
import { ThemeProvider } from 'styled-components';

const Story = (props: ProfileHeaderComponentProps & { variant: string }) => {
	const { variant, ...rest } = props;
	return (
		<ThemeProvider theme={variant === 'dark' ? darkTheme : lightTheme}>
			<MantineProvider
				withGlobalStyles
				withNormalizeCSS
				theme={{ colorScheme: variant === 'dark' ? 'dark' : 'light' }}
			>
				<Page>
					<ProfileHeaderComponent {...rest} />
				</Page>
			</MantineProvider>
		</ThemeProvider>
	);
};

export default {
	title: 'Profile/ProfileHeader',
	component: Story,
	argTypes: {
		variant: {
			options: ['light', 'dark'],
			control: { type: 'radio' },
		},
	},
} as ComponentMeta<typeof Story>;

const Template: ComponentStory<typeof Story> = props => {
	return <Story {...props} />;
};

const Page = styled.div`
	height: 100vh;
	background-color: ${props => props.theme.background.primary};
	padding: 50px;
`;

export const Primary = Template.bind({});
Primary.args = {
	loading: false,
	variant: 'dark',
	viewingUser: {
		id: '1235',
		name: 'futuresounds',
		displayName: 'Hatsune Miku',
		avatarSrc: DEFAULT_AVATAR_SRC,
		bio: 'Hey there shdf sdjhf https://news.ycombinator.com/ sjdkfh sdjf sdjf d k',
		isPublic: false,
		friendsSharing: false,
		youFollow: true,
		followsYou: true,
		posts: [],
		unreadPostCount: 0,
		lastRead: 0,
		lastOnline: 0,
		isFavorite: true,
	},
	onClickFollowingButton: () => null,
};
