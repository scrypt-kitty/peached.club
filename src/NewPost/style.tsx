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

export const HiddenInput = styled.input`
	opacity: 0;
	width: 0.1px;
	height: 0.1px;
	position: absolute;
	overflow: hidden;
`;

export const ImagesHolder = styled.div`
	display: flex;
	width: 100%;
	justify-content: start;
	height: 15%;
	margin: 1rem 0;
	overflow: hidden;
`;

export const DeleteImage = styled.img`
	visibility: hidden;

	float: right;
	top: 0;
	right: 0;
	position: absolute;
	z-index: 1111;
	background: rgba(0, 0, 0, 0.5);
	border-radius: 80%;
`;

export const UploadedImage = styled.img`
	object-fit: cover;
	width: 100%;
	height: 100%;
	transition: 0.2s all ease-in;

	top: 0;
	position: absolute;

	:hover {
		transform: scale(1.2);
		transition: 0.2s all ease-in;
	}

	:last-of-type {
		margin-right: 0;
	}
`;

export const Image = styled.div`
	flex-basis: 25%;
	margin-right: 1rem;
	overflow: hidden;
	border-radius: 0.25rem;
	:hover > ${DeleteImage} {
		visibility: visible;
		cursor: pointer;
	}

	position: relative;
`;
