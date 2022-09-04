import React, { useContext, useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

import api from '../../api';
import Loading from '../../Theme/Loading';

import { Page } from '../../Theme/Layout';
import {
	Post,
	User,
	FriendsOfFriendsResponse,
	MutualFriend,
	CurUser,
} from '../../api/interfaces';
import ACTIONS from '../../api/constants';

import { FriendPostContent, EmptyStateWrapper } from './style';
import { PeachContext } from '../../PeachContext';
import { ProfilePosts } from './ProfilePosts';
import NewPost from '../../components/NewPost';

import { ProfileHeader } from '../../components/ProfileHeader/ProfileHeader';
const EmptyState = () => (
	<EmptyStateWrapper>
		<FriendPostContent>No posts yet!</FriendPostContent>
	</EmptyStateWrapper>
);

export const ProfilePage = () => {
	const { jwt, curUser, peachFeed, curUserData, setCurUserData } =
		useContext(PeachContext);
	const navigate = useNavigate();

	const [posts, setPosts] = useState<Post[]>([]);
	const [viewingUser, setCurUserProfile] = useState<User | null>(null);
	const [curFeedId, setCurFeedId] = useState<string>('');
	const [otherFriends, setOtherFriends] = useState<MutualFriend[]>([]);
	const [postsLoaded, setPostsLoaded] = useState<boolean>(false);

	const { id } = useParams();

	useEffect(() => {
		window.scroll({ top: 0, left: 0, behavior: 'smooth' });
		if (!jwt || !curUser) {
			navigate('/login', { replace: true });
		}

		if (curUserData.id || !curUser) {
			return;
		}

		api(
			ACTIONS.connectionStream,
			jwt,
			{},
			curUser.id,
			'',
			'ProfilePage useeffect1'
		).then((response: { data: CurUser }) => {
			if (response.data) {
				setCurUserData(response.data);
			}
		});
		// eslint-disable-next-line
	}, [curUserData.id, curUser, jwt]);

	useEffect(() => {
		window.scroll({ top: 0, left: 0, behavior: 'smooth' });
		// eslint-disable-next-line
	}, [id]);

	useEffect(() => {
		if (!viewingUser && peachFeed) {
			setCurUserProfile(peachFeed.filter(user => user.id === id)[0]);
		}
	}, [peachFeed, viewingUser]);

	useEffect(() => {
		if (!id || !jwt) {
			return;
		}

		const getUserProfile = async () => {
			setPostsLoaded(false);
			const resp: { data: User } = await api(
				ACTIONS.connectionStream,
				jwt,
				{},
				id,
				'',
				'ProfilePage getUserProfile useffect2'
			);

			// get posts by this user
			if (resp.data.posts) {
				resp.data.posts = resp.data.posts.reverse();
				setCurUserProfile(resp.data);
				setPosts(resp.data.posts);
				setPostsLoaded(true);

				// get this user's friends
				const otherFriendsResponse: {
					data: FriendsOfFriendsResponse;
				} = await api(ACTIONS.getFriendsOfFriends, jwt, {}, resp.data.name);
				if (
					otherFriendsResponse.data &&
					otherFriendsResponse.data.connections
				) {
					setOtherFriends(
						otherFriendsResponse.data.connections.concat(peachFeed)
					);
				}
			}

			// used to show prev/next arrows on nav to go through feeds
			setCurFeedId(id);
		};
		getUserProfile();
	}, [id, jwt, peachFeed]);

	useEffect(() => {
		try {
			if (curUser !== null && curUser.id !== id) {
				const markRead = async () => {
					api(ACTIONS.markFeedRead, jwt, {}, id);
				};
				markRead();
			}
		} catch (_error) {}
	}, [curUser, jwt, peachFeed, id]);

	const deletePost = (id: string) => {
		const windowPositionY = window.scrollY;
		api(ACTIONS.deletePost, jwt, {}, id).then(
			(response: { success: number }) => {
				if (response.success === 1) {
					setPosts(posts.filter(p => p.id !== id));
					window.scrollTo(0, windowPositionY);
				}
			}
		);
	};

	return (
		<>
			<Page>
				{viewingUser && curUserData ? (
					<>
						<ProfileHeader
							viewingUser={viewingUser}
							postsLoaded={postsLoaded}
						/>
						{!postsLoaded ? (
							<Loading />
						) : posts.length > 0 ? (
							<div style={{ margin: '0' }}>
								{posts.map(post => (
									<ProfilePosts
										{...post}
										key={post.id}
										deletePost={deletePost}
										author={viewingUser.id}
										otherFriends={otherFriends}
										postAuthorAvatarSrc={viewingUser.avatarSrc}
									/>
								))}
							</div>
						) : (
							<EmptyState />
						)}
						{curUser !== null && curUser.id === id && <NewPost />}
					</>
				) : (
					<Loading />
				)}
			</Page>
		</>
	);
};
