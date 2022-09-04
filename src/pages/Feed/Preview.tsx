import React from 'react';
import { rem } from 'polished';

import { createPostPreview } from '../../utils';
import getPostTime from '../../utils/getPostTime';
import {
	FeedPostWrapper,
	ProfilePic,
	PicFrame,
	InfoContainer,
	PostPreview,
	DisplayName,
} from './style';

import { PostContent } from '../../api/interfaces';

interface PreviewProps {
	id: string;
	avatarSrc: string;
	name: string;
	displayName: string;
	message?: PostContent | string | null;
	children?: React.ReactNode;
	unread?: boolean;
	createdTime: number | null;
	textPreview?: string | null;
}

const Preview: React.FC<PreviewProps> = props => {
	const { textPreview = null, message = null } = props;
	return (
		<FeedPostWrapper isUnread={false}>
			<PicFrame>
				{props.avatarSrc ? (
					<ProfilePic
						unread={props.unread}
						src={props.avatarSrc}
						alt={props.name}
						width={rem(75)}
						height={rem(75)}
					/>
				) : (
					<span role='img' aria-label={props.name}>
						🍑
					</span>
				)}
			</PicFrame>
			<InfoContainer>
				<DisplayName>{props.displayName}</DisplayName>
				{props.children}
				<PostPreview>
					<p>
						{!message
							? ' '
							: typeof message === 'string'
							? message
							: createPostPreview(message)}
					</p>
					{props.createdTime && <p>{getPostTime(props.createdTime)}</p>}
				</PostPreview>
				{props.textPreview && (
					<blockquote>
						<i>{props.textPreview}</i>
					</blockquote>
				)}
			</InfoContainer>
		</FeedPostWrapper>
	);
};

export default Preview;
