interface ResponseError {
	Code: number;
	Message: string;
}
/**
 * POSTS
 */

export interface Message {
	type: string;
}

export interface TextMessage extends Message {
	text?: string;
}

export interface ImageMessage extends Message {
	height?: number;
	src?: string;
	width?: number;
}

export interface LinkMessage extends Message {
	description?: string;
	imageURL?: string;
	title?: string;
	url?: string;
}

/*eslint-disable */
export function isLink(object: any): object is LinkMessage {
	return 'imageURL' in object;
}
export function isText(object: any): object is TextMessage {
	return 'text' in object;
}
export function isImage(object: any): object is ImageMessage {
	return 'src' in object;
}
/*eslint-enable*/

export interface LikePostResponse {
	data?: {
		id: string;
		authorStreamID: string;
		postID: string;
	};
	error?: ResponseError;
	success: number;
}

export interface CommentResponse {
	id: string;
	authorStreamID: string;
	postID: string;
	body: string;
	author: {
		bio: string;
		isPublic: boolean;
		posts: any;
		unreadPostCount: number;
		lastRead: number;
	};
	success: number;
}

export interface Comment {
	id: string;
	body: string;
	author: {
		id: string;
		name: string;
		displayName: string;
		bio: string;
		isPublic: boolean;
		posts: any;
		unreadPostCount: number;
		lastRead: number;
	};
}

export interface DeleteCommentResponse {
	success: number;
}

export interface Post {
	id: string;
	message: (TextMessage & ImageMessage & LinkMessage)[];
	commentCount: number;
	likeCount: number;
	likedByMe: boolean;
	isUnread: boolean;
	createdTime: number;
	updatedTime: number;
	comments?: Comment[];
}

// unlike
export interface UnlikeResponse {
	success: number;
}

/**
 * LOGIN
 */

export interface LoginStream {
	id: string;
	token: string; // for viewing streams
}

export interface LoginResponse {
	data?: {
		token: string; // jwt
		streams: [
			{
				id: string;
				token: string; // for viewing streams
			}
		];
	};
	success: number;
	error?: ResponseError;
}

/**
 * STREAM
 */

export interface CurUser {
	id: string;
	name: string;
	displayName: string;
	avatarSrc: string;
	bio: string;
	isPublic: boolean;
	friendsSharing: boolean;
}

export interface User extends CurUser {
	youFollow: boolean;
	followsYou: boolean;
	posts: Post[];
	unreadPostCount: number;
	lastRead: number;
	lastOnline: number;
	isFavorite: boolean;
}

export interface Connections {
	connections: User[];
	requesterStream: CurUser;
}

/**
 * list of users
 * (this isn't actually from the api)
 */

export interface PeachFeed {
	[name: string]: User;
}

export interface CreatePostResponse {
	id: string;
	message: (TextMessage | LinkMessage | ImageMessage)[];
	commentCount: number;
	likeCount: number;
	likedByMe: boolean;
	isUnread: boolean;
	success: number;
}

export interface ActivityItem {
	type: 'comment' | 'like';
	body: {
		authorStream: {
			id: string;
			name: string;
			displayName: string;
			avatarSrc: string;
			bio: string;
			isPublic: boolean;
			unreadPostCount: number;
			lastRead: number;
		};
		postID: string;
		postMessage: Post['message'];
		commentBody?: string;
	};

	isUnread: boolean;
	createdTime: number;
}

export interface ActivityResponse {
	streamID: string;
	activityItems: ActivityItem[];
	unreadActivityItemCount: number;
	lastRead: number;
}

export interface MutualFriend extends CurUser {
	youFollow: boolean;
	followsYou: boolean;
	lastRead: number;
}

export interface FriendsOfFriendsResponse {
	connections: MutualFriend[];
}

export interface NameChangeResponse {
	success: number;
	error?: {
		Code: number;
		Message: string;
	};
}

/*
 * IMGUR API
 */

export interface ImgurUploadResponse {
	data: {
		id: string;
		title: string | null;
		description: string | null;
		datetime: number;
		type: string;
		animated: boolean;
		width: number;
		height: number;
		size: number;
		views: number;
		bandwidth: number;
		vote: null;
		favorite: boolean;
		nsfw: null;
		section: string | null;
		account_url: string | null;
		account_id: number;
		is_ad: boolean;
		in_most_viral: boolean;
		tags: string[];
		ad_type: number;
		ad_url: string;
		in_gallery: boolean;
		deletehash: string;
		name: string;
		link: string;
	};
	success: boolean;
	status: 200;
}
