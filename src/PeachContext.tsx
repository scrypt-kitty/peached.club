import React from 'react';
import { LoginStream, User } from './api/interfaces';

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
};

export interface GlobalContextProps {
	jwt: string;
	peachFeed: User[];
	curUser: LoginStream | null;
	setCurFeedIndex: (newIndex: number) => void;
	setPeachFeed: (newPeachFeed: User[]) => void;
}

export const PeachContext = React.createContext<PeachContextTypes>(defaults);
