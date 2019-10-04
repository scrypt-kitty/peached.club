import styled from 'styled-components';

export const NavWrap = styled.div<{ darkMode: boolean }>`
	width: 100%;
	position: fixed;
	top: 0;
	left: 0;
	background: ${props => (props.darkMode ? 'black' : '#fff0e6')};
	z-index: 100;
`;

export const Nav = styled.nav`
	margin: 1rem;
	padding: 0;
	display: flex;
	justify-content: space-between;

	@media screen and (max-width: 700px) {
		margin: 0.5rem 1rem;
	}
`;

export const Link = styled.span`
	> a {
		text-decoration: none;
		color: #fe4f72;
	}

	> a:visited {
		color: #fe4f72;
	}

	:hover {
		cursor: pointer;
	}

	margin-left: 1rem;
	:first-child {
		margin-left: 0;
	}
`;

export const AppLinks = styled.div`
	display: flex;
	align-content: center;
`;

export const FeedControls = styled.div``;
