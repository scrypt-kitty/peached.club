import React from 'react';
import { Route, Routes } from 'react-router-dom';

import { LoginPage } from './pages/Login';
import { Logout } from './pages/Login/Logout';
import { FeedPage } from './pages/Feed';
import { ProfilePage } from './pages/Profile/Profile';
import { ActivityPage } from './pages/Activity';
import { SettingsPage } from './pages/Settings';

export const PeachRoutes = () => (
	<Routes>
		<Route path='/' element={<LoginPage />} />
		<Route path='/login' element={<LoginPage />} />
		<Route path='/feed' element={<FeedPage />} />
		<Route path='/friend'>
			<Route path=':id' element={<ProfilePage />} />
		</Route>
		<Route path='/activity' element={<ActivityPage />} />
		<Route path='/settings' element={<SettingsPage />} />
		<Route path='/logout' element={<Logout />} />
	</Routes>
);
