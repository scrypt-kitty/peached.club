import React, { useState, useEffect, useContext } from 'react';
import { RouteComponentProps } from 'react-router';

import Navigation from '../Navigation';
import Loading from '../Loading';
import NewPost from '../NewPost';

import { PeachContext, GlobalContextProps } from '../PeachContext';
import { Connections, PeachFeed } from '../api/interfaces';
import ACTIONS from '../api/constants';
import api from '../api';

import { LinkStyled } from './style';
import Preview from './Preview';
import { Page } from '../Theme/Layout';
import { Title } from '../Theme/Type';

const Feed = (props: RouteComponentProps & GlobalContextProps) => {
	const { jwt, setPeachFeed } = props;
	const [connections, setConnections] = useState<
		Connections['connections'] | null
	>(null);
	const { darkMode } = useContext(PeachContext);
	useEffect(() => {
		api(ACTIONS.getConnections, jwt).then(
			(response: { data: Connections }) => {
				if (response.data) {
					setConnections(response.data.connections);
					const newPeachFeed: PeachFeed = {};
					for (const user of response.data.connections) {
						newPeachFeed[user.id] = user;
						newPeachFeed[user.id].posts = user.posts.reverse();
					}
					setPeachFeed(newPeachFeed);
				}
			}
		);
	}, [jwt, setPeachFeed]);

	return (
		<>
			<Navigation />
			<Page>
				<Title darkMode={darkMode}>All Feeds</Title>
				{connections ? (
					connections.map(user => (
						<LinkStyled to={`/friend/${user.id}`}>
							<Preview
								key={user.id}
								darkMode={darkMode}
								avatarSrc={user.avatarSrc}
								displayName={user.displayName}
								name={user.name}
								id={user.id}
								message={user.posts[0].message[0]}
							/>
						</LinkStyled>
					))
				) : (
					<Loading />
				)}
				<NewPost />
			</Page>
		</>
	);
};

export default Feed;
