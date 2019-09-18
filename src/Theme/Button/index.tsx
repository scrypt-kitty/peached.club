import React from 'react';
import styled from 'styled-components';

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
`;

interface ButtonProps {
	children: React.ReactNode;
	link?: string;
	onClick: () => void;
	color?: string;
	lg?: boolean;
}

const Button: React.FC<ButtonProps> = (props: ButtonProps) => (
	<ButtonLink href={props.link || '#'} onClick={e => props.onClick()}>
		<ButtonStyle type='submit' color={props.color} lg={props.lg}>
			{props.children}
		</ButtonStyle>
	</ButtonLink>
);

export default Button;
