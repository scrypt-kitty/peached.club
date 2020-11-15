import React from 'react';
import { createPostPreview } from '../utils';
import getPostTime from '../utils/getPostTime';
import {
	FeedPostWrapper,
	ProfilePic,
	PicFrame,
	InfoContainer,
	PostPreview,
	DisplayName,
} from './style';

import { TextMessage, ImageMessage, LinkMessage } from '../api/interfaces';
import { create } from 'domain';

interface PreviewProps {
	id: string;
	avatarSrc: string;
	name: string;
	displayName: string;
	message: TextMessage | ImageMessage | LinkMessage;
	darkMode: boolean;
	children?: React.ReactNode;
	unread?: boolean;
	createdTime: number|null;
}

const Preview: React.FC<PreviewProps> = props => {
	return (
		<FeedPostWrapper darkMode={props.darkMode} isUnread={false}>
			<PicFrame>
				<ProfilePic
					unread={props.unread}
					src={props.avatarSrc}
					alt={props.name}
				/>
			</PicFrame>
			<InfoContainer>
				<DisplayName>{props.displayName}</DisplayName>
				{props.children}
				<PostPreview>{createPostPreview(props.message)}</PostPreview>
			</InfoContainer>
			{props.createdTime && <p>{getPostTime(props.createdTime)}</p>}
		</FeedPostWrapper>
	);
};

export default Preview;
