import React, { useState } from 'react';
import Login from './Login';
import Feed from './Feed';
import FriendFeed from './Friend';
import Activity from './Activity';
import Settings from './Settings';
import { Redirect } from 'react-router';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { GlobalStyle } from './style';
import { PeachContext } from './PeachContext';
import { LoginStream, User, CurUser, DummyCurUser } from './api/interfaces';

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
				<GlobalStyle darkMode={darkMode} />
				<Switch>
					<Route exact path='/' component={Feed} />
					<Route path='/login' component={Login} />
					<Route path='/feed' component={Feed} />
					<Route path='/friend/:id' component={FriendFeed} />
					<Route path='/activity' component={Activity} />
					<Route path='/settings' component={Settings} />
					<Route
						path='/logout'
						render={() => {
							localStorage.removeItem('peachedToken');
							localStorage.removeItem('user');
							localStorage.removeItem('peachedDarkMode');
							updateJwt('');
							updatePeachFeed([]);
							return <Redirect to='/login' />;
						}}
					/>
				</Switch>
			</PeachContext.Provider>
		</BrowserRouter>
	);
};

export default App;
