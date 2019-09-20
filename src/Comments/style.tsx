import React, { useState } from 'react';
import styled, { createGlobalStyle } from 'styled-components';
import { Link } from 'react-router-dom';

import { Comment as PostCommentProps } from '../api/interfaces';
import {
	Avatar,
	ProfileHeaderHandle as Handle,
	MiniMenu,
} from '../Friend/style';

import { Button as Butt } from '../Login/style';
import { ModalContainer, ModalBackdrop } from '../Theme/Modal';
import { DisplayName3 } from '../Theme/Profile';

import DeleteIcon from './DeleteIcon.svg';

export const DisableBodyScroll = createGlobalStyle`
	body {
		overflow: hidden;
	}
`;

const DeletePromptContainer = styled(ModalContainer)`
	width: 30%;
	height: auto;
	text-align: center;
	@media screen and (max-width: 800px) {
		width: 30%;
	}
`;

const DeleteOptions = styled.div`
	display: flex;
	flex-direction: row;
	justify-content: space-evenly;
	margin-top: 1rem;
`;

export const AllComments = styled.div`
	overflow: scroll;
`;

interface DeletePromptProps {
	onDelete: () => void;
	onCancel: () => void;
	children: React.ReactNode;
	darkMode: boolean;
}

export const DeletePrompt = (props: DeletePromptProps) => (
	<ModalBackdrop entering>
		<DeletePromptContainer darkMode={props.darkMode}>
			{props.children}
			<DeleteOptions>
				<Button onClick={() => props.onDelete()}>Delete</Button>
				<Button onClick={() => props.onCancel()}>Cancel</Button>
			</DeleteOptions>
		</DeletePromptContainer>
	</ModalBackdrop>
);

const CommentContainer = styled.div`
	transition: 0.25s background ease;
	display: flex;
	margin: 0 auto;
	padding: 0.5rem 1rem;
	border-radius: 0.5rem;

	:hover {
		background: #cacaca30;
		> ${MiniMenu} {
			visibility: visible;
		}
	}
	@media screen and (max-width: 500px) {
		padding: 0;
		:first-child {
			padding-top: 0.5rem;
		}
	}
`;

const CommentText = styled.div`
	flex: 9;
	margin-left: 1rem;
	> a > h3 {
		margin-bottom: 0;
	}
	@media screen and (max-width: 500px) {
		> a > h3 {
			margin-top: 0;
		}
	}
`;

export const AddCommentContainer = styled.div<{ darkMode: boolean }>`
	display: flex;
	padding-bottom: 0;
	padding-top: 1rem;
	width: 100%;
	background: ${props => (props.darkMode ? '#262628' : 'white')};
`;

export const Input = styled.textarea<{ darkMode: boolean }>`
	background: ${props => (props.darkMode ? '#262628' : 'white')};
	color: ${props => (props.darkMode ? 'white' : 'black')};
	flex: 9;
	margin-right: 1rem;
	resize: none;
	border-radius: 0.5rem;
	border: 1px solid #cacaca;
	font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen,
		Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
`;

export const Button = styled(Butt)`
	flex: 1;
`;

const AvatarStyled = styled(Avatar)`
	flex: 1;
	> img {
		border-radius: 50%;
		width: 100px;
	}

	@media screen and (max-width: 500px) {
		> img {
			width: 50px;
			height: auto;
		}
	}
`;

const ProfileLink = styled.span`
	> a {
		text-decoration: none;
		color: unset;
		:visited {
			text-decoration: none;
		}
		:hover {
			text-decoration: none;
		}
	}
`;

interface CommentProps extends PostCommentProps {
	avatarSrc: string;
	isRequester: boolean;
	deleteComment: (id: string) => void;
	darkMode: boolean;
}

export const Comment: React.FC<CommentProps> = (props: CommentProps) => {
	const [deletePromptShowing, setDeletePromptShowing] = useState<boolean>(
		false
	);
	return (
		<CommentContainer>
			<ProfileLink>
				<Link to={`/friend/${props.author.id}`}>
					<AvatarStyled>
						<img
							src={props.avatarSrc}
							alt={props.author.displayName}
						/>
					</AvatarStyled>
				</Link>
			</ProfileLink>
			<CommentText>
				<ProfileLink>
					<Link to={`/friend/${props.author.id}`}>
						<DisplayName3>{props.author.displayName}</DisplayName3>
						<Handle>@{props.author.name}</Handle>
					</Link>
				</ProfileLink>
				<p>{props.body}</p>
			</CommentText>
			{props.isRequester ? (
				<>
					<MiniMenu onClick={() => setDeletePromptShowing(true)}>
						<img src={DeleteIcon} alt='Delete' />
					</MiniMenu>
					{deletePromptShowing ? (
						<DeletePrompt
							darkMode={props.darkMode}
							onDelete={() => props.deleteComment(props.id)}
							onCancel={() => setDeletePromptShowing(false)}
						>
							Are you sure you want to delete your comment?
						</DeletePrompt>
					) : null}
				</>
			) : null}
		</CommentContainer>
	);
};
