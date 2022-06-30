import React, { useState } from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { MagicPostActions } from './MagicPostActions';

import { darkTheme } from '../Theme/theme';
import styled, { ThemeProvider } from 'styled-components';

const ResultBox = styled.div`
	border: 2px solid red;
`;

const MPAComponent = () => {
	const [postText, setPostText] = useState('');

	return (
		<ThemeProvider theme={darkTheme}>
			<MagicPostActions
				setPostText={setPostText}
				curUserId='5'
				uploadImage={(files: FileList | null, id: string) => null}
			/>
			<ResultBox>{postText}</ResultBox>
		</ThemeProvider>
	);
};

export default {
	title: 'components/MagicPostActions',
	component: MPAComponent,
} as ComponentMeta<typeof MPAComponent>;
