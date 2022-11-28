import { User } from '../api/interfaces';

export function sortMainFeedPosts(a: User, b: User) {
	const aLatestPostTime = a.posts[a.posts.length - 1].createdTime;
	const bLatestPostTime = b.posts[b.posts.length - 1].createdTime;

	// are there unread posts for both users?
	if (a.unreadPostCount && b.unreadPostCount) {
		// are both users favorites?
		if (a.isFavorite && b.isFavorite) {
			if (aLatestPostTime > bLatestPostTime) {
				return -1;
			} else {
				return 1;
			}
		} else if (a.isFavorite && !b.isFavorite) {
			return -1;
		} else if (!a.isFavorite && b.isFavorite) {
			return 1;
		} else {
			// users are both not favorites
			if (aLatestPostTime > bLatestPostTime) {
				return -1;
			} else {
				return 1;
			}
		}
	} else if (a.unreadPostCount && !b.unreadPostCount) {
		// only user a has unread posts
		return -1;
	} else if (!a.unreadPostCount && b.unreadPostCount) {
		// only user b has unread posts
		return 1;
	} else {
		// both users have no unread posts
		if (aLatestPostTime > bLatestPostTime) {
			return -1;
		} else {
			return 1;
		}
	}
}
