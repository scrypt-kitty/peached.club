import styled from 'styled-components';
import React from 'react';
export const Moat = styled.div`
	display: flex;
	flex-direction: column;
	align-content: center;
	justify-content: center;
	align-items: center;
	height: 100%;
`;

export const Heading = styled.h1<{ darkMode: boolean }>`
	margin: 0 0 1rem;
	text-align: center;
	${props => (props.darkMode ? 'color: white;' : '')}
`;

export const Castle = styled.div<{ darkMode: boolean }>`
	background: ${props => (props.darkMode ? 'black' : '#fff0e6')};

	@media screen and (max-width: 800px) {
		width: 70%;
	}
`;

export const AuthInput = styled.input<{ darkMode: boolean }>`
	padding: 0.5rem 0.25rem;
	display: block;
	margin-bottom: 0.5rem;
	border-radius: 5px;
	border: ${props => (props.darkMode ? 'none' : '1px solid #cacaca')};
	font-size: 1rem;
	width: 100%;
	${props => (props.darkMode ? 'background: #262628; color: white;' : '')}
`;

export const DangerTxt = styled.p`
	color: red;
	text-align: center;
`;

const ButtonLink = styled.a`
	text-decoration: none;
	color: white;
	:visited {
		color: white;
	}
	:hover {
		color: white;
		cursor: pointer;
	}
`;

const ButtonStyle = styled.button<{ color?: string; lg?: boolean }>`
	background: ${props => props.color || 'pink'};
	border: 1px solid ${props => props.color || 'pink'};
	padding: 0.5rem 1rem;
	border-radius: 0.25rem;
	text-align: center;
	color: white;
	font-size: ${props => (props.lg ? '1.1rem' : '1rem')};
	:hover {
		background: #e197a4;
		border-color: #e197a4;
	}
	transition: 0.25s all ease;
	margin-top: 0.5rem;
`;

interface ButtonProps {
	children: React.ReactNode;
	link?: string;
	onClick: () => void;
	color?: string;
	lg?: boolean;
}

export const Button: React.FC<ButtonProps> = (props: ButtonProps) => (
	<ButtonLink href={props.link || '#'} onClick={e => props.onClick()}>
		<ButtonStyle type='submit' color={props.color} lg={props.lg}>
			{props.children}
		</ButtonStyle>
	</ButtonLink>
);

export const ButtonCenter = styled.div`
	display: flex;
	justify-content: center;
`;
