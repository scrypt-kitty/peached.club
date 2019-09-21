import React, { useState, useEffect, useContext } from 'react';
import Navigation from '../Navigation';
import Loading from '../Loading';
import { PeachContext } from '../PeachContext';
import ACTIONS from '../api/constants';
import api from '../api';
import { Page } from '../Theme/Layout';
import { Title, SubTitle } from '../Theme/Type';
import Button from '../Theme/Button';
import { Input, SettingsWrapper, SettingContainer } from './style';

const Settings = (props: {}) => {
	const { darkMode } = useContext(PeachContext);
	const [isButtonDisabled, setButtonDisabled] = useState<boolean>(true);
	const [newUserName, setNewUserName] = useState<string>('');
	const [newDisplayName, setNewDisplayName] = useState<string>('');

	useEffect(() => {
		if (newUserName !== '' || newDisplayName !== '')
			setButtonDisabled(false);
		else setButtonDisabled(true);
	});

	return (
		<>
			<Navigation />
			<Page>
				<Title darkMode={darkMode}>Settings</Title>
				<SettingsWrapper darkMode={darkMode}>
					<SettingContainer>
						<SubTitle darkMode={darkMode}>
							Change display name
						</SubTitle>
						<Input
							onChange={e => setNewDisplayName(e.target.value)}
							type='text'
						/>
					</SettingContainer>
					<SettingContainer>
						<SubTitle darkMode={darkMode}>
							Change user name
						</SubTitle>
						<Input
							onChange={e => setNewUserName(e.target.value)}
							type='text'
						/>
					</SettingContainer>
					<br />
					<Button
						disabled={isButtonDisabled}
						onClick={() => console.log('hehe')}
					>
						Submit
					</Button>
				</SettingsWrapper>
			</Page>
		</>
	);
};

export default Settings;
