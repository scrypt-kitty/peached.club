import {
	TextMessage,
	ImageMessage,
	LinkMessage,
	isText,
	isImage,
} from './api/interfaces';

export const createPostPreview = (
	post: TextMessage | ImageMessage | LinkMessage
) => {
	if (isText(post) && post.text) {
		if (post.text.length > 300) {
			return post.text.slice(0, 300) + '...';
		} else {
			return post.text;
		}
	} else if (isImage(post)) return 'Image post';
	else return 'Link post';
};
