import React from 'react';

type Props = {
	width: number;
	src: string;
};

export const VideoPost = (props: Props) => {
	return (
		<video width={props.width} controls>
			<source src={props.src} type='video/mp4' />{' '}
		</video>
	);
};
