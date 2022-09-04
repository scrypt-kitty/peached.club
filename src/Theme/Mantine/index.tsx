import styled from 'styled-components';
import { Textarea, Container, Avatar, Popover, Tabs } from '@mantine/core';

export const MTextArea = styled(Textarea)`
	.mantine-Textarea-input {
		background: ${props => props.theme.background.secondary};
		color: ${props => props.theme.text.primary};
		border-color: ${props => props.theme.border.secondary};
	}

	.mantine-Textarea-input:active,
	.mantine-Textarea-input:focus-within,
	.mantine-Textarea-defaultVariant:active {
		border-color: ${props => props.theme.border.primary};
	}
`;

export const MContainer = styled(Container)`
	background: ${props => props.theme.background.primary};
	color: ${props => props.theme.text.primary};
`;

export const MAvatar = styled(Avatar)`
	.mantine-Avatar-placeholder {
		border-radius: 50%;
	}
`;

export const MPopover = styled(Popover)`
	background: ${props => props.theme.background.secondary};
	color: ${props => props.theme.text.primary};
	border-color: ${props => props.theme.border.secondary};
`;

export const MTabs = styled(Tabs)`
	.mantine-Tabs-tabLabel {
		color: ${props => props.theme.text.muted};
	}

	.mantine-Tabs-tabControl.mantine-Tabs-pills.mantine-Group-child:hover
		.mantine-Tabs-tabLabel {
		color: #eee;
	}

	.mantine-Tabs-tabControl.mantine-Tabs-pills:hover {
		background-color: ${props => props.theme.accent};
		transition: 0.25s ease background-color;
	}

	.mantine-Tabs-tabInner:hover {
		color: ${props => props.theme.accent};
	}

	.mantine-Tabs-tabActive {
		background-color: initial;
		background-color: ${props => props.theme.accent};
	}

	.mantine-Tabs-tabActive .mantine-Tabs-tabInner .mantine-Tabs-tabLabel {
		color: #fff;
		background-color: ${props => props.theme.accent};
	}
`;
