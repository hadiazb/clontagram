import React, { useState } from 'react';
import Main from '../components/Main';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUpload } from '@fortawesome/free-solid-svg-icons';
import Axios from 'axios';

import Loading from '../components/Loading';

const Upload = ({ history, mostrarError }) => {
	const [imageUrl, setImageUrl] = useState('');
	const [subiendoImagen, setSubiendoImagen] = useState(
		false
	);
	const [enviandoPost, setEnviandoPost] = useState(false);
	const [caption, setCaption] = useState('');

	const handleImagenSeleccionada = async (e) => {
		try {
			setSubiendoImagen(true);
			const file = e.target.files[0];

			const config = {
				headers: {
					'Content-Type': file.type,
				},
			};
			const { data } = await Axios.post(
				'/api/posts/upload',
				file,
				config
			);
			setImageUrl(data.url);
			setSubiendoImagen(false);
		} catch (error) {
			setSubiendoImagen(false);
			mostrarError(error.response.data.message);
			console.log(error);
		}
	};

	const handleSubmit = async (evento) => {
		evento.preventDefault();

		if (enviandoPost) {
			return;
		}

		if (subiendoImagen) {
			mostrarError('No se ha terminado de subir la imagen');
			return;
		}

		if (!imageUrl) {
			mostrarError('Primero selecciona una imagen');
			return;
		}

		try {
			setEnviandoPost(true);
			const body = {
				caption,
				url: imageUrl,
			};
			await Axios.post('/api/posts', body);
			setEnviandoPost(false);
			history.push('/');
		} catch (error) {
			mostrarError(error.response.data);
		}
	};

	return (
		<Main center>
			<div className='Upload'>
				<form onSubmit={handleSubmit}>
					<div className='Upload__image-section'>
						<SeccionSubirImagen
							imagenUrl={imageUrl}
							subiendoImagen={subiendoImagen}
							handleImagenSeleccionada={handleImagenSeleccionada}
						></SeccionSubirImagen>
					</div>
					<textarea
						name='caption'
						className='Upload__caption'
						maxLength='180'
						required
						placeholder='Caption de tu post'
						value={caption}
						onChange={(e) => setCaption(e.target.value)}
					></textarea>
					<button className='Upload__submit' type='submit'>
						Post
					</button>
				</form>
			</div>
		</Main>
	);
};

const SeccionSubirImagen = ({
	subiendoImagen,
	imagenUrl,
	handleImagenSeleccionada,
}) => {
	if (subiendoImagen) {
		return <Loading />;
	} else if (imagenUrl) {
		return <img src={imagenUrl} alt='' />;
	} else {
		return (
			<label className='Upload__image-label'>
				<FontAwesomeIcon icon={faUpload}></FontAwesomeIcon>
				<span>Publica una foto</span>
				<input
					type='file'
					name='imagen'
					className='hidden'
					onChange={handleImagenSeleccionada}
				/>
			</label>
		);
	}
};

export default Upload;
