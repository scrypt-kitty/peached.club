import React, { useContext, useEffect } from 'react';
import { Link as RouterLink, useLocation } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import {
	IconSettings,
	IconBell,
	IconUser,
	IconHome,
	IconArrowRight,
	IconArrowLeft,
} from '@tabler/icons';

import { PeachContext } from '../../PeachContext';
import { getUserFromStorage } from '../../utils';
import { STORAGE_TOKEN_KEY } from '../../constants';

import { NavWrap, Link, Nav, FeedsNav, PageIconWrapper } from './style';
import { Center } from '@mantine/core';

const NavIconProps = {
	stroke: 1.75,
	size: 25,
};

const Navigation = () => {
	const { curUser, curUserData, peachFeed, jwt } = useContext(PeachContext);
	const { pathname } = useLocation();
	const navigate = useNavigate();

	let feedListIDs: string[] = [];

	let showRightArrow = false;
	let showLeftArrow = false;
	let nextUser = '';
	let prevUser = '';

	useEffect(() => {
		if (!curUser || !jwt || !curUserData.id) {
			const storedCurUser = getUserFromStorage();
			const storedJwt = localStorage.getItem(STORAGE_TOKEN_KEY);

			if (!storedCurUser || !storedJwt) {
				navigate('/login', { replace: true });
				return;
			}
		}
	}, [curUser, jwt, curUserData.id]);

	let onCurUsersProfile = false;
	if (!curUser) {
		navigate('/login', { replace: true });
	} else {
		onCurUsersProfile = pathname === `/friend/${curUser.id}`;
	}

	const curFeed = pathname.split('/friend/')[1] ?? null;

	if (curFeed && !onCurUsersProfile) {
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
		<>
			{curFeed && !onCurUsersProfile ? (
				<>
					{showLeftArrow ? (
						<RouterLink to={`/friend/${prevUser}`} title='Previous feed'>
							<FeedsNav>
								<Center>
									<IconArrowLeft {...NavIconProps} />
								</Center>
							</FeedsNav>
						</RouterLink>
					) : null}
					{showRightArrow ? (
						<RouterLink to={`/friend/${nextUser}`} title='Next feed'>
							<FeedsNav right>
								<Center>
									<IconArrowRight {...NavIconProps} />
								</Center>
							</FeedsNav>
						</RouterLink>
					) : null}
				</>
			) : null}

			<NavWrap>
				<Nav>
					<Link>
						<RouterLink to='/feed' title='Home'>
							<PageIconWrapper isActive={pathname.includes('feed') ?? false}>
								<IconHome {...NavIconProps} />
							</PageIconWrapper>
						</RouterLink>
					</Link>
					<Link>
						<RouterLink
							to={`/friend/${curUser ? curUser.id : ''}`}
							title='Your feed'
						>
							<PageIconWrapper isActive={onCurUsersProfile}>
								<IconUser {...NavIconProps} />
							</PageIconWrapper>
						</RouterLink>
					</Link>
					<Link>
						<RouterLink to='/activity' title='Activity'>
							<PageIconWrapper
								isActive={pathname.includes('activity') ?? false}
							>
								<IconBell {...NavIconProps} />
							</PageIconWrapper>
						</RouterLink>
					</Link>
					<Link>
						<RouterLink to='/settings' title='Settings'>
							<PageIconWrapper
								isActive={pathname.includes('settings') ?? false}
							>
								<IconSettings {...NavIconProps} />
							</PageIconWrapper>
						</RouterLink>
					</Link>
				</Nav>
			</NavWrap>
		</>
	);
};

export default Navigation;
