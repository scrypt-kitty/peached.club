import { text } from 'stream/consumers';
import {
	ActivityItem,
	NOTIFICATION_TYPE,
	Post,
	POST_TYPE,
	CommentNotification,
	MentionNotification,
	isImage,
	LikeNotification,
	isText,
} from '../../api/interfaces';

function shortenPost(text: string): string {
	return text.length > 300 ? text.slice(0, 300) + '...' : text;
}

function getPostPreviewMessage(postMessage: Post['message']): string {
	const message = postMessage[0];
	switch (message.type) {
		case POST_TYPE.TEXT:
			return shortenPost(message.text);
		case POST_TYPE.IMAGE:
			return 'Image';
		case POST_TYPE.LINK:
			return 'Link';
		case POST_TYPE.LOCATION:
			return 'Location';
		default:
			return '';
	}
}

export function getActivityPreviewMessage(item: ActivityItem): string {
	switch (item.type) {
		case NOTIFICATION_TYPE.COMMENT:
		case NOTIFICATION_TYPE.MENTION:
			return item.body.commentBody;
		case NOTIFICATION_TYPE.LIKE:
			return getPostPreviewMessage(item.body.postMessage);
		default:
			return '';
	}
}

export function getActivityDescription(item: ActivityItem): string {
	switch (item.type) {
		case NOTIFICATION_TYPE.COMMENT:
			return 'left a comment';
		case NOTIFICATION_TYPE.MENTION:
			return 'mentioned you in a comment';
		case NOTIFICATION_TYPE.LIKE:
			return 'liked your post';
		default:
			return '';
	}
}

export function getTextPreview(
	notif: CommentNotification | MentionNotification | LikeNotification
): string | null {
	const message = notif.body.postMessage[0];
	if (isImage(message)) {
		return 'Image post';
	} else if (isText(message)) {
		return message.text.slice(0, 100).trimEnd() + '...';
	}

	return null;
}
