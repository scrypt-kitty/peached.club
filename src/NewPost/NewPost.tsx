import React, { useState, useRef, useContext } from 'react';

import Modal from '../Theme/Modal';
import Button from '../Theme/Button';
import Toasty from '../Theme/Toasty';

import {
	NewPostButton,
	TextArea,
	Header,
	ImagesHolder,
	Image,
	UploadedImage,
	DeleteImage,
	ImageUploadButton,
	MagicPostActionsContainer,
} from './style';
import Plus from './Plus.svg';
import ImageIcon from './ImageIcon.svg';
import ImageIconDarkMode from './ImageIconDarkMode.svg';
import ClockIconDarkMode from './ClockIconDarkMode.svg';
import ClockIcon from './ClockIcon.svg';
import CalendarIcon from './CalendarIcon.svg';
import CalendarIconDarkMode from './CalendarIconDarkMode.svg';
import DeleteIcon from '../Comments/DeleteIcon.svg';

import { getCurrentTime, getCurrentDate } from './MagicPostActions';

import ACTIONS, { IMGUR_ID } from '../api/constants';
import api from '../api';
import {
	CreatePostResponse,
	ImgurUploadResponse,
	ImageMessage,
	TextMessage,
	isImage,
} from '../api/interfaces';
import { PeachContext } from '../PeachContext';

interface ComposerProps {
	onSubmit: (messages: (TextMessage | ImageMessage)[]) => void;
	darkMode: boolean;
	toggleComposer: () => void;
}

const ComposerForm: React.FC<ComposerProps> = ({
	onSubmit,
	darkMode,
	toggleComposer,
}) => {
	const postRef = useRef<HTMLTextAreaElement>(null);
	const [postText, setPostText] = useState<string>('');
	const { curUser } = useContext(PeachContext);
	const [images, setImages] = useState<(ImageMessage | TextMessage)[]>([]);

	const uploadImage = async (files: FileList | null, id: string) => {
		if (files === null || files.length < 1) return;
		const file = files[0];
		const formData = new FormData();
		formData.append('image', file);
		formData.append('type', 'file');
		const req = {
			method: 'POST',
			headers: {
				Authorization: 'Client-ID ' + IMGUR_ID,
				Accept: 'application/json',
			},
			body: formData,
		};

		await fetch(
			'https://cors-anywhere.herokuapp.com/https://api.imgur.com/3/image',
			req
		)
			.then(resp => resp.json())
			.then((resp: ImgurUploadResponse) => {
				if (!resp.success) {
					console.log('oh no');
					return;
				}
				setImages(images =>
					images.concat([
						{
							type: 'image',
							src: resp.data.link,
							height: resp.data.height,
							width: resp.data.width,
						},
					])
				);
			});
	};

	return (
		<Modal darkMode={darkMode} onKeyDown={() => toggleComposer()}>
			<Header darkMode={darkMode}>Create a new post</Header>
			<TextArea
				darkMode={darkMode}
				ref={postRef}
				placeholder="What's going on?"
				onChange={e => setPostText(e.target.value)}
				value={postText}
			/>

			<MagicPostActionsContainer>
				<ImageUploadButton>
					<img
						src={darkMode ? ImageIconDarkMode : ImageIcon}
						alt='Upload'
					/>
					<input
						type='file'
						accept='image*'
						onChange={e =>
							curUser
								? uploadImage(e.target.files, curUser.id)
								: null
						}
					/>
				</ImageUploadButton>
				<ImageUploadButton>
					<img
						onClick={() =>
							setPostText(postText => postText + getCurrentTime())
						}
						src={darkMode ? ClockIconDarkMode : ClockIcon}
						alt='Add current time'
					/>
				</ImageUploadButton>
				<ImageUploadButton>
					<img
						onClick={() =>
							setPostText(postText => postText + getCurrentDate())
						}
						src={darkMode ? CalendarIconDarkMode : CalendarIcon}
						alt='Add current date'
					/>
				</ImageUploadButton>
			</MagicPostActionsContainer>

			{images.length > 0 ? (
				<ImagesHolder>
					{images.map(
						img =>
							isImage(img) && (
								<Image key={img.src}>
									<DeleteImage
										src={DeleteIcon}
										alt='Delete picture'
										onClick={() =>
											setImages(images =>
												images.filter(
													i =>
														isImage(i) &&
														i.src !== img.src
												)
											)
										}
									/>
									<UploadedImage
										src={img.src}
										alt={img.src}
									/>
								</Image>
							)
					)}
				</ImagesHolder>
			) : null}

			<Button
				disabled={images.length < 1 && postText.length < 1}
				onClick={() =>
					onSubmit(
						postText.length > 0
							? ([
									{
										type: 'text',
										text: postText,
									},
							  ] as ((ImageMessage | TextMessage)[])).concat(
									images
							  )
							: images
					)
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

	const submitPost = (messages: (TextMessage | ImageMessage)[]) => {
		if (messages.length < 1) return;

		setSubmitted(true);
		setShowToasty(true);
		setPosting(true);
		api(ACTIONS.createPost, jwt, {
			message: messages,
		}).then((response: { data: CreatePostResponse; success: number }) => {
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
		});
	};

	return (
		<>
			{showComposer ? (
				<>
					<ComposerForm
						darkMode={darkMode}
						onSubmit={submitPost}
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
