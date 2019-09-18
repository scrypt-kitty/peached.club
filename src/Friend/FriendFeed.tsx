import React, { useContext, useState, useEffect } from 'react';
import { withRouter, RouteComponentProps } from 'react-router';
import api from '../api';
import Loading from '../Loading';

import Comments from '../Comments';

import { DisableBodyScroll, DeletePrompt } from '../Comments/style';
import DeleteIcon from '../Comments/DeleteIcon.svg';

import NewPost from '../NewPost';

import { Page } from '../Theme/Layout';
import {
	TextMessage,
	ImageMessage,
	LinkMessage,
	Post,
	LikePostResponse,
	User,
	Comment,
	CommentResponse,
} from '../api/interfaces';
import ACTIONS, { LIKE, UNLIKE } from '../api/constants';
import {
	MiniMenu,
	PostWrapper,
	PostInteraction,
	FriendPostContent,
	Image,
	InteractionInfo,
	InteractionArea,
	Avatar,
	ProfileHeaderContainer,
	ProfileHeaderText,
	ProfileHeaderHandle,
	LinkText,
	LinkInfo,
	EmptyStateWrapper,
} from './style';
import Liked from './Liked.svg';
import Unliked from './Unliked.svg';
import LikeHover from './Unliked.svg';
import CommentIcon from './CommentIcon.svg';
import LinkIcon from './LinkIcon.svg';
import { PeachContext } from '../PeachContext';

/*eslint-disable */
function isLink(object: any): object is LinkMessage {
	return 'imageURL' in object;
}
function isText(object: any): object is TextMessage {
	return 'text' in object;
}
function isImage(object: any): object is ImageMessage {
	return 'src' in object;
}
/*eslint-enable*/

const addNewlines = (txt: string) =>
	txt.indexOf('\n') < 0
		? txt
		: txt.split('\n').map(item => (
				<span>
					{item}
					<br />
				</span>
		  ));

const LikeButton = (props: { liked: boolean }) => (
	<img src={props.liked ? Liked : Unliked} alt='Like' />
);

interface FriendFeedProps extends Post {
	requester: User;
	deletePost: (id: string) => void;
	author: string;
}

