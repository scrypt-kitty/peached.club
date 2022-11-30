import React from 'react';
import { IconPencil } from '@tabler/icons';
import { NewPostButtonContainer } from './style';

export const NewPostButton = (props: { setShowComposer: () => void }) => {
	return (
		<NewPostButtonContainer onClick={() => props.setShowComposer()}>
			<IconPencil size={32} color='#fff' stroke={1.75} />
		</NewPostButtonContainer>
	);
};
