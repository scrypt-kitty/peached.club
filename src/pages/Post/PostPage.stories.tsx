import React from 'react';
import { ComponentMeta, ComponentStory } from '@storybook/react';
import { Post } from './Post';
import { Props } from '../Profile/ProfilePost';
import { POST_TYPE } from '../../api/interfaces';

import { darkTheme, PeachThemeProvider } from '../../Theme/theme';
import { DEFAULT_AVATAR_SRC } from '../../constants';

const avatars = [
	'https://upload.wikimedia.org/wikipedia/commons/9/99/Basset_hound_history.jpg',
	'https://upload.wikimedia.org/wikipedia/commons/1/14/Karl-Marx.jpg',
];

export const Story = (props: Props) => {
	return (
		<PeachThemeProvider theme={darkTheme}>
			<Post {...props} />
		</PeachThemeProvider>
	);
};

export default {
	component: Story,
	title: 'Post/PostPage',
} as ComponentMeta<typeof Story>;

const Template: ComponentStory<typeof Story> = props => {
	return <Story {...props} />;
};

export const Primary = Template.bind({});
Primary.args = {
	deletePost: (_id: string) => null,
	author: 'futuresounds',
	otherFriends: [],
	postAuthorAvatarSrc: DEFAULT_AVATAR_SRC,
	id: '1',
	commentCount: 2,
	likeCount: 2,
	likedByMe: false,
	isUnread: false,
	createdTime: 1669683208,
	comments: [
		{
			id: '5',
			body: 'sdlkfjsldkf kdsf sdlkf djfks fld fsd faf kdfj sd',
			author: {
				id: '0',
				name: 'futuresounds',
				displayName: 'Hatsune Miku',
				bio: 'voice synthesizing superstar',
				isPublic: false,
				posts: [],
				unreadPostCount: 0,
				lastRead: 1,
				avatarSrc: avatars[1],
			},
		},
		{
			id: '6',
			body: 'siejhr hdsfg shdf https://news.ycombinator.com/ hdf dhfasdgf29q 39474i ffypfg; dlkfjsldkf kdsf sdlkf djfks fld fsd faf kdfj sd',
			author: {
				id: '1',
				name: 'jastronaut',
				displayName: 'Jas Jas Jas',
				bio: 'voice synthesizing superstar',
				isPublic: false,
				posts: [],
				unreadPostCount: 0,
				lastRead: 1,
				avatarSrc: avatars[0],
			},
		},
	],
	updatedTime: 1669683208,
	message: [
		{
			type: POST_TYPE.TEXT,
			text: `
			A wiki (/ˈwɪki/ (listen) WIK-ee) is a hypertext publication collaboratively edited and managed by its own audience, using a web browser. A typical wiki contains multiple pages for the subjects or scope of the project, and could be either open to the public or limited to use within an organization for maintaining its internal knowledge base.

			Wikis are enabled by wiki software, otherwise known as wiki engines. A wiki engine, being a form of a content management system, differs from other web-based systems such as blog software, in that the content is created without any defined owner or leader, and wikis have little inherent structure, allowing structure to emerge according to the needs of the users.[1] Wiki engines usually allow content to be written using a simplified markup language and sometimes edited with the help of a rich-text editor.[2] There are dozens of different wiki engines in use, both standalone and part of other software, such as bug tracking systems. Some wiki engines are open-source, whereas others are proprietary. Some permit control over different functions (levels of access); for example, editing rights may permit changing, adding, or removing material. Others may permit access without enforcing access control. Other rules may be imposed to organize content. 
			`,
		},
		{
			type: POST_TYPE.IMAGE,
			src: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/80/Wikipedia-logo-v2.svg/300px-Wikipedia-logo-v2.svg.png',
			height: 300,
			width: 300,
		},
		{
			type: POST_TYPE.LINK,
			url: 'https://en.wikipedia.org/wiki/Main_Page',
		},
	],
};
