import React, { useContext, useState } from 'react';
import styled from 'styled-components';

import api from '../api/api';
import { Comment, AddFriendResponse } from '../api/interfaces';
import ACTIONS from '../api/constants';
import { PeachContext } from '../PeachContext';
import Modal from '../Theme/Modal';
import { Title, Handle } from '../Theme/Type';
import Button from '../Theme/Button';
import Toasty from '../Theme/Toasty';

interface PrivateProfileProps {
	onDismissPrivateProfile: () => void;
	user: Comment['author'];
	avatarSrc: string;
}

const PrivateProfileContainer = styled.div<{ darkMode: boolean }>`
	display: flex;
	flex-direction: column;
	width: 100%;
	height: 100%;
	justify-content: center;
	align-items: center;
	text-align: center;

	> h1 {
		margin: 0.25rem 0;
	}

	> p {
		${props => (props.darkMode ? 'color: white;' : '')}
		margin-bottom: 0.25rem;
	}
`;

const AvatarPreview = styled.img`
	border-radius: 50%;
	object-fit: cover;
	height: 7rem;
	width: 7rem;
`;

const PrivateProfile: React.FC<PrivateProfileProps> = ({
	onDismissPrivateProfile,
	user,
	avatarSrc,
}) => {
	const { darkMode, jwt } = useContext(PeachContext);
	const [requestSending, setRequestSending] = useState<boolean>(false);
	const [hasMadeRequest, setHasMadeRequest] = useState<boolean>(false);
	const [requestSuccess, setRequestSuccess] = useState<boolean>(false);

	const sendFriendRequest = () => {
		setHasMadeRequest(true);
		setRequestSending(true);
		api(ACTIONS.addFriend, jwt, {}, user.name).then(
			(response: AddFriendResponse) => {
				if (response.success === 1) {
					console.log('yay');
					setRequestSuccess(true);
				}
				setRequestSending(false);
			}
		);
	};
	return (
		<Modal onKeyDown={onDismissPrivateProfile} darkMode={darkMode} isMini>
			<PrivateProfileContainer darkMode={darkMode}>
				<AvatarPreview src={avatarSrc} alt='a profile pic' />
				<Title darkMode={darkMode}>{user.displayName}</Title>
				<Handle>@{user.name}</Handle>
				<p>{user.bio}</p>
				<Button
					centered
					onClick={hasMadeRequest ? () => {} : sendFriendRequest}
				>
					{hasMadeRequest ? 'Pending' : 'Add Friend'}
				</Button>
			</PrivateProfileContainer>
			{hasMadeRequest ? (
				<Toasty onClick={() => {}}>
					{requestSending
						? 'Sending friend request...'
						: requestSuccess
						? 'Friend request sent!'
						: "Couldn't send friend request, please try again later!"}
				</Toasty>
			) : null}
		</Modal>
	);
};

export default PrivateProfile;
