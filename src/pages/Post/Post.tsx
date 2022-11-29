import React, { useContext, useState, useCallback } from 'react';
import { Modal, Center, Stack, Flex, Button, Space } from '@mantine/core';

import { PeachContext } from '../../PeachContext';
import {
	LikePostResponse,
	CommentResponse,
	Comment,
	DefaultResponse,
} from '../../api/interfaces';
import { createComment } from '../Profile/utils';

import { ProfilePost, Props as ProfilePostProps } from '../Profile/ProfilePost';
import { FriendPostContent } from '../Profile/style';
import { PostWrapper } from '../Profile/style';
import { Text } from '../../Theme/Type';
import { DisplayedPostMessage } from '../Profile/DisplayedPostMessage';
import { PostInteractions } from '../../components/Posts/PostInteractions';
import { makeApiCall } from '../../api/api';
import { CommentsComponent } from '../../components/Comments/Comments';
import AddComment from '../../components/Comments/AddComment';

export const Post = (props: ProfilePostProps) => {
	const [comments, setComments] = useState<Comment[]>(props.comments ?? []);
	const [liked, toggleLiked] = useState<boolean>(props.likedByMe);
	const [deletePromptShowing, setDeletePromptShowing] =
		useState<boolean>(false);
	const [likeCount, setLikeCount] = useState<number>(props.likeCount);
	const { curUserData, jwt } = useContext(PeachContext);
	const [newCommentText, setNewCommentText] = useState('');

	const msgs = props.message
		? props.message.map((obj, index) => (
				<DisplayedPostMessage
					obj={obj}
					index={index}
					id={props.id}
					key={props.id + index}
				/>
		  ))
		: null;

	const onClickLike = useCallback(async () => {
		if (!jwt) {
			return;
		}

		try {
			if (liked) {
				const resp = await makeApiCall<LikePostResponse>({
					uri: `like/postId/${props.id}`,
					method: 'DELETE',
					jwt,
				});

				if (!resp.success) {
					throw Error(`Couldn't unlike post ${props.id}`);
				}

				setLikeCount(likeCount => likeCount - 1);
				toggleLiked(false);
			} else {
				const resp = await makeApiCall<LikePostResponse>({
					uri: `like`,
					jwt,
					body: {
						postId: props.id,
					},
					method: 'POST',
				});

				if (!resp.success) {
					throw Error(`Couldn't like post ${props.id}`);
				}
				toggleLiked(true);
				setLikeCount(likeCount => likeCount + 1);
				toggleLiked(true);
			}
		} catch (e) {
			console.error(e);
		}
	}, [jwt, props.id]);

	const updateComments = useCallback(
		async (txt: string) => {
			if (!jwt) {
				return;
			}

			try {
				const resp = await makeApiCall<{
					data: CommentResponse;
					success?: number;
				}>({
					uri: `comment`,
					body: {
						body: txt,
						postId: props.id,
					},
					method: 'POST',
				});

				if (!resp.success) {
					throw Error(`Couldn't add comment to post ${props.id}`);
				}
				const { data } = resp;

				const newComment = createComment(
					data.id,
					txt,
					data.authorStreamID,
					curUserData.name,
					curUserData.displayName
				);
				setComments(comments => comments.concat([newComment]));
			} catch (e) {
				console.error(e);
			}
		},
		[jwt, props.id, curUserData]
	);

	const deleteComment = useCallback(
		async (id: string) => {
			if (!jwt) {
				return;
			}

			try {
				const resp = await makeApiCall<DefaultResponse>({
					uri: `comment/${id}`,
				});

				if (!resp.success) {
					throw Error(`Couldn't delete comment ${id}`);
				}

				setComments(comments.filter(c => c.id !== id));
			} catch (e) {
				console.error(e);
			}
		},
		[jwt]
	);

	const onDeletePost = (id: string) => {
		setDeletePromptShowing(false);
		props.deletePost(props.id);
	};
	return (
		<PostWrapper key={props.id}>
			<>
				<Modal
					opened={deletePromptShowing}
					onClose={() => setDeletePromptShowing(false)}
					withCloseButton={false}
					centered
					size={350}
				>
					<Center>
						<Stack>
							<Text style={{ marginBottom: '0' }} centered>
								Are you sure you want to delete this post?
							</Text>
							<Center>
								<Flex>
									<Button color='pink' onClick={() => onDeletePost(props.id)}>
										Yep
									</Button>
									<Space w='md' />
									<Button
										color='gray'
										onClick={() => setDeletePromptShowing(false)}
									>
										Nope
									</Button>
								</Flex>
							</Center>
						</Stack>
					</Center>
				</Modal>
				<FriendPostContent>{msgs}</FriendPostContent>
			</>
			<PostInteractions
				commentsLength={comments ? comments.length : 0}
				onClickLike={onClickLike}
				onClickComments={() => null}
				isLiked={liked}
				likeCount={likeCount}
				createdTime={props.createdTime}
				onClickDelete={() => setDeletePromptShowing(true)}
				isCurUsersPost={curUserData.id === props.author}
			/>
			<CommentsComponent
				postAuthorId={''}
				getAvatar={(_id: string) => ''}
				comments={comments}
				peachFeedIds={[]}
				requesterId='1'
				addReplyHandle={(_u: string) => null}
				mutualFriends={[]}
				deleteComment={deleteComment}
				newCommentText={newCommentText}
				setNewCommentText={setNewCommentText}
			/>
			<AddComment
				onSubmit={(t: string) => null}
				setNewCommentText={setNewCommentText}
				newCommentText={newCommentText}
			/>
		</PostWrapper>
	);
};
