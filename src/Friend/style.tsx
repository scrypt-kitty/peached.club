import styled from 'styled-components';

export const FriendPostContent = styled.div`
	height: 100%;
`;
interface MiniMenuProps {
	onClick: () => void;
	disableTopMargin?: boolean;
}

export const MiniMenu = styled.div<MiniMenuProps>`
	display: flex;
	justify-content: end;
	margin-top: ${props => (props.disableTopMargin ? '0' : '1.25rem')};
	visibility: hidden;
	:hover {
		cursor: pointer;
	}
`;

export const PostWrapper = styled.div`
	background: white;
	padding: 2rem 3rem;

	:hover {
		> ${MiniMenu} {
			visibility: visible;
		}
	}
`;

export const EmptyStateWrapper = styled(PostWrapper)`
	height: 20%;
	text-align: center;
`;

export const PostInteraction = styled.div`
	width: 100%;
	text-align: left;
`;

export const Image = styled.img`
	max-width: 50%;
	display: block;
`;

export const LinkText = styled.a`
	text-decoration: none;
	color: teal;

	:visited {
		text-decoration: none;
		color: teal;
	}

	> a:first-child {
		height: 1rem;
	}
`;

export const LinkInfo = styled.div`
	margin: 0 0;
	padding: 0 0;
	padding-top: 0.5rem;
	padding-left: 1rem;
	padding-bottom: 0.5rem;
	margin-left: 0.25rem;
	border-left: 0.25rem solid #cacaca;

	> img {
		margin-top: 0.5rem;
	}
`;

export const InteractionInfo = styled.p`
	display: inline;
	margin: 0;
	margin-left: 0.5rem;
`;

export const InteractionArea = styled.div`
	display: inline-flex;
	align-items: center;
	padding: 0.5rem 0.5rem;
	border-radius: 1rem;
	transition: 0.25s all ease;
	:last-child {
		margin-left: 0.75rem;
	}
	:hover {
		cursor: pointer;
		background: #cacaca;
	}
`;

/**
 * profile header stuff
 */

export const ProfileHeaderContainer = styled.div`
	display: flex;
	margin-bottom: 1rem;
`;

export const Avatar = styled.div`
	flex: 1;
	align-items: center;
	display: flex;
	> img {
		border-radius: 50%;
		height: 100px;
	}
`;

export const ProfileHeaderHandle = styled.p`
	margin-top: 0;
	margin-bottom: 1rem;
	color: #cacaca;
`;

export const ProfileHeaderText = styled.div`
	flex: 9;
	margin: 1rem;
	> h2 {
		margin: 0;
	}

	> p:last-child {
		margin: 0 auto;
	}
`;
