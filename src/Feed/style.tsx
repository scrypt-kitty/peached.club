import styled from 'styled-components';
import React from 'react';

const PicFrame = styled.div`
	flex: 1;
`;

const ProfilePic = styled.img`
	border-radius: 50%;
	width: 100%;
`;

const InfoContainer = styled.div`
	flex: 7;
	height: 100%;
	margin-left: 1.5rem;
	> h3 {
		margin: 0 0 0.5rem 0;
	}
	> p {
		margin: 0;
	}
`;

interface FeedPreviewProps {
	avatarSrc: string;
	displayName: string;
	onClick: () => void;
	postPreview: string;
	isUnread: boolean;
}

const FeedPostWrapper = styled.div<{ isUnread: boolean }>`
	display: flex;
	border: 1px solid ${props => (props.isUnread ? '#25d87a' : 'white')};
	background: white;
	padding: 2rem 2.5rem;
	height: 100%;
`;

const ProfileLink = styled.a`
	text-decoration: none;
	color: unset;
	:hover {
		text-decoration: none;
	}
	:hover > ${FeedPostWrapper} {
		border: 1px solid #cacaca;
	}
	:visited {
		color: unset;
	}
	margin: 1rem;
	:last-of-type {
		margin-bottom: 0;
	}
`;

const FeedPreview = (props: FeedPreviewProps) => {
	return (
		<ProfileLink href='#' onClick={e => props.onClick()}>
			<FeedPostWrapper isUnread={props.isUnread}>
				<PicFrame>
					<ProfilePic src={props.avatarSrc} />
				</PicFrame>
				<InfoContainer>
					<h3>{props.displayName}</h3>
					<p>{props.postPreview}</p>
				</InfoContainer>
			</FeedPostWrapper>
		</ProfileLink>
	);
};

export default FeedPreview;
