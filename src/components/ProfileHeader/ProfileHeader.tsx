import React from 'react';
import Linkify from 'linkify-react';

import { User } from '../../api/interfaces';
import { LINKIFY_OPTIONS } from '../../constants';

import {
	Avatar,
	ProfileHeaderContainer,
	ProfileHeaderText,
	ProfileHeaderHandle,
	ProfileHeaderContent,
} from './style';

export type ProfileHeaderProps = {
	viewingUser: User;
	postsLoading: boolean;
};

export const ProfileHeader = ({
	viewingUser,
	postsLoading,
}: ProfileHeaderProps) => {
	return (
		<ProfileHeaderContainer>
			<ProfileHeaderContent>
				<Avatar>
					<img
						src={
							postsLoading
								? viewingUser.avatarSrc || '/defaultavatar.jpg'
								: '/defaultavatar.jpg'
						}
						style={{ opacity: postsLoading ? '1' : '0.5' }}
						alt={`${viewingUser.name}'s avatar`}
					/>
				</Avatar>
				<ProfileHeaderText>
					<h2>{postsLoading ? viewingUser.displayName : '...'}</h2>
					<ProfileHeaderHandle>
						@{postsLoading ? viewingUser.name : '...'}
					</ProfileHeaderHandle>
					<p>
						{postsLoading ? (
							<Linkify tagName='span' options={LINKIFY_OPTIONS}>
								{viewingUser.bio}
							</Linkify>
						) : (
							'...'
						)}
					</p>
				</ProfileHeaderText>
			</ProfileHeaderContent>
		</ProfileHeaderContainer>
	);
};
