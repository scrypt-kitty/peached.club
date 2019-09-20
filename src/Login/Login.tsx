import React, { useState, useContext, useEffect } from 'react';
import { RouteComponentProps } from 'react-router';
import { PeachContext } from '../PeachContext';
import {
	AuthInput,
	Moat,
	Castle,
	Heading,
	DangerTxt,
	Button,
	ButtonCenter,
} from './style';
import { LoginResponse } from '../api/interfaces';
import { LOGIN } from '../api/constants';
enum loginErrors {
	OK,
	INVALID_LOGIN,
	MISSING_CREDENTIALS,
}

const Login: React.FC<RouteComponentProps> = (props: RouteComponentProps) => {
	const { history } = props;
	const [email, setEmail] = useState<string>('');
	const [pw, setPw] = useState<string>('');
	const [err, setErr] = useState<loginErrors>(loginErrors.OK);
	const peachContext = useContext(PeachContext);

	useEffect(() => {
		const peachedToken = localStorage.getItem('peachedToken');
		const user = localStorage.getItem('user');
		if (
			peachedToken !== null &&
			peachedToken !== '' &&
			user !== null &&
			user !== ''
		) {
			peachContext.setJwt(peachedToken);
			peachContext.setCurUser(JSON.parse(user));
			history.push('/feed');
		}
	}, [peachContext]);

	const buttonOnClick = () => {
		if (email.indexOf('@') < 1 || email.length < 1 || pw.length < 1) {
			setErr(loginErrors.MISSING_CREDENTIALS);
			return;
		}

		setErr(loginErrors.OK);
		fetch(LOGIN, {
			method: 'POST',
			body: JSON.stringify({
				email: email,
				password: pw,
			}),
			headers: {
				'Content-Type': 'application/json',
			},
		})
			.then(response => response.json())
			.catch(err => console.log(err))
			.then((response: LoginResponse) => {
				if (response.error) {
					setErr(loginErrors.INVALID_LOGIN);
					return;
				}
				if (response.data && response.data.streams[0]) {
					peachContext.setJwt(response.data.streams[0].token);
					localStorage.setItem(
						'peachedToken',
						response.data.streams[0].token
					);

					peachContext.setCurUser(response.data.streams[0]);
					localStorage.setItem(
						'user',
						JSON.stringify(response.data.streams[0])
					);
				}
				history.push('/feed');
			});
	};

	const displayError = (err: loginErrors) => {
		let msg = '';
		if (err === loginErrors.INVALID_LOGIN)
			msg = 'Incorrect username and/or password';
		else msg = 'Missing email and/or password';
		return <DangerTxt>{msg}</DangerTxt>;
	};

	return (
		<Moat>
			<Castle>
				<Heading>Login</Heading>
				<AuthInput
					onChange={e => setEmail(e.target.value)}
					key='email'
					type='text'
				/>
				<AuthInput
					onChange={e => setPw(e.target.value)}
					key='password'
					type='password'
				/>
				<ButtonCenter>
					<Button onClick={buttonOnClick} link='#' lg>
						Submit
					</Button>
				</ButtonCenter>
				{err !== loginErrors.OK && displayError(err)}
			</Castle>
		</Moat>
	);
};

export default Login;
