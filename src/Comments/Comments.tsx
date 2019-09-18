import React, { useState, useEffect, useContext } from 'react';
import { Comment as CommentType, User } from '../api/interfaces';
import { PeachContext } from '../PeachContext';

import AddComment from './AddComment';
// import { Modal, Comment, AllComments } from './style';
import { Comment, AllComments } from './style';
import Modal from '../Theme/Modal';

interface CommentsProps {
	comments?: CommentType[];
	onDismissComments: () => void;
	deleteComment: (id: string) => void;
	updateComments: (txt: string) => void;
	requester: User;
}

const Comments: React.FC<CommentsProps> = ({
	comments = [],
	onDismissComments,
	updateComments,
	requester,
	deleteComment,
}) => {
	const [processedComments, setProcessedComments] = useState<{
		[id: string]: string;
	}>({});
	const [commentsLoading, setCommentsLoading] = useState<boolean>(true);
	const peachContext = useContext(PeachContext);

	useEffect(() => {
		const getAvatars = async () => {
			if (comments.length === 0) {
				setCommentsLoading(false);
				return;
			}
			const newComments: {
				[id: string]: string;
			} = {};
			if (peachContext.peachFeed) {
				const users = peachContext.peachFeed;
				comments.map(c => {
					if (!newComments[c.author.id]) {
						if (users[c.author.id]) {
							newComments[c.author.id] =
								users[c.author.id].avatarSrc;
						} else {
							newComments[c.author.id] =
								'https://i.imgur.com/J9tsyuW.png';
						}
					}
				});
			} else {
				comments.map(
					(c: CommentType) =>
						(newComments[c.author.id] =
							'https://i.imgur.com/iIq3l6X.png')
				);
			}
			setProcessedComments(newComments);
			setCommentsLoading(false);
		};
		getAvatars();
	}, [peachContext.peachFeed, comments]);

	return (
		<Modal onKeyDown={onDismissComments}>
			<>
				<AllComments>
					{commentsLoading
						? 'loadin'
						: comments.map(c => (
								<Comment
									isRequester={
										requester !== null &&
										c.author.id === requester.id
									}
									key={c.id}
									avatarSrc={processedComments[c.author.id]}
									{...c}
									deleteComment={deleteComment}
								/>
						  ))}
				</AllComments>
				<AddComment onSubmit={updateComments} />
			</>
		</Modal>
	);
};

export default Comments;
