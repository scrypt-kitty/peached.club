import styled from 'styled-components';

export const FriendPostContent = styled.div`
	height: 100%;

	> p:first-of-type {
		margin-top: 0;
	}
`;
interface MiniMenuProps {
	onClick?: () => void;
}

export const MiniMenu = styled.div<MiniMenuProps>`
	height: 100%;
	visibility: hidden;
	position: relative;
	transform: translateY(1rem);
	float: right;
	> img:hover {
		cursor: pointer;
	}
	@media screen and (max-width: 700px) {
		float: initial;
		top: -1.5rem;
	}
`;

export const DeletePost = styled(MiniMenu)`
	width: 100%;
	display: flex;
	justify-content: end;
`;

export const PostWrapper = styled.div<{ darkMode?: boolean }>`
	background: ${props => (props.darkMode ? '#262628' : 'white')};
	color: ${props => (props.darkMode ? 'white' : 'black')};
	word-wrap: break-word;
	padding: 2rem 3rem 0;
	:last-child {
		padding: 2rem 3rem;
	}

	:hover {
		> ${MiniMenu} {
			visibility: visible;
		}
	}
	@media screen and (max-width: 500px) {
		padding: 1rem 1.5rem 0;
		:last-of-type {
			padding: 1rem 1.5rem 1rem;
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
	margin-bottom: 1rem;
	@media screen and (max-width: 1000px) {
		max-width: 100%;
	}
`;

export const LinkText = styled.a`
	text-decoration: none;
	color: #fe4f72;

	:visited {
		text-decoration: none;
		color: #fe4f72;
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

export const InteractionArea = styled.div<{ darkMode: boolean }>`
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
		background: ${props => (props.darkMode ? '#cacaca30' : '#cacaca')};
	}
	height: 0.8rem;
`;

export const PostTime = styled.div`
	display: inline-flex;
	align-items: center;
	padding: 0.5rem 0.5rem;
	border-radius: 1rem;
	transition: 0.25s all ease;
	height: 0.8rem;
`;

/**
 * profile header stuff
 */

export const ProfileHeaderContainer = styled.div<{ darkMode: boolean }>`
	display: flex;
	margin-bottom: 1rem;
	color: ${props => (props.darkMode ? 'white' : 'black')};

	@media screen and (max-width: 700px) {
		margin: 3rem 1rem 1rem;
	}
`;

export const Avatar = styled.div`
	flex: 1;
	align-items: center;
	display: flex;
	> img {
		border-radius: 50%;
		width: 100px;
		height: 100px;
		object-fit: cover;
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
