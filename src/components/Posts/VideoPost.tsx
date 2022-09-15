import React from 'react';
import styled from 'styled-components';

const Video = styled.video`
	max-width: 100%;
`;

type Props = {
	width: number;
	src: string;
};

export const VideoPost = (props: Props) => {
	return (
		<Video width={props.width} controls>
			<source src={props.src} type='video/mp4' />
		</Video>
	);
};
