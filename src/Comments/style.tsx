import React, { useState } from 'react';
import styled, { createGlobalStyle } from 'styled-components';

import { Comment as PostCommentProps } from '../api/interfaces';
import {
	Avatar,
	ProfileHeaderHandle as Handle,
	MiniMenu,
} from '../Friend/style';

import { Button as Butt } from '../Login/style';

import DeleteIcon from './DeleteIcon.svg';

const ModalBackdrop = styled.div`
	top: 0;
	left: 0;
	position: fixed;
	background: rgba(0, 0, 0, 0.3);
	width: 100vw;
	display: flex;
	align-items: center;
	align-content: center;
	justify-content: center;
	height: 100%;
	padding: 0;
	margin: 0;

	overflow: hidden;
`;

export const DisableBodyScroll = createGlobalStyle`
body {
overflow: hidden;
}
`;

const ModalContainer = styled.div`
	background: white;
	margin: 0;
	padding: 1rem 2rem;
	width: 50%;
	height: 60%;
	max-height: 80%;
	overflow: scroll;
	border-radius: 0.5rem;
	@media screen and (max-width: 800px) {
		width: 80%;
	}

	display: flex;
	flex-direction: column;
	justify-content: space-between;
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
}

export const DeletePrompt = (props: DeletePromptProps) => (
	<ModalBackdrop>
		<DeletePromptContainer>
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
`;

const CommentText = styled.div`
	flex: 9;
	margin-left: 1rem;
	> a > h3 {
		margin-bottom: 0;
	}
`;

export const AddCommentContainer = styled.div`
	display: flex;
	padding-bottom: 0;
	padding-top: 1rem;
	width: 100%;
	background: white;
`;

export const Input = styled.textarea`
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
`;

const ProfileLink = styled.a`
	text-decoration: none;
	color: unset;
	:visited {
		text-decoration: none;
	}
	:hover {
		text-decoration: none;
	}
`;

interface CommentProps extends PostCommentProps {
	avatarSrc: string;
	isRequester: boolean;
	deleteComment: (id: string) => void;
}

export const Comment: React.FC<CommentProps> = (props: CommentProps) => {
	const [deletePromptShowing, setDeletePromptShowing] = useState<boolean>(
		false
	);
	return (
		<CommentContainer>
			<ProfileLink href={`/friend/${props.author.id}`}>
				<AvatarStyled>
					<img src={props.avatarSrc} alt={props.author.displayName} />
				</AvatarStyled>
			</ProfileLink>
			<CommentText>
				<ProfileLink href={`/friend/${props.author.id}`}>
					<h3>{props.author.displayName}</h3>
					<Handle>@{props.author.name}</Handle>
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

interface ModalProps {
	children: React.ReactNode;
	onKeyDown: () => void;
}

export const Modal: React.FC<ModalProps> = ({ children, onKeyDown }) => {
	return (
		<ModalBackdrop
			tabIndex={0}
			onKeyDown={(e: React.KeyboardEvent<HTMLDivElement>) =>
				e.key === 'Escape' && onKeyDown()
			}
		>
			<DisableBodyScroll />
			<ModalContainer>{children}</ModalContainer>
		</ModalBackdrop>
	);
};
