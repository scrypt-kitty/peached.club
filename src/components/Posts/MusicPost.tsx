import React from 'react';
import styled from 'styled-components';
import { rem } from 'polished';

const IFrameStyled = styled.iframe`
	border-radius: ${rem(12)};
`;

type Props = {
	trackId: string;
};

export const MusicPost = (props: Props) => {
	return (
		<IFrameStyled
			src={`https://open.spotify.com/embed/track/${props.trackId}?utm_source=generator&theme=0`}
			width='100%'
			height='152'
			frameBorder='0'
			allow='autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture'
			loading='lazy'
		/>
	);
};
