import React from 'react';
import { ActionIcon, Flex, Avatar } from '@mantine/core';
import { IconCheck, IconX, IconBan } from '@tabler/icons';

import { InfoContainer } from '../Feed/style';
import { Header3, Text } from '../../Theme/Type';
import { FriendRequestContainer } from './style';
import { httpTize } from '../../utils/httpTize';
import { DEFAULT_AVATAR_SRC } from '../../constants';

export type FriendRequestItemProps = {
	avatarSrc?: string;
	displayName: string;
	name: string;
	bio: string;
	onClickAccept?: (name: string) => void | null;
	onClickBlock?: (name: string) => void | null;
	onClickDecline: (name: string) => void;
};

export const FriendRequestItem = (props: FriendRequestItemProps) => {
	const { onClickAccept = null, onClickBlock = null, avatarSrc } = props;
	return (
		<FriendRequestContainer>
			<Avatar
				src={avatarSrc ? httpTize(avatarSrc) : DEFAULT_AVATAR_SRC}
				radius='xl'
			/>
			<InfoContainer>
				<Header3>{props.displayName}</Header3>
				<Text muted>@{props.name}</Text>
				<Text>{props.bio}</Text>
			</InfoContainer>
			<Flex>
				{onClickAccept && (
					<ActionIcon
						variant='filled'
						color='green'
						onClick={() => onClickAccept(props.name)}
					>
						<IconCheck size={16} />
					</ActionIcon>
				)}
				<ActionIcon
					variant='filled'
					color='red'
					onClick={() => props.onClickDecline(props.name)}
				>
					<IconX size={16} />
				</ActionIcon>
				{/* {onClickBlock && (
					<ActionIcon
						variant='filled'
						color='gray'
						onClick={() => onClickBlock(props.name)}
					>
						<IconBan size={16} />
					</ActionIcon>
				)} */}
			</Flex>
		</FriendRequestContainer>
	);
};
