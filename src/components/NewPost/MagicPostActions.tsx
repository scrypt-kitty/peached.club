import React, { useState } from 'react';
import { useSpring, animated, config } from 'react-spring';
import dayjs from 'dayjs';

import { EMPTY_COMPOSER_CONTENT } from './Composer/Composer';

import { ActionButton, MagicPostActionsGroup } from './style';
import ClockIcon from '../../Theme/Icons/ClockIcon';
import CalendarIcon from '../../Theme/Icons/CalendarIcon';
import { GifPicker } from './GifPicker/GifPicker';
import { GiphyImage } from '../../api/interfaces';

export const getCurrentTime = () => {
	const now = dayjs().format('h:mm A');
	return `🕓 ${now}\n`;
};

export const getCurrentDate = () => {
	const now = dayjs().format('dddd, MMMM D, YYYY');
	return `📰 ${now}\n`;
};

type DisplayedActionInteraction = 'Oracle' | 'Gif';

const GifPickerComponent = (props: {
	onGifSelect: (selectedGif: GiphyImage) => void;
}) => {
	const [flip, set] = useState(false);

	const springProps = useSpring({
		from: { transform: 'scaleY(0.3)', opacity: 0 },
		to: { transform: 'scaleY(1)', opacity: 1 },
		delay: 100,
		config: config.wobbly,
		onRest: () => set(!flip),
	});

	return (
		<animated.div style={springProps}>
			<GifPicker onGifSelect={props.onGifSelect} />
		</animated.div>
	);
};

type MagicPostActionsProps = {
	setPostText: React.Dispatch<React.SetStateAction<string>>;
	uploadImage: (files: FileList | null, id: string) => void;
	curUserId: string | null;
	onGifSelect: (selectedGif: GiphyImage) => void;
};

export const MagicPostActions = (props: MagicPostActionsProps) => {
	const [isGifPickerShowing, setIsGifPickerShowing] = useState(false);
	const [isOracleInputShowing, setIsOracleInputShowing] = useState(false);
	const [curDisplayedInteraction, setCurDisplayedInteraction] =
		useState<DisplayedActionInteraction | null>(null);

	const switchDisplayedInteraction = (next: DisplayedActionInteraction) => {
		setCurDisplayedInteraction(cur => {
			if (!next) {
				return next;
			}

			if (next === cur) {
				return null;
			}

			return next;
		});
	};

	const addToPost = (content: string) => {
		props.setPostText(postText => {
			if (postText === EMPTY_COMPOSER_CONTENT) {
				return content;
			}
			return postText + '\n' + content;
		});
	};

	const showCurrentDate = () => {
		const date = getCurrentDate();
		props.setPostText(postText => {
			if (postText === EMPTY_COMPOSER_CONTENT) {
				return date;
			}
			return postText + '\n' + date;
		});
	};

	const showCurrentTime = () => {
		const date = getCurrentDate();
		props.setPostText(postText => {
			if (postText === EMPTY_COMPOSER_CONTENT) {
				return date;
			}
			return postText + '\n' + date;
		});
	};

	return (
		<div>
			<MagicPostActionsGroup spacing={'xs'}>
				<ActionButton>
					<ClockIcon
						onClick={() => addToPost(getCurrentTime())}
						title='Add the current time to post'
					/>
				</ActionButton>
				<ActionButton>
					<CalendarIcon
						onClick={() => addToPost(getCurrentDate())}
						title="Add today's date to post"
					/>
				</ActionButton>
			</MagicPostActionsGroup>
			{curDisplayedInteraction === 'Gif' && (
				<GifPickerComponent onGifSelect={props.onGifSelect} />
			)}
		</div>
	);
};
