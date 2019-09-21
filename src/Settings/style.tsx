import styled from 'styled-components';

export const Input = styled.input`
	font-size: 1rem;
	border: 1px solid #cacaca;
	border-radius: 0.25rem;
	padding: 0.25rem;
`;

export const SettingsWrapper = styled.div<{ darkMode: boolean }>`
	background: ${props => (props.darkMode ? '#262628' : 'white')};
	color: ${props => (props.darkMode ? 'white' : 'black')};
	padding: 2rem 2.5rem;
	height: 100%;
	word-wrap: break-word;
	margin: 1rem;
	@media screen and (max-width: 700px) {
		padding: 1rem 1.25rem;
		margin: 0.5rem;
		border-radius: 0.25rem;
	}
`;

export const SettingContainer = styled.div`
	margin-bottom: 1rem;
`;
