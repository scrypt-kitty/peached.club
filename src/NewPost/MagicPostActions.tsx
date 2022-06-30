import React from 'react';
import { ImageUploadButton, MagicPostActionsContainer } from './style';

import ImageIcon from './ImageIcon';
import ClockIconDarkMode from './ClockIconDarkMode.svg';
import ClockIcon from './ClockIcon.svg';
import CalendarIcon from './CalendarIcon.svg';
import CalendarIconDarkMode from './CalendarIconDarkMode.svg';

export const getCurrentTime = (currentPostLen: number) => {
	const d = new Date();
	const [time, hour = ''] = d.toLocaleTimeString().split(' ');
	// remove the milliseconds part of the time string
	return `${currentPostLen ? '\n' : ''}🕓 ${time.slice(0, -3)} ${hour}\n`;
};

export const getCurrentDate = (currentPostLen: number) => {
	const d = new Date();
	return `${currentPostLen ? '\n' : ''}📰 ${d.toDateString()}\n`;
};

type MagicPostActionsProps = {
	setPostText: React.Dispatch<React.SetStateAction<string>>;
	uploadImage: (files: FileList | null, id: string) => void;
	curUserId: string | null;
};

export const MagicPostActions = (props: MagicPostActionsProps) => {
	const darkMode = true;
	return (
		<MagicPostActionsContainer>
			<ImageUploadButton>
				<ImageIcon />
				<input
					type='file'
					accept='image*'
					onChange={e =>
						props.curUserId
							? props.uploadImage(e.target.files, props.curUserId)
							: null
					}
				/>
			</ImageUploadButton>
			<ImageUploadButton>
				<img
					onClick={() =>
						props.setPostText(
							postText =>
								postText + getCurrentTime(postText.length)
						)
					}
					src={darkMode ? ClockIconDarkMode : ClockIcon}
					alt='Add current time'
				/>
			</ImageUploadButton>
			<ImageUploadButton>
				<img
					onClick={() =>
						props.setPostText(
							postText =>
								postText + getCurrentDate(postText.length)
						)
					}
					src={darkMode ? CalendarIconDarkMode : CalendarIcon}
					alt='Add current date'
				/>
			</ImageUploadButton>
		</MagicPostActionsContainer>
	);
};
