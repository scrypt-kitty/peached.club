import React from 'react';
import styled from 'styled-components';
import { rem } from 'polished';

import { MusicMessage } from '../../api/interfaces';

const IFrameStyled = styled.iframe`
	border-radius: ${rem(12)};
`;

export const MusicPost = (props: MusicMessage) => {
	if (props.spotifyData) {
		return (
			<IFrameStyled
				src={`https://open.spotify.com/embed/track/${props.spotifyData.track.id}?utm_source=generator&theme=0`}
				width='100%'
				height='152'
				frameBorder='0'
				allow='autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture'
				loading='lazy'
			/>
		);
	}

	return <p>{props.title}</p>;
};
