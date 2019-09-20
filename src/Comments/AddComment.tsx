import React, { useRef } from 'react';
import { Input, AddCommentContainer, Button } from './style';

interface AddCommentProps {
	onSubmit: (txt: string) => void;
	darkMode: boolean;
}

const AddComment: React.FC<AddCommentProps> = ({ onSubmit, darkMode }) => {
	const newCommentRef = useRef<HTMLTextAreaElement>(null);

	return (
		<AddCommentContainer darkMode={darkMode}>
			<Input
				darkMode={darkMode}
				ref={newCommentRef}
				placeholder='Write a comment...'
			/>
			<Button
				color='purple'
				onClick={() => {
					if (newCommentRef && newCommentRef.current) {
						onSubmit(newCommentRef.current.value);
						newCommentRef.current.value = '';
					}
				}}
				link='#'
			>
				Submit
			</Button>
		</AddCommentContainer>
	);
};

export default AddComment;
