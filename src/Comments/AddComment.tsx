import React, { useState, useEffect, useContext } from 'react';
import { Input, AddCommentContainer, ButtonStyled } from './style';
import Dropdown, { DropdownUserItem } from '../Theme/Dropdown';

import { PeachContext } from '../PeachContext';
import { User } from '../api/interfaces';

interface AddCommentProps {
	onSubmit: (txt: string) => void;
	darkMode: boolean;
}

const AddComment: React.FC<AddCommentProps> = ({ onSubmit, darkMode }) => {
	const [newComment, setNewComment] = useState<string>('');
	const [isDropdownShowing, setDropdownShowing] = useState<boolean>(false);
	const [nameSuggestions, setNameSuggestions] = useState<User[]>([]);

	const { peachFeed } = useContext(PeachContext);

	useEffect(() => {
		if (newComment.slice(-1) === ' ' || newComment.slice(-1) === '@') {
			setDropdownShowing(false);
			setNameSuggestions([]);
			return;
		}

		if (newComment.slice(-2, -1) === '@') {
			setDropdownShowing(true);
		}
	}, [newComment]);

	useEffect(() => {
		if (!isDropdownShowing) return;
		const commenttxt = newComment.split(' ');
		if (commenttxt.length < 1) return;
		let handle = commenttxt[commenttxt.length - 1];
		if (handle.indexOf('@') !== 0) return;
		handle = handle.slice(1);
		setNameSuggestions(
			peachFeed
				.filter(
					user =>
						user.displayName.indexOf(handle) > -1 ||
						user.name.indexOf(handle) > -1
				)
				.slice(0, 6)
		);
	}, [isDropdownShowing, newComment, peachFeed]);

	const autofillUsername = (username: string) => {
		setNewComment(
			newComment =>
				newComment.slice(0, newComment.lastIndexOf('@') + 1) +
				username +
				' '
		);
		setDropdownShowing(false);
	};

	return (
		<AddCommentContainer darkMode={darkMode}>
			<Input
				darkMode={darkMode}
				value={newComment}
				onChange={e => setNewComment(e.target.value)}
				placeholder='Write a comment...'
			/>
			{isDropdownShowing ? (
				<Dropdown>
					{nameSuggestions.map(u => (
						<DropdownUserItem
							darkMode={darkMode}
							key={u.id}
							username={u.name}
							displayName={u.displayName}
							avatarSrc={u.avatarSrc}
							onClick={() => autofillUsername(u.name)}
						/>
					))}
				</Dropdown>
			) : null}
			<ButtonStyled
				onClick={() => {
					if (newComment.length > 0) {
						onSubmit(newComment);
						setNewComment('');
					}
				}}
			>
				Submit
			</ButtonStyled>
		</AddCommentContainer>
	);
};

export default AddComment;
