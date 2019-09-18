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
}

export default ACTIONS;
