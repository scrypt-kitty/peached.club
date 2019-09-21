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
	}
`;

interface ButtonStyleProps {
	color?: string;
	lg?: boolean;
	disabled?: boolean;
}

const ButtonStyle = styled.button<ButtonStyleProps>`
	background: ${props =>
		props.disabled ? '#cacaca' : props.color || '#fe4f72'};
	border: 1px solid
		${props => (props.disabled ? '#cacaca' : props.color || '#fe4f72')};
	padding: 0.5rem 1rem;
	border-radius: 0.25rem;
	text-align: center;
	color: white;
	font-size: ${props => (props.lg ? '1.1rem' : '1rem')};
	:hover {
		background: ${props => (props.disabled ? '#b0b0b0' : '#e6395b')};
		border-color: ${props => (props.disabled ? '#b0b0b0' : '#e6395b')};
		cursor: pointer;
	}
	transition: 0.25s all ease;
`;

interface ButtonProps extends ButtonStyleProps {
	children: React.ReactNode;
	link?: string;
	onClick: () => void;
}

const Button: React.FC<ButtonProps> = (props: ButtonProps) => (
	<ButtonLink href={props.link || '#'} onClick={e => props.onClick()}>
		<ButtonStyle
			type='submit'
			color={props.color}
			lg={props.lg}
			disabled={props.disabled}
		>
			{props.children}
		</ButtonStyle>
	</ButtonLink>
);

export default Button;
