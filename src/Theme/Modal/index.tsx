import React, { useEffect, useState } from 'react';
import styled, { createGlobalStyle } from 'styled-components';

export const ModalBackdrop = styled.div<{ entering: boolean }>`
	top: 0;
	left: 0;
	width: 100vw;
	position: fixed;
	display: flex;
	align-items: center;
	align-content: center;
	justify-content: center;
	height: 100%;
	padding: 0;
	margin: 0;

	overflow: hidden;

	animation: 0.5s ${props => (props.entering ? '' : 'reverse')} EnterBackdrop;
	background: rgba(0, 0, 0, 0.3);
	z-index: 999;
`;

const DisableBodyScroll = createGlobalStyle`
	body {
		overflow: hidden;
	}

	@keyframes EnterBackdrop {
		from {
			background: rgba(0, 0, 0, 0);
		}

		to {
			background: rgba(0, 0, 0, 0.3);
		}
	}

`;

export const ModalContainer = styled.div<{
	darkMode: boolean;
	isMini: boolean;
	alignTop: boolean;
}>`
	background: ${props => (props.darkMode ? '#262628' : 'white')};
	margin: 0;
	padding: 1rem 2rem;
	width: ${props => (props.isMini ? '30%' : '50%')};
	height: ${props => (props.isMini ? '40%' : '60%')};
	max-height: 80%;
	overflow: scroll;
	border-radius: 0.5rem;
	@media screen and (max-width: 800px) {
		width: ${props => (props.isMini ? '50%' : '80%')};
	}

	@media screen and (max-height: 400px) {
		height: 100%;
		max-height: calc(100% - 2rem);
	}

	display: flex;
	flex-direction: column;
	justify-content: space-between;
`;

interface ModalProps {
	children: React.ReactNode;
	onKeyDown: () => void;
	darkMode: boolean;
	isMini?: boolean;
	alignTop?: boolean;
}

const Modal: React.FC<ModalProps> = ({
	children,
	onKeyDown,
	darkMode,
	isMini = false,
	alignTop = false,
}) => {
	const [entering, setEntering] = useState<boolean>(true);
	const keepModalOpen = (e: React.MouseEvent<HTMLDivElement>) => {
		// This stops the event from bubbling up.
		// So it won't trigger the parent div's "onClick" to fire.
		e.stopPropagation();
		onKeyDown();
	};

	useEffect(() => {
		return () => {
			setEntering(false);
		};
	}, []);

	return (
		<>
			<DisableBodyScroll />
			<ModalBackdrop
				tabIndex={0}
				onKeyDown={(e: React.KeyboardEvent<HTMLDivElement>) => {
					if (e.key === 'Escape') {
						onKeyDown();
					}
				}}
				onClick={e => keepModalOpen(e)}
				entering={entering}
			>
				<ModalContainer
					alignTop={alignTop}
					isMini={isMini}
					darkMode={darkMode}
					onClick={e => e.stopPropagation()}
				>
					{children}
				</ModalContainer>
			</ModalBackdrop>
		</>
	);
};

export default Modal;
