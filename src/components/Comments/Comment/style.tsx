import styled from 'styled-components';
import { rem } from 'polished';

import {
	Avatar,
	ProfileHeaderHandle as Handle,
} from '../../ProfileHeader/style';
import { MiniMenu } from '../../../Friend/style';
import { ModalContainer } from '../../../Theme/Modal';
import { MContainer } from '../../../Theme/Mantine';

export const DeleteCommentContainer = styled.div`
	/* visibility: hidden; */
	display: flex;
	justify-content: flex-end;

	/* :hover span {
		cursor: pointer;
	} */

	.mantine-Paper-root .mantine-Menu-body {
		background-color: ${props => props.theme.background.primary};
		color: ${props => props.theme.text.primary};
	}

	svg {
		stroke: ${props => props.theme.text.muted};
	}
`;

export const Container = styled(MContainer)`
	padding: ${rem(8)} ${rem(16)};
	:hover {
		background: #cacaca30;
	}

	@media screen and (max-width: 600px) {
		padding: ${rem(4)} ${rem(8)};
	}
	/* :hover ${DeleteCommentContainer} {
		visibility: visible;
	} */
`;

export const CommentContent = styled.div`
	display: flex;
`;

export const AvatarArea = styled.div`
	height: 100%;
	padding-top: ${rem(3)};

	img {
		border-radius: 50%;
	}
`;

export const DeleteIconButton = styled.div`
	cursor: pointer;

	svg {
		stroke: ${props => props.theme.text.muted};
	}

	:hover svg {
		stroke: ${props => props.theme.accent};
	}
`;

export const DeletePromptContainer = styled(ModalContainer)`
	width: ${rem(250)};
	height: auto;
	text-align: center;
	@media screen and (max-width: 800px) {
		width: 50%;
	}

	@media screen and (max-width: 600px) {
		width: 80%;
	}
`;

export const DeleteOptions = styled.div`
	display: flex;
	flex-direction: row;
	justify-content: space-evenly;
	margin-top: 1rem;
`;

export const CommentText = styled.div`
	flex: 9;
	margin-left: 1rem;
	margin-bottom: 0;

	a:hover {
		text-decoration: none;
		color: ${props => props.theme.accent};
	}

	> a > h3 {
		margin-bottom: 0;
	}

	@media screen and (max-width: 500px) {
		> a > h3 {
			margin-top: 0;
		}
	}

	> p {
		word-wrap: anywhere;
		font-size: 0.9rem;
		margin-top: 0;
		margin-bottom: 0;
		color: ${props => props.theme.text.primary};
	}
`;

export const AvatarStyled = styled(Avatar)`
	flex: 1;
	cursor: pointer;

	> img {
		object-fit: cover;
		border-radius: 50%;
		width: ${rem(50)};
		height: ${rem(50)};
	}

	> span {
		width: ${rem(50)};
		height: ${rem(50)};
		font-size: 45px;
	}

	@media screen and (max-width: 800px) {
		> img {
			width: ${rem(32)};
			height: ${rem(32)};
		}

		> span {
			width: 50px;
			font-size: 45px;
		}
		margin-top: 0.5rem;
	}
`;

export const ProfileLink = styled.span`
	@media screen and (max-width: 800px) {
		> a > h3 {
			margin-top: 0.5rem;
		}
	}

	> a {
		text-decoration: none;
		color: unset;
		cursor: pointer;
		:visited {
			text-decoration: none;
		}
		:hover {
			text-decoration: none;
		}
	}

	> a > h3 {
		border-radius: 0.25rem;
	}
`;

export const BasicContainer = styled.div`
	margin: 0;
	padding: 0;
	cursor: pointer;
`;

export const HandleStyled = styled.span`
	width: fit-content;
	margin-bottom: ${rem(5)};
	font-size: ${rem(12)};
	color: ${props => props.theme.text.muted};
	@media screen and (max-width: 700px) {
		margin-bottom: 0.5rem;
	}
`;

export const AuthorName = styled.span`
	width: fit-content;
	font-weight: bold;
	margin: 0;
	color: ${props => props.theme.text.primary};

	:hover {
		color: ${props => props.theme.accent};
	}
`;

export const ReplyButtonContainer = styled.div`
	visibility: hidden;
	background-color: initial;
	cursor: pointer;
	align-self: flex-end;

	svg {
		stroke: ${props => props.theme.text.muted};
	}

	@media screen and (max-width: 700px) {
		float: initial;
		top: -1.5rem;
		margin-bottom: ${rem(15)};
	}

	:hover {
		svg {
			stroke: ${props => props.theme.accent};
		}
	}
`;

export const CommentContainer = styled.div`
	transition: 0.25s background ease;
	display: flex;
	margin: 0 auto;
	padding: ${rem(8)} ${rem(16)};

	:hover {
		background: #cacaca30;
		${MiniMenu},${ReplyButtonContainer} {
			visibility: visible;
		}
	}

	@media screen and (max-width: 500px) {
		/* padding: 0; */
		/* padding-left: 0.5rem; */
		padding: ${rem(4)} ${rem(8)};
		/* flex-direction: column; */
	}
`;

export const CommentInteractionsContainer = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: space-between;
	padding-left: ${rem(5)};
`;