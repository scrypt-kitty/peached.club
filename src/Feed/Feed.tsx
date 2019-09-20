import React, { useState, useEffect, useContext } from 'react';
import { RouteComponentProps } from 'react-router';

import Navigation from '../Navigation';
import Loading from '../Loading';

import { PeachContext, GlobalContextProps } from '../PeachContext';
import {
	Connections,
	PeachFeed,
	TextMessage,
	LinkMessage,
	ImageMessage,
} from '../api/interfaces';
import { CONNECTIONS } from '../api/constants';

import FeedPreview from './style';
import { Page } from '../Theme/Layout';
import { createPostPreview } from '../utils';

const Feed = (props: RouteComponentProps & GlobalContextProps) => {
	const { jwt, curUser, setCurFeedIndex, history, setPeachFeed } = props;
	const [connections, setConnections] = useState<
		Connections['data']['connections'] | null
	>(null);
	const peachContext = useContext(PeachContext);
	useEffect(() => {
		const getConnections = async () => {
			await fetch(CONNECTIONS, {
				method: 'GET',
				headers: {
					'Content-Type': 'application/json',
					Authorization: `Bearer ${jwt}`,
				},
			})
				.then(response => response.json())
				.then((response: Connections) => {
					if (response.data) {
						setConnections(response.data.connections);
						const newPeachFeed: PeachFeed = {};
						for (const user of response.data.connections) {
							newPeachFeed[user.id] = user;
							newPeachFeed[user.id].posts = user.posts.reverse();
						}
						setPeachFeed(newPeachFeed);
					}
				});
		};
		getConnections();
	}, []);

	const openProfile = (id: string) => {
		history.push(`/friend/${id}`);
	};

	// return (
	// <>
	// <Navigation />
	// <Page>
	// <Loading />
	// </Page>
	// </>
	// );

	return (
		<>
			<Navigation />
			<Page>
				{connections ? (
					connections.map(user => (
						<FeedPreview
							key={user.id}
							avatarSrc={user.avatarSrc}
							displayName={user.displayName}
							onClick={() => openProfile(user.id)}
							postPreview={
								user.posts && user.posts.length > 0
									? createPostPreview(
											user.posts[0].message[0]
									  )
									: ''
							}
							isUnread={user.unreadPostCount > 0}
							darkMode={peachContext.darkMode}
						/>
					))
				) : (
					<Loading />
				)}
			</Page>
		</>
	);
};

export default Feed;
