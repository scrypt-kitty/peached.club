import React from 'react';
import { PeachFeed, LoginStream } from './api/interfaces';

interface PeachContextTypes {
	jwt: string;
	setJwt: (newJwt: string) => void;
	peachFeed: PeachFeed | null;
	setPeachFeed: (peachFeed: PeachFeed) => void;
	curUser: LoginStream | null;
	setCurUser: (newUser: LoginStream) => void;
}

const defaults = {
	jwt: '',
	setJwt: (newJwt: string) => {},
	peachFeed: null,
	setPeachFeed: (peachFeed: PeachFeed) => {},
	curUser: null,
	setCurUser: (newUser: LoginStream) => {},
};

export const PeachContext = React.createContext<PeachContextTypes>(defaults);
