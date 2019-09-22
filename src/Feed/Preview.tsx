import React from 'react';
import { createPostPreview } from '../utils';
import {
	FeedPostWrapper,
	ProfilePic,
	PicFrame,
	InfoContainer,
	PostPreview,
	DisplayName,
} from './style';

import { TextMessage, ImageMessage, LinkMessage } from '../api/interfaces';

interface PreviewProps {
	id: string;
	avatarSrc: string;
	name: string;
	displayName: string;
	message: TextMessage | ImageMessage | LinkMessage;
	darkMode: boolean;
	children?: React.ReactNode;
}

const Preview: React.FC<PreviewProps> = props => {
	return (
		<FeedPostWrapper darkMode={props.darkMode} isUnread={false}>
			<PicFrame>
				<ProfilePic src={props.avatarSrc} alt={props.name} />
			</PicFrame>
			<InfoContainer>
				<DisplayName>{props.displayName}</DisplayName>
				{props.children}
				<PostPreview>{createPostPreview(props.message)}</PostPreview>
			</InfoContainer>
		</FeedPostWrapper>
	);
};

export default Preview;
