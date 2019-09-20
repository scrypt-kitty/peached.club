import React, { useEffect, useContext, useState } from 'react';
import { Redirect } from 'react-router';
import { Link } from 'react-router-dom';

import { GlobalContextProps, PeachContext } from '../PeachContext';
import api from '../api';
import ACTIONS from '../api/constants';
import { ActivityResponse, ActivityItem } from '../api/interfaces';
import { createPostPreview } from '../utils';

import {
	PostPreview,
	Title,
	FeedPostWrapperStyled,
	DisplayName,
} from './style';

import Loading from '../Loading';
import Navigation from '../Navigation';
import { Page } from '../Theme/Layout';

import {
	ProfileLink,
	ProfilePic,
	PicFrame,
	InfoContainer,
} from '../Feed/style';

const ActivityContainer = (
	props: ActivityItem & { darkMode: boolean; curDate: Date }
) => {
	return (
		<FeedPostWrapperStyled darkMode={props.darkMode} isUnread={false}>
			<PicFrame>
				<Link to={`/friend/${props.body.authorStream.id}`}>
					<ProfilePic
						src={props.body.authorStream.avatarSrc}
						alt={props.body.authorStream.name}
					/>
				</Link>
			</PicFrame>
			<InfoContainer>
				<DisplayName>
					<Link to={`/friend/${props.body.authorStream.id}`}>
						{props.body.authorStream.displayName}
					</Link>
				</DisplayName>
				<PostPreview></PostPreview>
				<p>
					{props.type === 'comment' && props.body.commentBody
						? props.body.commentBody
						: 'liked your post'}
				</p>
				<PostPreview>
					{createPostPreview(props.body.postMessage[0])}
				</PostPreview>
			</InfoContainer>
		</FeedPostWrapperStyled>
	);
};

const Activity = (props: GlobalContextProps) => {
	const { peachFeed, jwt } = props;
	const [activityFeed, setActivityFeed] = useState<ActivityItem[] | null>(
		null
	);
	const { darkMode } = useContext(PeachContext);
	const date = new Date();
	const curHour = date.getHours();

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
	}, []);

	if (!peachFeed || !jwt) return <Redirect to='/feed' />;

	return (
		<>
			<Navigation />
			<Page>
				<Title darkMode={darkMode}>Activity</Title>
				{activityFeed ? (
					activityFeed.map((item: ActivityItem) => (
						<ActivityContainer
							key={`${item.createdTime}${item.body.authorStream.id}${item.body.postID}`}
							{...item}
							darkMode={darkMode}
							curDate={date}
						/>
					))
				) : (
					<Loading />
				)}
			</Page>
		</>
	);
};

export default Activity;
