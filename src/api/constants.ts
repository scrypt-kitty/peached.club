const PROXY = 'https://cors-anywhere.herokuapp.com/';
export const LOGIN = PROXY + 'https://v1.peachapi.com/login';
export const LIKE = PROXY + 'https://v1.peachapi.com/like';
export const UNLIKE = (id: string) =>
	`${PROXY}https://v1.peachapi.com/like/postID/${id}`;
export const CONNECTIONS = PROXY + 'https://v1.peachapi.com/connections';
export const CONNECTION_STREAM = (id: string) =>
	`${PROXY}https://v1.peachapi.com/stream/id/${id}`;
export const COMMENT = PROXY + 'https://v1.peachapi.com/comment';
export const DELETE_COMMENT = (id: string) =>
	`${PROXY}https://v1.peachapi.com/comment/${id}`;
export const DELETE_POST = (id: string) =>
	`${PROXY}https://v1.peachapi.com/post/${id}`;
export const CREATE_POST = PROXY + 'https://v1.peachapi.com/post';
export const MARK_FEED_READ = (id: string) =>
	`${PROXY}https://v1.peachapi.com/stream/id/${id}/read`;
export const ACTIVITY_FEED = PROXY + 'https://v1.peachapi.com/activity';
export const FRIENDS_OF_FRIENDS = (username: string) =>
	`${PROXY}https://v1.peachapi.com/stream/n/${username}/connections`;

enum ACTIONS {
	login,
	like,
	unlike,
	connections,
	connectionStream,
	comment,
	deleteComment,
	deletePost,
	createPost,
	markFeedRead,
	getActivityFeed,
	getFriendsOfFriends,
}

export default ACTIONS;
