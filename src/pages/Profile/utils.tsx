import React from 'react';

import { Comment } from '../../api/interfaces';

export const addNewlines = (txt: string, id: string) =>
	txt.indexOf('\n') < 0
		? txt
		: txt.split('\n').map((item, index) => (
				<span key={`${id}-${index}`}>
					{item}
					<br />
				</span>
		  ));

export const createComment = (
	commentId: string,
	commentBody: string,
	authorId: string,
	name: string,
	displayName: string
): Comment => {
	return {
		id: commentId,
		body: commentBody,
		author: {
			id: authorId,
			name,
			displayName,
			bio: '',
			isPublic: false,
			posts: [],
			unreadPostCount: 0,
			lastRead: 0,
		},
	};
};
