import React, { useState } from 'react';
import Loading from './Loading';
import Login from './Login';
import Feed from './Feed';
import FriendFeed from './Friend';
import Activity from './Activity';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { GlobalStyle } from './style';
import { PeachContext } from './PeachContext';
import { PeachFeed, LoginStream } from './api/interfaces';

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

	const [peachFeed, setPeachFeed] = useState<PeachFeed | null>(null);
	const [curUser, setCurUser] = useState<LoginStream | null>(
		getUserFromStorage()
	);
	const [curFeedIndex, setCurFeedIndex] = useState<number>(0);
	const [darkMode, setDarkMode] = useState<boolean>(
		localStorage.getItem('peachedDarkMode') === 'true'
	);

	const updateJwt = (newJwt: string) => {
		setNewJwt(newJwt);
	};

	const updatePeachFeed = (newPeachFeed: PeachFeed | null) => {
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
				}}
			>
				<GlobalStyle darkMode={darkMode} />
				<Switch>
					<Route exact path='/' component={Loading} />
					<Route path='/login' component={Login} />
					<Route
						path='/feed'
						render={routeProps => (
							<Feed
								{...routeProps}
								peachFeed={peachFeed}
								jwt={newJwt}
								setCurFeedIndex={updateCurFeedIndex}
								curUser={curUser}
								setPeachFeed={updatePeachFeed}
							/>
						)}
					/>
					<Route
						path='/friend/:id'
						render={routeProps => (
							<FriendFeed
								{...routeProps}
								peachFeed={peachFeed}
								jwt={newJwt}
								setCurFeedIndex={updateCurFeedIndex}
								curUser={curUser}
								setPeachFeed={updatePeachFeed}
							/>
						)}
					/>
					<Route
						path='/activity'
						render={routeProps => (
							<Activity
								peachFeed={peachFeed}
								jwt={newJwt}
								setCurFeedIndex={updateCurFeedIndex}
								curUser={curUser}
								setPeachFeed={updatePeachFeed}
							/>
						)}
					/>
				</Switch>
			</PeachContext.Provider>
		</BrowserRouter>
	);
};

export default App;
