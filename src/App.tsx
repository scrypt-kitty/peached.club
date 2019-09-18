import React, { useState } from 'react';
import Loading from './Loading';
import Login from './Login';
import Feed from './Feed';
import FriendFeed from './Friend';
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

	const updateJwt = (newJwt: string) => {
		setNewJwt(newJwt);
	};

	const updatePeachFeed = (newPeachFeed: PeachFeed | null) => {
		setPeachFeed(newPeachFeed);
	};

	const updateCurUser = (newUser: LoginStream) => {
		setCurUser(newUser);
	};

	return (
		<BrowserRouter>
			<GlobalStyle />
			<PeachContext.Provider
				value={{
					jwt: newJwt,
					setJwt: updateJwt,
					peachFeed: peachFeed,
					setPeachFeed: updatePeachFeed,
					curUser: curUser,
					setCurUser: updateCurUser,
				}}
			>
				<Switch>
					<Route exact path='/' component={Loading} />
					<Route path='/login' component={Login} />
					<Route path='/feed' component={Feed} />
					<Route path='/friend/:id' component={FriendFeed} />
				</Switch>
			</PeachContext.Provider>
		</BrowserRouter>
	);
};

export default App;
