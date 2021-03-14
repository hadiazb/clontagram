import React, { useState } from 'react';
import Main from '../components/Main';
import ImageSignup from '../imagenes/signup.png';
import { Link } from 'react-router-dom';

const Signup = ({ signup }) => {
	const [submit, setSubmit] = useState({
		email: 'Email...',
		username: 'Username...',
		password: 'Password...',
		bio: 'Cuéntanos de ti...',
		nombre: 'Name...',
	});

	const handleInputChange = (event) => {
		event.preventDefault();
		setSubmit({
			...submit,
			[event.target.name]: event.target.value,
		});
	};

	const handleSubmit = async (e) => {
		e.preventDefault();

		try {
			signup(submit);
		} catch (error) {
			console.log(error);
		}
	};

	return (
		<Main center={true}>
			<div className='Signup'>
				<img src={ImageSignup} alt='' className='Signup__img' />
				<div className='FormContainer'>
					<h1 className='Form__titulo'>Clontagram</h1>
					<p className='FormContainer__info'>
						Registrate para que veas el clon de Instagram
					</p>
					<form onSubmit={handleSubmit}>
						<label htmlFor='email'>
							<input
								type='email'
								name='email'
								placeholder={submit.email}
								className='Form__field'
								onChange={handleInputChange}
							/>
						</label>
						<label htmlFor='name'>
							<input
								type='text'
								name='nombre'
								placeholder={submit.nombre}
								className='Form__field'
								required
								minLength='3'
								maxLength='100'
								onChange={handleInputChange}
							/>
						</label>
						<label htmlFor='username'>
							<input
								type='text'
								name='username'
								placeholder={submit.username}
								className='Form__field'
								required
								minLength='3'
								maxLength='30'
								onChange={handleInputChange}
							/>
						</label>
						<label htmlFor='bio'>
							<input
								type='text'
								name='bio'
								placeholder={submit.bio}
								className='Form__field'
								required
								minLength='3'
								maxLength='150'
								onChange={handleInputChange}
							/>
						</label>
						<label htmlFor='password'>
							<input
								type='password'
								name='password'
								placeholder={submit.password}
								className='Form__field'
								required
								onChange={handleInputChange}
							/>
						</label>
						<button className='Form__submit' type='submit'>
							Sign up
						</button>
						<p className='FormContainer__info'>
							Ya tienes cuenta? <Link to='/login'>Login</Link>{' '}
						</p>
					</form>
				</div>
			</div>
		</Main>
	);
};

export default Signup;