export const FriendFeedContainer = (props: FriendFeedProps) => {
	const [comments, setComments] = useState<Comment[]>(props.comments || []);
	const [liked, toggleLiked] = useState<boolean>(props.likedByMe);
	const [showComments, toggleComments] = useState<boolean>(false);
	const [deletePromptShowing, setDeletePromptShowing] = useState<boolean>(
		false
	);
	const [likeCount, setLikeCount] = useState<number>(props.likeCount);

	let msgKey = 0;
	const msgs = props.message.map(obj => {
		msgKey++;
		if (isText(obj) && obj.text) {
			return <p key={msgKey}>{addNewlines(obj.text)}</p>;
		} else if (isImage(obj) && obj.src) {
			return (
				<Image
					key={msgKey}
					src={obj.src}
					alt={`image for post ${props.id}`}
				/>
			);
		} else {
			return (
				<div key={msgKey}>
					<LinkText href={obj.url}>
						<img src={LinkIcon} alt='Link' /> {obj.title}
						<LinkInfo>
							<i>{obj.description}</i>
							<Image
								src={obj.imageURL}
								alt={`Link preview thumbnail`}
							/>
						</LinkInfo>
					</LinkText>
				</div>
			);
		}
	});

	const peachContext = useContext(PeachContext);

	const onClickLike = () => {
		fetch(liked ? UNLIKE(props.id) : LIKE, {
			method: liked ? 'DELETE' : 'POST',
			body: JSON.stringify(liked ? {} : { postId: props.id }),
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${peachContext.jwt}`,
			},
		})
			.then(response => response.json())
			.catch(err => console.log(err))
			.then((response: LikePostResponse) => {
				console.log(response);
				if (response.error) {
					console.log('whoops');
					return;
				}
				toggleLiked(liked => !liked);
				if (liked) {
					setLikeCount(likeCount => likeCount - 1);
				} else {
					setLikeCount(likeCount => likeCount + 1);
				}
			});
	};

	const onClickComments = () => {
		toggleComments(showComments => !showComments);
	};

	const updateComments = (txt: string) => {
		api(ACTIONS.comment, peachContext.jwt, {
			body: txt,
			postId: props.id,
		}).then((response: { data: CommentResponse }) => {
			const resp = response.data;
			if (resp) {
				const newComment: Comment = {
					id: resp.id,
					body: txt,
					author: {
						id: resp.authorStreamID,
						name: props.requester.name,
						displayName: props.requester.displayName,
						bio: '',
						isPublic: false,
						posts: [],
						unreadPostCount: 0,
						lastRead: 0,
					},
				};
				setComments(comments => comments.concat([newComment]));
			}
		});
	};

	const deleteComment = (id: string) => {
		api(ACTIONS.deleteComment, peachContext.jwt, {}, id).then(
			(response: { success: number }) => {
				if (response.success === 1) {
					const oldComments = comments;
					setComments(comments.filter(c => c.id !== id));
				}
			}
		);
	};

	return (
		<PostWrapper>
			<>
				{props.requester.id === props.author ? (
					<>
						<MiniMenu
							onClick={() => setDeletePromptShowing(true)}
							disableTopMargin
						>
							<img src={DeleteIcon} alt='Delete' />
						</MiniMenu>
						{deletePromptShowing ? (
							<DeletePrompt
								onDelete={() => props.deletePost(props.id)}
								onCancel={() => setDeletePromptShowing(false)}
							>
								Are you sure you want to delete your post?
							</DeletePrompt>
						) : null}
					</>
				) : null}
				<FriendPostContent>{msgs}</FriendPostContent>
			</>
			<PostInteraction>
				<InteractionArea onClick={e => onClickLike()}>
					<LikeButton liked={liked} />{' '}
					<InteractionInfo>{likeCount}</InteractionInfo>
				</InteractionArea>
				<InteractionArea onClick={e => onClickComments()}>
					<img src={CommentIcon} alt='Comment' />
					<InteractionInfo>{comments.length}</InteractionInfo>
				</InteractionArea>
			</PostInteraction>
			{showComments ? (
				<Comments
					onDismissComments={onClickComments}
					comments={comments}
					updateComments={updateComments}
					requester={props.requester}
					deleteComment={deleteComment}
				/>
			) : null}
		</PostWrapper>
	);
};

const EmptyState = () => (
	<EmptyStateWrapper>
		<FriendPostContent>No posts yet!</FriendPostContent>
	</EmptyStateWrapper>
);

const FriendFeed = (props: RouteComponentProps<{ id: string }>) => {
	const [viewingUser, setCurUserProfile] = useState<User | null>(null);
	const [posts, setPosts] = useState<Post[]>([]);
	const [requester, setRequester] = useState<User | null>(null);

	const jwt = useContext(PeachContext).jwt;
	const curUser = useContext(PeachContext).curUser;

	useEffect(() => {
		const getUserProfile = async () => {
			try {
				api(
					ACTIONS.connectionStream,
					jwt,
					{},
					props.match.params['id']
				).then((resp: { data: User }) => {
					if (resp.data.posts) {
						resp.data.posts = resp.data.posts.reverse();
						setCurUserProfile(resp.data);
						setPosts(resp.data.posts);
					}

					if (curUser) {
						if (resp.data.id === curUser.id) {
							setRequester(resp.data);
						} else {
							console.log('doesnt match');
							api(
								ACTIONS.connectionStream,
								jwt,
								{},
								curUser.id
							).then((resp: { data: User }) => {
								if (resp.data) {
									setRequester(resp.data);
								}
							});
						}
					} else {
						console.log('cant set curuser');
					}
				});
			} catch (_error) {
				console.log('poop');
			}
		};

		getUserProfile();
	}, [jwt, props.match.params, curUser]);

	const deletePost = (id: string) => {
		api(ACTIONS.deletePost, jwt, {}, id).then(
			(response: { success: number }) => {
				if (response.success === 1) {
					setPosts(posts.filter(p => p.id !== id));
				}
			}
		);
	};

	return (
		<Page>
			{viewingUser && requester ? (
				<>
					<ProfileHeaderContainer>
						<Avatar>
							<img
								src={
									viewingUser.avatarSrc ||
									'https://i.imgur.com/J9tsyuW.png'
								}
								alt={`${viewingUser.name}'s avatar`}
							/>
						</Avatar>
						<ProfileHeaderText>
							<h2>{viewingUser.displayName}</h2>
							<ProfileHeaderHandle>
								@{viewingUser.name}
							</ProfileHeaderHandle>
							<p>{viewingUser.bio}</p>
						</ProfileHeaderText>
					</ProfileHeaderContainer>
					{posts.length > 0 ? (
						posts.map(post => (
							<FriendFeedContainer
								{...post}
								key={post.id}
								requester={requester}
								deletePost={deletePost}
								author={viewingUser.id}
							/>
						))
					) : (
						<EmptyState />
					)}
					<NewPost />
				</>
			) : (
				<Loading />
			)}
		</Page>
	);
};

export default withRouter(FriendFeed);
