import React, { useState, useRef, useContext } from 'react';

import Modal from '../Theme/Modal';
import Button from '../Theme/Button';
import Toasty from '../Theme/Toasty';

import { NewPostButton, TextArea, Header } from './style';
import Plus from './Plus.svg';

import ACTIONS from '../api/constants';
import api from '../api';
import { CreatePostResponse } from '../api/interfaces';
import { PeachContext } from '../PeachContext';

interface ComposerProps {
	onSubmit: (msg: string) => void;
	darkMode: boolean;
	toggleComposer: () => void;
}

const ComposerForm: React.FC<ComposerProps> = ({
	onSubmit,
	darkMode,
	toggleComposer,
}) => {
	const postRef = useRef<HTMLTextAreaElement>(null);

	return (
		<Modal darkMode={darkMode} onKeyDown={() => toggleComposer()}>
			<Header darkMode={darkMode}>Create a new post</Header>
			<TextArea
				darkMode={darkMode}
				ref={postRef}
				placeholder="What's going on?"
			/>
			<Button
				onClick={() =>
					postRef &&
					postRef.current &&
					onSubmit(postRef.current.value)
				}
			>
				Post
			</Button>
		</Modal>
	);
};

const NewPost = (props: {}) => {
	const [showComposer, setShowComposer] = useState<boolean>(false);
	const [submitted, setSubmitted] = useState<boolean>(false);
	const [showToasty, setShowToasty] = useState<boolean>(false);
	const [postSuccess, setPostSuccess] = useState<boolean>(false);
	const [posting, setPosting] = useState<boolean>(false);
	const { jwt, darkMode } = useContext(PeachContext);
	const outputPost = (content: string) => {
		if (content && content.length > 0) {
			setSubmitted(true);
			setShowToasty(true);
			setPosting(true);
			api(ACTIONS.createPost, jwt, {
				message: [
					{
						text: content,
						type: 'text',
					},
				],
			}).then(
				(response: { data: CreatePostResponse; success: number }) => {
					setPosting(false);
					if (response.success === 1) {
						setPostSuccess(true);
					} else {
						setPostSuccess(false);
					}
					setTimeout(() => {
						setSubmitted(false);
						setShowToasty(false);
						setPosting(false);
					}, 2000);
				}
			);
		}
	};

	return (
		<>
			{showComposer ? (
				<>
					<ComposerForm
						darkMode={darkMode}
						onSubmit={outputPost}
						toggleComposer={() => setShowComposer(false)}
					/>
					{submitted && showToasty ? (
						<Toasty onClick={() => setShowToasty(false)}>
							{postSuccess
								? 'Successfully created post!'
								: posting
								? 'Posting...'
								: "Couldn't submit post. Please try again later."}
						</Toasty>
					) : null}
				</>
			) : (
				<NewPostButton
					onClick={() =>
						setShowComposer(showComposer => !showComposer)
					}
				>
					<img src={Plus} alt='+' title='Create a new post' />
				</NewPostButton>
			)}
		</>
	);
};

export default NewPost;
