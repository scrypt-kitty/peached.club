import React from 'react';
import { PeachFeed, LoginStream } from './api/interfaces';

interface PeachContextTypes {
	jwt: string;
	setJwt: (newJwt: string) => void;
	peachFeed: PeachFeed | null;
	setPeachFeed: (peachFeed: PeachFeed) => void;
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
	peachFeed: null,
	setPeachFeed: (peachFeed: PeachFeed) => {},
	curUser: null,
	setCurUser: (newUser: LoginStream) => {},
	curFeedIndex: 0,
	setCurFeedIndex: (newIndex: number) => {},
	darkMode: true,
	toggleDarkMode: () => {},
};

export interface GlobalContextProps {
	jwt: string;
	peachFeed: PeachFeed | null;
	curUser: LoginStream | null;
	setCurFeedIndex: (newIndex: number) => void;
	setPeachFeed: (peachFeed: PeachFeed) => void;
}

export const PeachContext = React.createContext<PeachContextTypes>(defaults);
