import React from 'react';
import styled from 'styled-components';

const Dropdown = styled.div`
	position: absolute;
	display: flex;
	flex-direction: column;
	flex-shrink: 0;
	margin: 0;
	padding: 0;
	top: 80%;
	max-width: 30%;
	overflow-x: hidden;
	overflow-y: scroll;
	box-shadow: 0.25rem 0.25rem 0.25rem rgba(0, 0, 0, 0.2);
	border-radius: 0.25rem;

	@media screen and (max-width: 1000px) {
		max-width: 45%;
	}

	@media screen and (max-width: 700px) {
		max-width: 75%;
		flex-direction: column-reverse;
		top: 0;
	}
`;

const DropdownUserItemContainer = styled.div<{ darkMode: boolean }>`
	background: ${props => (props.darkMode ? 'black' : 'white')};
	margin: 0;
	padding: 1rem;
	display: flex;
	color: ${props => (props.darkMode ? 'white' : 'black')};

	> img {
		flex: 1;
		border-radius: 50%;
		margin-right: 1rem;
	}
	> div {
		margin: 0;
		padding: 0;
		flex: 5;
		> p:first-of-type {
			font-weight: bold;
			margin: 0 0 0.25rem;
		}

		> p:last-of-type {
			margin: 0;
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
