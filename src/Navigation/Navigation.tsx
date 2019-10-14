import React, { useContext } from 'react';

import { Link as RouterLink } from 'react-router-dom';

import { PeachContext } from '../PeachContext';
import { NavWrap, Link, FeedControls, AppLinks, Nav, IconImage } from './style';
import ArrowLeft from './ArrowLeft.svg';
import ArrowRight from './ArrowRight.svg';
import ActivityIcon from './Activity.svg';
import ArrowLeftDarkMode from './ArrowLeftDarkMode.svg';
import ArrowRightDarkMode from './ArrowRightDarkMode.svg';
import ActivityIconDarkMode from './ActivityDarkMode.svg';
import NightModeDark from './NightModeDark.svg';
import NightModeLight from './NightModeLight.svg';
import SettingsIcon from './SettingsIcon.svg';
import SettingsIconDarkMode from './SettingsIconDarkMode.svg';
import UserIcon from './UserIcon.svg';
import UserIconDarkMode from './UserIconDarkMode.svg';
import HomeIcon from './HomeIcon.svg';
import HomeIconDarkMode from './HomeIconDarkMode.svg';

interface NavigationProps {
	curFeed?: string;
}

const Navigation: React.FC<NavigationProps> = ({ curFeed }) => {
	const { darkMode, curUser, toggleDarkMode, peachFeed } = useContext(
		PeachContext
	);
	let feedListIDs: string[] = [];

	let showRightArrow = false;
	let showLeftArrow = false;
	let nextUser = '';
	let prevUser = '';

	if (curFeed) {
		feedListIDs = peachFeed
			.filter(user => user.unreadPostCount > 0)
			.map(user => user.id);
		const curFeedIndex = feedListIDs.indexOf(curFeed);
		if (curFeedIndex > 0) {
			showLeftArrow = true;
			prevUser = feedListIDs[curFeedIndex - 1];
		}

		if (curFeedIndex < feedListIDs.length - 1) {
			showRightArrow = true;
			nextUser = feedListIDs[curFeedIndex + 1];
		}
	}

	return (
		<NavWrap darkMode={darkMode}>
			<Nav>
				<AppLinks>
					<Link>
						<RouterLink to='/feed'>
							<img
								src={darkMode ? HomeIconDarkMode : HomeIcon}
								alt='Home'
							/>
						</RouterLink>
					</Link>
					<Link>
						<RouterLink to={`/friend/${curUser ? curUser.id : ''}`}>
							<img
								src={darkMode ? UserIconDarkMode : UserIcon}
								alt='Me'
							/>
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
					<Link>
						<RouterLink to='/settings'>
							<img
								src={
									darkMode
										? SettingsIconDarkMode
										: SettingsIcon
								}
								alt='Go to settings'
							/>
						</RouterLink>
					</Link>
				</AppLinks>
				{curFeed ? (
					<FeedControls>
						{showLeftArrow ? (
							<Link>
								<RouterLink to={`/friend/${prevUser}`}>
									<IconImage
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
								<RouterLink to={`/friend/${nextUser}`}>
									<IconImage
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
