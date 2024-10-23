import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { login } from '../api';
import Modal from 'react-modal';
import { FaExclamationCircle } from 'react-icons/fa'; // Icono de error
import './LoginForm.css';
import logo from '../assets/logo.webp';
//import './Modal.css';      // Importa los estilos del modal

// Establecer el elemento raíz de react-modal
Modal.setAppElement('#root');

const LoginForm = () => {
  const [nombreUsuario, setNombreUsuario] = useState('');
  const [contrasena, setContrasena] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // Redirigir al menú si ya existe una sesión activa
    if (sessionStorage.getItem('auth')) {
      navigate('/home');
    }
  }, [navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrorMessage('');

    try {
      const data = await login(nombreUsuario, contrasena);
      sessionStorage.setItem('auth', true); // Guardar la sesión
      navigate('/home'); 
    } catch (error) {
      // Manejar el error dependiendo de la respuesta del servidor
      if (error.response && error.response.status === 401) {
        setErrorMessage('Contraseña Incorrecta');
      } else if (error.response && error.response.status === 404) {
        setErrorMessage('Usuario No Válido');
      } else {
        setErrorMessage('Error inesperado');
      }
      setModalIsOpen(true); // Mostrar modal en caso de error
    } finally {
      setLoading(false);
    }
  };

  // Función para cerrar el modal de error
  const closeModal = () => {
    setModalIsOpen(false);
  };

  return (
    <div className="login-container">
      <form onSubmit={handleSubmit} className="login-form">
      <img src={logo} alt="Logo" className="logo" />
        <h2>Iniciar sesión</h2>
        <input
          type="text"
          placeholder="Nombre de Usuario"
          value={nombreUsuario}
          onChange={(e) => setNombreUsuario(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Contraseña"
          value={contrasena}
          onChange={(e) => setContrasena(e.target.value)}
          required
        />
        <button type="submit" disabled={loading}>
          {loading ? 'Cargando...' : 'Acceso'}
        </button>
        <a href="/password-recovery" className="forgot-password">¿Olvidaste tu contraseña?</a>
      </form>

      {/* Modal de error */}
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        contentLabel="Error de Autenticación"
        className="modal"
        overlayClassName="overlay"
      >
        <div className="modal-content">
          <FaExclamationCircle className="error-icon" />
          <h2>CREDENCIALES INCORRECTAS</h2>  {/* Texto adicional */}
          <button onClick={closeModal} className="modal-button">Cerrar</button>
        </div>
      </Modal>
    </div>
  );
};

export default LoginForm;
