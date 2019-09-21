import React, { useEffect, useContext, useState } from 'react';
import { Redirect } from 'react-router';

import { GlobalContextProps, PeachContext } from '../PeachContext';
import api from '../api';
import ACTIONS from '../api/constants';
import { ActivityResponse, ActivityItem } from '../api/interfaces';

import Loading from '../Loading';
import Navigation from '../Navigation';
import { Page } from '../Theme/Layout';
import { Title } from '../Theme/Type';
import Preview from '../Feed/Preview';

const Activity = (props: GlobalContextProps) => {
	const { peachFeed, jwt } = props;
	const [activityFeed, setActivityFeed] = useState<ActivityItem[] | null>(
		null
	);
	const { darkMode } = useContext(PeachContext);

	useEffect(() => {
		try {
			api(ACTIONS.getActivityFeed, jwt).then(
				(response: { data: ActivityResponse }) => {
					if (response.data.streamID) {
						setActivityFeed(response.data.activityItems);
					} else {
						console.log('welp!');
					}
				}
			);
		} catch (err) {
			console.log(err);
		}
	}, [jwt]);

	if (!peachFeed || !jwt) return <Redirect to='/feed' />;

	return (
		<>
			<Navigation />
			<Page>
				<Title darkMode={darkMode}>Activity</Title>
				{activityFeed ? (
					activityFeed.map((item: ActivityItem) => (
						<Preview
							key={`${item.createdTime}${item.body.authorStream.id}${item.body.postID}`}
							avatarSrc={item.body.authorStream.avatarSrc}
							displayName={item.body.authorStream.displayName}
							name={item.body.authorStream.name}
							id={item.body.authorStream.id}
							darkMode={darkMode}
							message={item.body.postMessage[0]}
						>
							<p>
								{item.type === 'comment' &&
								item.body.commentBody
									? item.body.commentBody
									: 'liked your post'}
							</p>
						</Preview>
					))
				) : (
					<Loading />
				)}
			</Page>
		</>
	);
};

export default Activity;
