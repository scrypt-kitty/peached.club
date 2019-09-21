import React, { useState, useEffect, useContext } from 'react';
import { RouteComponentProps, Redirect } from 'react-router';

import Navigation from '../Navigation';
import Loading from '../Loading';
import NewPost from '../NewPost';

import { PeachContext, GlobalContextProps } from '../PeachContext';
import { Connections, PeachFeed, User } from '../api/interfaces';
import ACTIONS from '../api/constants';
import api from '../api';

import { LinkStyled } from './style';
import Preview from './Preview';
import { Page } from '../Theme/Layout';
import { Title } from '../Theme/Type';

const Feed = (props: RouteComponentProps & GlobalContextProps) => {
	const { jwt, setPeachFeed } = props;
	const [connections, setConnections] = useState<User[] | null>(null);
	const { darkMode } = useContext(PeachContext);
	useEffect(() => {
		if (jwt) {
			api(ACTIONS.getConnections, jwt).then(
				(response: { data: Connections; success: number }) => {
					if (response.success === 1) {
						console.log(response.data);
						setConnections(response.data.connections);
						const newPeachFeed: PeachFeed = {};
						for (const user of response.data.connections) {
							newPeachFeed[user.id] = user;
							if (newPeachFeed[user.id].posts) {
								newPeachFeed[
									user.id
								].posts = user.posts.reverse();
							}
						}
						setPeachFeed(newPeachFeed);
					} else {
						console.log('handle error here :)');
					}
				}
			);
		}
	}, []);

	if (!jwt) {
		return <Redirect push to='/login' />;
	}

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
								message={
									user.posts && user.posts[0]
										? user.posts[0].message[0]
										: { type: 'text', text: '' }
								}
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
