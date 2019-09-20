import React, { useContext } from 'react';

import { Link as RouterLink } from 'react-router-dom';

import { PeachContext } from '../PeachContext';
import { PeachFeed } from '../api/interfaces';
import { NavWrap, Link, FeedControls, AppLinks, Nav } from './style';
import ArrowLeft from './ArrowLeft.svg';
import ArrowRight from './ArrowRight.svg';
import ActivityIcon from './Activity.svg';
import ArrowLeftDarkMode from './ArrowLeftDarkMode.svg';
import ArrowRightDarkMode from './ArrowRightDarkMode.svg';
import ActivityIconDarkMode from './ActivityDarkMode.svg';
import NightModeDark from './NightModeDark.svg';
import NightModeLight from './NightModeLight.svg';

const Navigation = (props: {
	curFeed?: string;
	peachFeed?: PeachFeed | null;
}) => {
	const { darkMode, curUser, toggleDarkMode } = useContext(PeachContext);
	const peachFeedIds = props.peachFeed ? Object.keys(props.peachFeed) : [];
	const curFeedIndex = props.curFeed
		? peachFeedIds.indexOf(props.curFeed)
		: -1;

	const showRightArrow =
		curFeedIndex < peachFeedIds.length - 1 && peachFeedIds.length > 0;
	const showLeftArrow = curFeedIndex > 0 && peachFeedIds.length > 0;

	return (
		<NavWrap darkMode={darkMode}>
			<Nav>
				<AppLinks>
					<Link>
						<a href='/feed' title='Feed'>
							Feeds
						</a>
					</Link>
					<Link>
						<RouterLink to={`/friend/${curUser ? curUser.id : ''}`}>
							Me
						</RouterLink>
					</Link>
					<Link>
						<RouterLink to='/activity'>
							<img
								src={
									darkMode
										? ActivityIconDarkMode
										: ActivityIcon
								}
								alt='Activity'
							/>
						</RouterLink>
					</Link>
					<Link onClick={() => toggleDarkMode()}>
						<img
							src={darkMode ? NightModeDark : NightModeLight}
							alt='Toggle dark mode'
						/>
					</Link>
				</AppLinks>
				{props.curFeed && curFeedIndex !== -1 ? (
					<FeedControls>
						{showLeftArrow ? (
							<Link>
								<RouterLink
									to={`/friend/${
										peachFeedIds[curFeedIndex - 1]
									}`}
								>
									<img
										src={
											darkMode
												? ArrowLeftDarkMode
												: ArrowLeft
										}
										alt='Prev feed'
									/>
								</RouterLink>
							</Link>
						) : null}
						{showRightArrow ? (
							<Link>
								<RouterLink
									to={`/friend/${
										peachFeedIds[curFeedIndex + 1]
									}`}
								>
									<img
										src={
											darkMode
												? ArrowRightDarkMode
												: ArrowRight
										}
										alt='Next feed'
									/>
								</RouterLink>
							</Link>
						) : null}
					</FeedControls>
				) : null}
			</Nav>
		</NavWrap>
	);
};

export default Navigation;
