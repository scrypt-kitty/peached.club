import styled from 'styled-components';
import { FeedPostWrapper } from '../Feed/style';

export const FeedPostWrapperStyled = styled(FeedPostWrapper)`
	padding-bottom: 0;
	:last-child {
		padding-bottom: 2rem;
	}
`;

export const Title = styled.h1<{ darkMode: boolean }>`
	color: ${props => (props.darkMode ? 'white' : 'black')};
`;

export const PostPreview = styled.p`
	color: #a8a8a8;
`;

export const DisplayName = styled.h3`
	> a {
		color: unset;
		text-decoration: none;
		:visited {
			color: unset;
			text-decoration: none;
		}
		:hover {
			color: unset;
			text-decoration: none;
		}
	}
`;
