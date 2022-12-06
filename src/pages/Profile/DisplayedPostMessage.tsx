import React from 'react';
import Linkify from 'linkify-react';

import { PostContent, POST_TYPE } from '../../api/interfaces';
import { LINKIFY_OPTIONS } from '../../constants';
import { addNewlines } from './utils';
import { httpTize } from '../../utils/httpTize';

import { Image } from './style';

import LocationPost from '../../components/Posts/LocationPost';
import LinkPost from '../../components/Posts/LinkPost';
import { MusicPost } from '../../components/Posts/MusicPost';
import { VideoPost } from '../../components/Posts/VideoPost';

type DisplayedPostProps = {
	obj: PostContent;
	id: string;
	index: number;
};

export const DisplayedPostMessage = ({
	obj,
	id,
	index,
}: DisplayedPostProps) => {
	switch (obj.type) {
		case POST_TYPE.TEXT:
			return (
				<p key={`${id}-txt-${index}`}>
					<Linkify tagName='span' options={LINKIFY_OPTIONS}>
						{addNewlines(obj.text, id)}
					</Linkify>
				</p>
			);
		case POST_TYPE.IMAGE:
			return (
				<Image
					key={`${id}-img-${index}`}
					src={httpTize(obj.src)}
					alt={`image for post ${id}`}
					loading='lazy'
				/>
			);
		case POST_TYPE.GIF:
			return (
				<Image
					key={`${id}-gif-${index}`}
					src={httpTize(obj.src)}
					alt={`GIF`}
					loading='lazy'
				/>
			);
		case POST_TYPE.LINK:
			// @ts-ignore
			return <LinkPost key={`${id}-link-${index}`} {...obj} />;

		case POST_TYPE.VIDEO:
			return (
				<VideoPost
					key={`${id}-vid-${index}`}
					src={httpTize(obj.src)}
					width={obj.width}
				/>
			);

		case POST_TYPE.LOCATION:
			// @ts-ignore
			return <LocationPost key={`${id}-loc-${index}`} {...obj} />;

		case POST_TYPE.MUSIC:
			return <MusicPost key={`${id}-music-${index}`} {...obj} />;

		default:
			return null;
	}
};
