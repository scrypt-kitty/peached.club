import React from 'react';
import styled, { createGlobalStyle } from 'styled-components';

const Page = styled.div`
	display: flex;
	width: 100%;
	height: 100%;
	justify-content: center;
	align-content: center;
	align-items: center;
`;

const LoadingContainer = styled.div`
	font-size: 2rem;
`;

const Animations = createGlobalStyle`
	@keyframes levitate {
		from {
			transform: none;
		}

		to {
		transform: translateY(2rem);
		}
	}
`;

const LoadingIcon = styled.div`
	animation: 1s infinite alternate levitate;
`;

const Loading = () => (
	<>
		<Animations />
		<Page>
			<LoadingContainer>
				<LoadingIcon>
					<span role='img' aria-label='peach'>
						🍑
					</span>
				</LoadingIcon>
			</LoadingContainer>
		</Page>
	</>
);

export default Loading;
