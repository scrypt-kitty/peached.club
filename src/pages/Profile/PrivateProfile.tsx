import React, { useContext } from 'react';
import { Center, Space } from '@mantine/core';
import { IconLock } from '@tabler/icons';
import { useTheme } from 'styled-components';

import { PeachContext } from '../../PeachContext';
import { User } from '../../api/interfaces';

import { Text } from '../../Theme/Type';
import { ProfileHeader } from '../../components/ProfileHeader/ProfileHeader';

type PrivateProfileProps = {
	viewingUser: User;
};

const PrivateProfileComponent = (props: PrivateProfileProps) => {
	const theme = useTheme();
	return (
		<>
			<ProfileHeader
				viewingUser={props.viewingUser}
				loading={false}
				setViewingUser={(user: User | null) => null}
			/>
			<Space h='md' />
			<Center>
				<IconLock size={32} color={theme.accent} />
				<Text>You'll have to send a friend request to this peach's posts</Text>
			</Center>
		</>
	);
};

export const PrivateProfile = (props: PrivateProfileProps) => {
	return (
		<>
			<PrivateProfileComponent viewingUser={props.viewingUser} />
		</>
	);
};
