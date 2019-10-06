import React from 'react';
import styled from 'styled-components';

// const Dropdown = styled.div`
// position: absolute;
// display: flex;
// flex-direction: column;
// flex-shrink: 0;
// margin: 0;
// padding: 0;
// top: 80%;
// overflow-x: hidden;
// overflow-y: scroll;
// border-radius: 0.25rem;
// width: 100%;

// @media screen and (max-width: 700px) {
// flex-direction: column-reverse;
// top: 0;
// }
// `;

const Dropdown = styled.div`
	margin: 0;
	width: 100%;
	max-height: 5rem;
	overflow-y: scroll;
	display: flex;
	flex-direction: column;
	border-radius: 0.25rem;

	@media screen and (max-width: 700px) {
		max-height: 50%;
	}
`;

const DropdownUserItemContainer = styled.div<{ darkMode: boolean }>`
	margin: 0;
	padding: 0.5rem;
	display: flex;
	color: ${props => (props.darkMode ? 'white' : 'black')};
	font-size: smaller;
	border-top: 1px solid #cacaca;
	height: 100%;

	> img {
		border-radius: 50%;
		margin-right: 1rem;
		height: 38px;
		width: 38px;
		object-fit: cover;
	}
	> div {
		margin: 0;
		padding: 0;
		flex: 5;
		> p {
			margin: 0;
		}
		> p:first-of-type {
			font-weight: bold;
		}
	}

	:hover {
		background: ${props => (props.darkMode ? '#262628' : '#cacaca')};
	}
`;

interface DropdownUserItemProps {
	username: string;
	displayName: string;
	avatarSrc: string;
	darkMode: boolean;
	onClick: () => void;
}

const truncate = (txt: string, max: number) =>
	txt.length < max ? txt : txt.slice(0, max - 3) + '...';

export const DropdownUserItem: React.FC<DropdownUserItemProps> = ({
	username,
	displayName,
	avatarSrc,
	darkMode,
	onClick,
}) => (
	<DropdownUserItemContainer onClick={() => onClick()} darkMode={darkMode}>
		<img src={avatarSrc} alt={`${username}'s avatar'`} />
		<div>
			<p>{truncate(displayName, 25)}</p>
			<p>@{truncate(username, 25)}</p>
		</div>
	</DropdownUserItemContainer>
);

export default Dropdown;
