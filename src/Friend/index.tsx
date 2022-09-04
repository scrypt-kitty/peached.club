import React, { useContext, useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Linkify from 'linkify-react';

import api from '../api';
import Loading from '../Theme/Loading';
import { PostInteractions } from '../components/Posts/PostInteractions';

import Comments from '../components/Comments';

import { DeletePrompt } from '../components/Comments/style';

import NewPost from '../components/NewPost';

import { Page } from '../Theme/Layout';
import {
	Post,
	LikePostResponse,
	User,
	Comment,
	CommentResponse,
	MutualFriend,
	FriendsOfFriendsResponse,
	POST_TYPE,
} from '../api/interfaces';
import ACTIONS from '../api/constants';
import { LINKIFY_OPTIONS } from '../constants';

import {
	PostWrapper,
	FriendPostContent,
	Image,
	EmptyStateWrapper,
} from './style';
import { PeachContext } from '../PeachContext';

import LocationPost from '../components/Posts/LocationPost';
import LinkPost from '../components/Posts/LinkPost';

import { ProfileHeader } from '../components/ProfileHeader/ProfileHeader';

export interface FriendFeedProps extends Post {
	deletePost: (id: string) => void;
	author: string;
	otherFriends: MutualFriend[];
	postAuthorAvatarSrc: string;
}
