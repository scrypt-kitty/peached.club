import React, { useState } from 'react';
import { Login } from './Login';
import { Logout } from './Login/Logout';
import { Feed } from './Feed';
import { FriendFeed } from './Friend';
import { Activity } from './Activity';
import Settings from './Settings';

import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';
import { GlobalStyle } from './style';
import { PeachContext } from './PeachContext';
import { LoginStream, User, CurUser, DummyCurUser } from './api/interfaces';
import { ThemeProvider } from 'styled-components';
import { darkTheme, lightTheme } from './Theme/theme';

function getUserFromStorage() {
	const user = localStorage.getItem('user');
	if (user) {
		return JSON.parse(user);
	} else {
		return null;
	}
}

const App: React.FC = () => {
	const [newJwt, setNewJwt] = useState<string>(
		localStorage.getItem('peachedToken') || ''
	);

	const [peachFeed, setPeachFeed] = useState<User[]>([]);
	const [curUser, setCurUser] = useState<LoginStream | null>(
		getUserFromStorage()
	);
	const [curFeedIndex, setCurFeedIndex] = useState<number>(0);
	const [darkMode, setDarkMode] = useState<boolean>(
		localStorage.getItem('peachedDarkMode') === 'true'
	);
	const [curUserData, setCurUserData] = useState<CurUser>(DummyCurUser);

	const updateJwt = (newJwt: string) => {
		setNewJwt(newJwt);
	};

	const updatePeachFeed = (newPeachFeed: User[]) => {
		setPeachFeed(newPeachFeed);
	};

	const updateCurUser = (newUser: LoginStream) => {
		setCurUser(newUser);
	};

	const updateCurFeedIndex = (newIndex: number) => {
		if (!peachFeed) {
			setCurFeedIndex(0);
			return;
		}
		setCurFeedIndex(curFeedIndex => {
			const allFeedIds = Object.keys(peachFeed);
			if (curFeedIndex + 1 === allFeedIds.length) {
				return -1;
			} else {
				return curFeedIndex + 1;
			}
		});
	};

	const toggleDarkMode = () => {
		setDarkMode(darkMode => {
			if (darkMode) localStorage.setItem('peachedDarkMode', 'false');
			else localStorage.setItem('peachedDarkMode', 'true');
			return !darkMode;
		});
	};

	return (
		<BrowserRouter>
			<PeachContext.Provider
				value={{
					jwt: newJwt,
					setJwt: updateJwt,
					peachFeed: peachFeed,
					setPeachFeed: updatePeachFeed,
					curUser: curUser,
					setCurUser: updateCurUser,
					curFeedIndex: curFeedIndex,
					setCurFeedIndex: updateCurFeedIndex,
					darkMode: darkMode,
					toggleDarkMode: toggleDarkMode,
					curUserData: curUserData,
					setCurUserData: setCurUserData,
				}}
			>
				<ThemeProvider theme={darkMode ? darkTheme : lightTheme}>
					<GlobalStyle darkMode={darkMode} />
					<Routes>
						<Route path='/' element={<Feed />} />
						<Route path='/login' element={<Login />} />
						<Route path='/feed' element={<Feed />} />
						<Route path='/friend'>
							<Route path=':id' element={<FriendFeed />} />
						</Route>
						<Route path='/activity' element={<Activity />} />
						<Route path='/settings' element={<Settings />} />
						<Route path='/logout' element={<Logout />} />
					</Routes>
				</ThemeProvider>
			</PeachContext.Provider>
		</BrowserRouter>
	);
};

export default App;
