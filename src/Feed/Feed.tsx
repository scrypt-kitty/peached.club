import React, { useState, useEffect, useContext } from 'react';
import { RouteComponentProps } from 'react-router';

import { PeachContext } from '../PeachContext';
import {
	Connections,
	PeachFeed,
	TextMessage,
	LinkMessage,
	ImageMessage,
	isText,
	isImage,
	isLink,
} from '../api/interfaces';
import { CONNECTIONS } from '../api/constants';

import FeedPreview from './style';
import { Page } from '../Theme/Layout';

const Feed = (props: RouteComponentProps) => {
	const { history } = props;
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
					Authorization: `Bearer ${peachContext.jwt}`,
				},
			})
				.then(response => response.json())
				.then((response: Connections) => {
					if (response.data) {
						setConnections(response.data.connections);
						const peachFeed: PeachFeed = {};
						for (const user of response.data.connections) {
							peachFeed[user.id] = user;
							peachFeed[user.id].posts = user.posts.reverse();
						}
						peachContext.setPeachFeed(peachFeed);
					}
				});
		};
		getConnections();
	}, []);

	const openProfile = (id: string) => {
		history.push(`/friend/${id}`);
	};

	const createPostPreview = (
		post: TextMessage | ImageMessage | LinkMessage
	) => {
		if (isText(post)) {
			if (post.text.length > 300) {
				return post.text.slice(0, 300) + '...';
			} else {
				return post.text;
			}
		} else if (isImage(post)) return 'Image post';
		else return 'Link post';
	};

	return (
		<Page>
			{connections
				? connections.map(user => (
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
						/>
				  ))
				: null}
		</Page>
	);
};

export default Feed;
