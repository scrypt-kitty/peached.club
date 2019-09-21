import React, { useState, useEffect, useContext } from 'react';
import { Redirect } from 'react-router';
import Navigation from '../Navigation';
import { MiniLoader } from '../Loading';
import { PeachContext } from '../PeachContext';
import ACTIONS from '../api/constants';
import { NameChangeResponse } from '../api/interfaces';
import api from '../api';
import { Page } from '../Theme/Layout';
import { Title, SubTitle } from '../Theme/Type';
import Button from '../Theme/Button';
import { Input, Label, Fieldset } from '../Theme/Form';
import { SettingsWrapper, ErrText, SuccessText } from './style';
import { ERROR } from '../api/error';

const Settings = (props: {}) => {
	const { darkMode, jwt } = useContext(PeachContext);
	const [isButtonDisabled, setButtonDisabled] = useState<boolean>(true);
	const [newUserName, setNewUserName] = useState<string>('');
	const [newDisplayName, setNewDisplayName] = useState<string>('');
	const [isLoaderShowing, setLoaderShowing] = useState<boolean>(false);
	const [showError, setShowError] = useState<boolean>(false);
	const [nameChangeSuccess, setNameChangeSuccess] = useState<boolean>(false);

	const onSubmit = () => {
		if (!isButtonDisabled) {
			setShowError(false);
			setNameChangeSuccess(false);
			if (newUserName) {
				setLoaderShowing(true);
				api(ACTIONS.changeUserName, jwt, {
					name: newUserName,
				}).then((response: NameChangeResponse) => {
					setLoaderShowing(false);
					if (response.success) {
						setNameChangeSuccess(true);
					} else {
						if (
							response.error &&
							response.error.Code === ERROR.usernameAlreadyExists
						) {
							setShowError(true);
						}
					}
				});
			}

			if (newDisplayName) {
				setLoaderShowing(true);
				api(ACTIONS.changeDisplayName, jwt, {
					displayName: newDisplayName,
				}).then((response: NameChangeResponse) => {
					setLoaderShowing(false);
					if (response.success) {
						setNameChangeSuccess(true);
					} else {
						if (response.error) {
							setShowError(true);
						}
					}
				});
			}
		}
	};

	useEffect(() => {
		if (newUserName !== '' || newDisplayName !== '') {
			setButtonDisabled(false);
			setNameChangeSuccess(false);
		} else setButtonDisabled(true);
	}, [newUserName, newDisplayName]);

	if (!jwt) return <Redirect push to='/login' />;

	return (
		<>
			<Navigation />
			<Page>
				<Title darkMode={darkMode}>Settings</Title>
				<SettingsWrapper darkMode={darkMode}>
					<SubTitle darkMode={darkMode}>
						Change your identity
					</SubTitle>
					<Fieldset>
						<Label htmlFor='displayName'>Change display name</Label>
						<Input
							id='displayName'
							type='text'
							onChange={e => setNewDisplayName(e.target.value)}
						/>
						{isLoaderShowing && newDisplayName ? (
							<MiniLoader />
						) : null}
						{showError && newDisplayName ? (
							<ErrText>
								Can't change display name at the moment.,..
								please try again later!
							</ErrText>
						) : null}
						{!showError && newDisplayName && nameChangeSuccess ? (
							<SuccessText>
								Successfully changed your display name! Hi,{' '}
								{newDisplayName}!
							</SuccessText>
						) : null}
					</Fieldset>
					<Fieldset>
						<Label htmlFor='userName'>Change user name</Label>
						<Input
							id='userName'
							type='text'
							onChange={e => setNewUserName(e.target.value)}
						/>
						{isLoaderShowing && newUserName ? <MiniLoader /> : null}
						{showError && newUserName ? (
							<ErrText>Username is already taken!</ErrText>
						) : null}
						{!showError && newUserName && nameChangeSuccess ? (
							<SuccessText>
								Successfully changed your username! Hello,{' '}
								{newUserName}!
							</SuccessText>
						) : null}
					</Fieldset>
					<br />
					<Button
						disabled={isButtonDisabled}
						onClick={() => onSubmit()}
					>
						Submit
					</Button>
				</SettingsWrapper>
			</Page>
		</>
	);
};

export default Settings;
