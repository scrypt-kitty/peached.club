import styled from 'styled-components';
import { TextArea as OldInput } from '../Theme/Form';

export const NewPostButton = styled.div`
	position: fixed;
	bottom: 2rem;
	right: 2rem;
	background: #fe4f72;
	padding: 1.5rem;
	border-radius: 50%;
	width: 1rem;
	height: 1rem;
	text-align: center;
	box-shadow: 5px 5px 5px #00000050;

	> img {
		width: 1rem;
		height: 1rem;
	}

	:hover {
		cursor: pointer;
	}
`;

export const TextArea = styled(OldInput)<{ darkMode: boolean }>`
	margin-right: 0;
	padding: 0.5rem;
	background: ${props => (props.darkMode ? '#262628' : 'white')};
	color: ${props => (props.darkMode ? 'white' : '#262628')};
	font-size: 1rem;
	margin-bottom: 1rem;
`;

export const Header = styled.h2<{ darkMode: boolean }>`
	margin-bottom: 1rem;
	margin-top: 0;
	color: ${props => (props.darkMode ? 'white' : 'black')};
`;
