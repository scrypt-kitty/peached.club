import React, { useContext, useState } from 'react';
import { Center, Stack, Flex, Button, Space } from '@mantine/core';

import { Comment as CommentType, MutualFriend } from '../../api/interfaces';
import { BlockedUsersMap, PeachContext } from '../../PeachContext';
import { useMediaQuery } from '@mantine/hooks';

import AddComment from './AddComment';
import { Comment } from './Comment/Comment';
import { MModal as Modal } from '../../Theme/Mantine/Modal';
import { AllComments, DeletePrompt } from './style';
import { Text } from '../../Theme/Type';

interface SharedCommentsProps {
	deleteComment: (id: string) => void;
	comments: CommentType[];
	mutualFriends: MutualFriend[];
	requesterId: string;

	setNewCommentText: React.Dispatch<React.SetStateAction<string>>;
	newCommentText: string;
}

interface CommentsProps extends SharedCommentsProps {
	updateComments: (txt: string) => void;
	onDismissComments: () => void;
	postAuthorId: string;
	postAuthorAvatarSrc: string;
	isShowing: boolean;
	children?: React.ReactNode;
}

export interface CommentsComponentProps extends SharedCommentsProps {
	peachFeedIds: string[];
	getAvatar: (id: string) => string;
	addReplyHandle: (username: string) => void;
	postAuthorId: string;
}

export const CommentsComponent = (props: CommentsComponentProps) => {
	return (
		<>
			{props.comments.map(c => (
				<Comment
					isFriend={
						props.peachFeedIds.filter(id => id === c.author.id).length > 0
					}
					key={c.id}
					avatarSrc={props.getAvatar(c.author.id)}
					{...c}
					deleteComment={props.deleteComment}
					mutualFriends={props.mutualFriends}
					requesterId={props.requesterId}
					addReplyHandle={props.addReplyHandle}
					postAuthorId={props.postAuthorId}
				/>
			))}
		</>
	);
};

function filterBlockedUsersFromComments(
	blockedUsers: BlockedUsersMap,
	comments: CommentType[]
) {
	return comments.filter(c => !blockedUsers[c.author.id]);
}

export const Comments = (props: CommentsProps) => {
	const {
		postAuthorId,
		postAuthorAvatarSrc,
		mutualFriends,
		onDismissComments,
		requesterId,
		comments,
		setNewCommentText,
		newCommentText,
		isShowing,
	} = props;
	const { peachFeed, blockedUsersMap } = useContext(PeachContext);
	const [isDismissWarningShowing, setIsDismissWarningShowing] = useState(false);
	const peachFeedIds = peachFeed.map(user => user.id);

	const mobileComments = useMediaQuery('(max-width: 600px)');

	const getAvatar = (id: string) => {
		// commenter is author
		if (id === postAuthorId) {
			return postAuthorAvatarSrc;
		}
		const res = mutualFriends.filter(friend => friend.id === id);
		if (res.length === 0 || !res[0].avatarSrc) {
			return '/defaultavatar.jpg';
		}

		return res[0].avatarSrc;
	};

	const addReplyHandle = (username: string) => {
		setNewCommentText((txt: string) => {
			if (txt.length) {
				return `${txt} @${username} `;
			}
			return '@' + username + ' ';
		});
	};

	const dismissComments = () => {
		setNewCommentText('');
		onDismissComments();
	};

	const onTryDismissComments = (newCommentText: string) => {
		if (newCommentText.length > 2) {
			setIsDismissWarningShowing(true);
		} else {
			dismissComments();
		}
	};

	return (
		<Modal
			opened={isShowing}
			onClose={() => onTryDismissComments(newCommentText)}
			title='Leave a comment'
			fullScreen={mobileComments}
		>
			<Modal
				opened={isDismissWarningShowing}
				onClose={() => setIsDismissWarningShowing(false)}
				withCloseButton={false}
				centered
				size={350}
			>
				<Center>
					<Stack>
						<Text style={{ marginBottom: '0' }} centered>
							Are you sure you want to abandon this comment?
						</Text>
						<Center>
							<Flex>
								<Button radius='md' color='pink' onClick={dismissComments}>
									Yep
								</Button>
								<Space w='md' />
								<Button
									radius='md'
									color='gray'
									onClick={() => setIsDismissWarningShowing(false)}
								>
									Nope
								</Button>
							</Flex>
						</Center>
					</Stack>
				</Center>
			</Modal>
			{props.children}
			<AllComments>
				<CommentsComponent
					getAvatar={getAvatar}
					peachFeedIds={peachFeedIds}
					requesterId={requesterId}
					comments={filterBlockedUsersFromComments(blockedUsersMap, comments)}
					mutualFriends={mutualFriends}
					deleteComment={props.deleteComment}
					addReplyHandle={addReplyHandle}
					newCommentText={newCommentText}
					setNewCommentText={setNewCommentText}
					postAuthorId={props.postAuthorId}
				/>
			</AllComments>
			<AddComment
				onSubmit={props.updateComments}
				newCommentText={newCommentText}
				setNewCommentText={setNewCommentText}
			/>
		</Modal>
	);
};
