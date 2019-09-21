import styled from 'styled-components';

export const Title = styled.h1<{ darkMode: boolean }>`
	color: ${props => (props.darkMode ? 'white' : 'black')};
	margin-left: 1rem;
	@media screen and (max-width: 700px) {
		margin-top: 2.5rem;
	}
`;

export const SubTitle = styled.h2<{ darkMode: boolean }>`
	color: ${props => (props.darkMode ? 'white' : 'black')};
	margin: 0 0 0.5rem;
`;
