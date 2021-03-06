import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
	BrowserRouter as Routes,
	Route,
	Switch,
} from 'react-router-dom';
import {
	setToken,
	// deleteToken,
	getToken,
	initAxiosInterceptors,
} from './Helpers/auth-helpers';
import Nav from './components/Nav';
import Loading from './components/Loading';
import Error from './components/Error';
import Main from './components/Main';

import Signup from './view/Signup';
import Login from './view/Login';
import Upload from './view/Upload';

initAxiosInterceptors();

export default function App() {
	const [usuario, setUsuario] = useState(null);
	const [cargandoUsuario, setCargandoUsuario] = useState(
		true
	);
	const [error, setError] = useState(null);

	useEffect(() => {
		const cargarUsuario = async () => {
			if (!getToken()) {
				setCargandoUsuario(false);
				return;
			}

			try {
				const { data: usuario } = await axios.get(
					'/api/usuarios/whoami'
				);
				setUsuario(usuario);
				setCargandoUsuario(false);
			} catch (error) {
				console.log(error);
			}
		};

		cargarUsuario();
	}, []);

	const login = async (email, password) => {
		const { data } = await axios.post('/api/usuarios/login', {
			email,
			password,
		});

		setUsuario(data.usuario);
		setToken(data.token);
	};

	const mostrarError = (mensaje) => {
		setError(mensaje);
	};

	const ocultarError = () => {
		setError(null);
	};

	const signup = async (usuario) => {
		const { data } = await axios.post(
			'/api/usuarios/signup',
			usuario
		);

		setUsuario(data.usuario);
		setToken(data.token);
	};

	// const logout = () => {
	// 	setUsuario(null);
	// 	deleteToken();
	// };

	if (cargandoUsuario) {
		return (
			<Main center>
				<Loading />
			</Main>
		);
	}

	return (
		<Routes>
			<Nav usuario={usuario}/>
			<Error mensaje={error} ocultarError={ocultarError} />
			{usuario ? (
				<LoginRoutes mostrarError={mostrarError} />
			) : (
				<LogoutRoutes
					login={login}
					signup={signup}
					mostrarError={mostrarError}
				/>
			)}
		</Routes>
	);
}

const LoginRoutes = ({ mostrarError }) => (
	<Switch>
		<Route
			path='/upload'
			render={(props) =>  <Upload {...props} mostrarError={mostrarError} />}
		/>
		<Route
			path='/'
			component={() => (
				<Main center>
					<h1>Home</h1>
				</Main>
			)}
			default
		/>
	</Switch>
);

const LogoutRoutes = ({ login, signup, mostrarError }) => (
	<Switch>
		<Route
			path='/login'
			render={(props) => (
				<Login
					{...props}
					loggin={login}
					mostrarError={mostrarError}
				/>
			)}
		/>
		<Route
			default
			render={(props) => (
				<Signup
					{...props}
					signup={signup}
					mostrarError={mostrarError}
				/>
			)}
		/>
	</Switch>
);
