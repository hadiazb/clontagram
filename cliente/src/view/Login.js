import React, { useState } from 'react';
import Main from '../components/Main';
import { Link } from 'react-router-dom';

const Login = ({ loggin, mostrarError }) => {
	const [login, setLogin] = useState({
		email: 'Email...',
		password: 'Password...',
	});

	const handleInputChange = (event) => {
		setLogin({
			...login,
			[event.target.name]: event.target.value,
		});
	};

	const handleSubmit = async (e) => {
		e.preventDefault();

		try {
			await loggin(login.email, login.password);
		} catch (error) {
			mostrarError(error.response.data.message)
			console.log(error);
		}
	};

	return (
		<div>
			<Main center>
				<div className='FormContainer'>
					<h1 className='Form__titulo'>Clontagram</h1>
					<div>
						<form onSubmit={handleSubmit}>
							<label htmlFor='email'>
								<input
									type='email'
									name='email'
									placeholder={login.email}
									className='Form__field'
									onChange={handleInputChange}
									required
								/>
							</label>
							<label htmlFor='password'>
								<input
									type='password'
									name='password'
									placeholder={login.password}
									className='Form__field'
									required
									onChange={handleInputChange}
								/>
							</label>
							<button className='Form__submit' type='submit'>
								Login
							</button>
							<p className='FormContainer__info'>
								No tienes cuenta? <Link to='/signup'>Signup</Link>{' '}
							</p>
						</form>
					</div>
				</div>
			</Main>
		</div>
	);
};

export default Login;
