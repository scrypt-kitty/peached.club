import React from 'react';
import { LoginStream, User, CurUser, DummyCurUser } from './api/interfaces';

interface PeachContextTypes {
	jwt: string;
	setJwt: (newJwt: string) => void;
	peachFeed: User[];
	setPeachFeed: (newPeachFeed: User[]) => void;
	curUser: LoginStream | null;
	setCurUser: (newUser: LoginStream) => void;
	curFeedIndex: number;
	setCurFeedIndex: (newIndex: number) => void;
	darkMode: boolean;
	toggleDarkMode: () => void;
	curUserData: CurUser;
	setCurUserData: (newCurUser: CurUser) => void;
}

const defaults = {
	jwt: '',
	setJwt: (newJwt: string) => {},
	peachFeed: [],
	setPeachFeed: (newPeachFeed: User[]) => {},
	curUser: null,
	setCurUser: (newUser: LoginStream) => {},
	curFeedIndex: 0,
	setCurFeedIndex: (newIndex: number) => {},
	darkMode: true,
	toggleDarkMode: () => {},
	curUserData: DummyCurUser,
	setCurUserData: (newCurUser: CurUser) => {},
};

export const PeachContext = React.createContext<PeachContextTypes>(defaults);
