import styled from 'styled-components';

export const TextArea = styled.textarea`
	flex: 9;
	margin-right: 1rem;
	resize: none;
	border-radius: 0.5rem;
	border: 1px solid #cacaca;
	font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen,
		Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
`;

export const Label = styled.label`
	display: block;
	margin-bottom: 0.5rem;
`;
export const Input = styled.input`
	font-size: 1rem;
	border: 1px solid #cacaca;
	border-radius: 0.25rem;
	padding: 0.25rem;
`;
export const Fieldset = styled.fieldset`
	margin: 1rem 0 0.5rem;
	padding: 0;
	border: none;

	:first-of-type {
		margin: 1.5rem 0 0.5rem;
	}
`;
