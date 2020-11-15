import React from 'react';
import styled, { createGlobalStyle } from 'styled-components';

interface ToastyProps {
	children: React.ReactNode;
	onClick: () => void;
}

const Animation = createGlobalStyle`
	@keyframes EnterToasty {
		from {
		transform: translateY(6rem);
		visibility: hidden;
		}
		to {
		transform: translateY(0);
		visibility: visible;
		}
	}
`;

const ToastyWrapper = styled.div`
	width: 50%;
	max-width: 50%;
	text-align: center;
	background: #fe4f72;
	position: fixed;
	padding: 0.5rem 1rem;
	border-radius: 0.25rem;
	bottom: 2rem;
	color: white;
	left: 25%;
	animation-name: EnterToasty;
	animation-direction: alternate;
	animation-duration: 0.25s;
	animation-iteration-count: 1;
	z-index: 1000;
`;

const Toasty: React.FC<ToastyProps> = ({ children, onClick }) => {
	return (
		<>
			<Animation />
			<ToastyWrapper onClick={() => onClick()}>{children}</ToastyWrapper>
		</>
	);
};

export default Toasty;
