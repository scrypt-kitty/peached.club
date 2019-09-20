import React, { useState, useRef, useContext } from 'react';

import Modal from '../Theme/Modal';
import Button from '../Theme/Button';

import { NewPostButton, TextArea, Header } from './style';
import Plus from './Plus.svg';

import ACTIONS from '../api/constants';
import api from '../api';
import { CreatePostResponse } from '../api/interfaces';
import { PeachContext } from '../PeachContext';

interface ComposerProps {
	onSubmit: (msg: string) => void;
	darkMode: boolean;
}

const ComposerForm = (props: ComposerProps) => {
	const postRef = useRef<HTMLTextAreaElement>(null);

	return (
		<>
			<TextArea
				darkMode={props.darkMode}
				ref={postRef}
				placeholder="What's going on?"
			/>
			<Button
				onClick={() =>
					postRef &&
					postRef.current &&
					props.onSubmit(postRef.current.value)
				}
			>
				Post
			</Button>
		</>
	);
};

const NewPost = (props: {}) => {
	const [showComposer, setShowComposer] = useState<boolean>(false);
	const { jwt, darkMode } = useContext(PeachContext);
	const outputPost = (content: string) => {
		if (content && content.length > 0) {
			content.split('\n').map(i => console.log(i));
			api(ACTIONS.createPost, jwt, {
				message: [
					{
						text: content,
						type: 'text',
					},
				],
			}).then((response: { data: CreatePostResponse }) => {
				if (response.data) {
					console.log('yay');
				} else {
					console.log('ERROR');
				}
			});
		}
	};
	return (
		<>
			{showComposer ? (
				<Modal
					darkMode={darkMode}
					onKeyDown={() => setShowComposer(false)}
				>
					<Header>Create a new post</Header>
					<ComposerForm darkMode={darkMode} onSubmit={outputPost} />
				</Modal>
			) : null}
			<NewPostButton
				onClick={() => setShowComposer(showComposer => !showComposer)}
			>
				<img src={Plus} alt='+' title='Create a new post' />
			</NewPostButton>
		</>
	);
};

export default NewPost;
