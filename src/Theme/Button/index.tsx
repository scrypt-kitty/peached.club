import React from 'react';
import styled from 'styled-components';

const ButtonLink = styled.a<{ centered?: boolean }>`
	text-decoration: none;
	${props => (props.centered ? '' : 'align-self: start;')}
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
	isSmall?: boolean;
}
// background: ${props => (props.disabled ? '#b0b0b0' : '#e6395b')};

const ButtonStyle = styled.button<ButtonStyleProps>`
	background: ${props =>
		props.disabled ? '#cacaca' : props.color || '#fe4f72'};
	border: 1px solid
		${props => (props.disabled ? '#cacaca' : props.color || '#fe4f72')};
	padding: 0.5rem 1rem;
	padding: ${props => (props.isSmall ? '0.25rem 0.5rem' : '0.5rem 1rem')};
	border-radius: 0.25rem;
	text-align: center;
	color: white;
	font-size: ${props => (props.lg ? '1.1rem' : '1rem')};
	:hover {
		background: ${props => (props.disabled ? '#cacaca' : '#e6395b')};
		border-color: ${props => (props.disabled ? '#cacaca' : '#e6395b')};
		cursor: ${props => (props.disabled ? 'default' : 'pointer')};
	}
	transition: 0.25s all ease;
`;

interface ButtonProps extends ButtonStyleProps {
	children: React.ReactNode;
	link?: string;
	onClick: () => void;
	centered?: boolean;
}

const Button: React.FC<ButtonProps> = (props: ButtonProps) => (
	<ButtonLink
		href={props.link || '#'}
		onClick={e => props.onClick()}
		centered={props.centered}
	>
		<ButtonStyle
			type='submit'
			color={props.color}
			lg={props.lg}
			disabled={props.disabled}
			isSmall={props.isSmall}
		>
			{props.children}
		</ButtonStyle>
	</ButtonLink>
);

export default Button;
