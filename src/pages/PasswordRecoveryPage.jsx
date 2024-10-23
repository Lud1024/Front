import React, { useState } from 'react';
import Modal from 'react-modal';
import { FaCheckCircle, FaExclamationCircle } from 'react-icons/fa'; // Iconos de éxito y error
import '../components/LoginForm.css';


// Establecer el elemento raíz de react-modal
Modal.setAppElement('#root');

// Función para encriptar (simulada, backend se encargará de esto)
const hashPassword = async (password) => {
  return password; // El backend se encargará de la encriptación
};

const PasswordRecoveryPage = () => {
  const [username, setUsername] = useState('');
  const [secretWord, setSecretWord] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [modalMessage, setModalMessage] = useState(''); // Mensaje para el modal
  const [modalType, setModalType] = useState(''); // Tipo de modal: 'success' o 'error'
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [userUuid, setUserUuid] = useState(null); // Para almacenar el UUID del usuario validado

  // Función para validar la contraseña
  const validatePassword = (password) => {
    const hasUpperCase = /[A-Z]/.test(password);
    const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);
    const hasMinLength = password.length >= 8;

    if (!hasMinLength) {
      return 'La contraseña debe tener al menos 8 caracteres.';
    }
    if (!hasUpperCase) {
      return 'La contraseña debe tener al menos una letra mayúscula.';
    }
    if (!hasSpecialChar) {
      return 'La contraseña debe tener al menos un carácter especial.';
    }
    return '';
  };

  const handleRecovery = async (e) => {
    e.preventDefault();

    // Validar si la contraseña cumple con los criterios
    const passwordValidationMessage = validatePassword(newPassword);
    if (passwordValidationMessage) {
      setModalMessage(passwordValidationMessage);
      setModalType('error');
      setModalIsOpen(true);
      return;
    }

    if (newPassword !== confirmPassword) {
      setModalMessage('CONTRASEÑAS NO COINCIDEN');
      setModalType('error');
      setModalIsOpen(true);
      return;
    }

    try {
      // Verificar el nombre de usuario y la palabra secreta con el API de recuperación
      const recoveryResponse = await fetch(`http://localhost:3000/api/usuarios/recovery`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          nombre_usuario: username,
          palabra_secreta: secretWord,
        }),
      });

      const recoveryData = await recoveryResponse.json();

      if (recoveryResponse.ok && recoveryData.success) {
        // Si la palabra secreta es válida, pasamos a actualizar la contraseña
        setUserUuid(recoveryData.uuid); // Guardamos el UUID del usuario

        // Encriptar la contraseña antes de enviarla (el backend también debe encriptarla)
        const encryptedPassword = await hashPassword(newPassword);

        // Actualizar la contraseña en el servidor usando el UUID
        const patchResponse = await fetch(`http://localhost:3000/api/usuarios/${recoveryData.uuid}`, {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            contraseña: encryptedPassword, // El backend se encargará de la encriptación
          }),
        });

        const patchData = await patchResponse.json();

        if (patchResponse.ok) {
          setModalMessage('CREDENCIALES ACTUALIZADAS CON ÉXITO');
          setModalType('success');

          // Limpiar los inputs después de la actualización exitosa
          setUsername('');
          setSecretWord('');
          setNewPassword('');
          setConfirmPassword('');
        } else {
          setModalMessage('ERROR AL ACTUALIZAR LA CONTRASEÑA');
          setModalType('error');
        }
      } else {
        // Si la palabra secreta es incorrecta o el usuario no es válido
        setModalMessage(recoveryData.message || 'ERROR AL RECUPERAR LAS CREDENCIALES');
        setModalType('error');
      }
    } catch (error) {
      setModalMessage('ERROR INESPERADO');
      setModalType('error');
    } finally {
      setModalIsOpen(true); // Mostrar el modal en cualquier caso
    }
  };

  // Función para cerrar el modal
  const closeModal = () => {
    setModalIsOpen(false);
  };

  return (
    <div className="login-container">
      <form onSubmit={handleRecovery} className="login-form">
        <h2>Recuperar Contraseña</h2>

        <input
          type="text"
          placeholder="Nombre de Usuario"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />

        <input
          type="password"
          placeholder="Palabra Secreta"
          value={secretWord}
          onChange={(e) => setSecretWord(e.target.value)}
          required
        />

        <input
          type="password"
          placeholder="Nueva Contraseña"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          required
        />

        <input
          type="password"
          placeholder="Confirmar Nueva Contraseña"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
        />

        <button type="submit">Actualizar Contraseña</button>
        <a href="./" className="forgot-password">Volver al Inicio de Sesión</a>
      </form>

      {/* Modal para mostrar mensajes de éxito o error */}
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        contentLabel="Resultado de la Actualización"
        className="modal"
        overlayClassName="overlay"
      >
        <div className="modal-content">
          {modalType === 'success' ? (
            <FaCheckCircle className="success-icon" />
          ) : (
            <FaExclamationCircle className="error-icon" />
          )}
          <h2>{modalMessage}</h2>
          <button onClick={closeModal} className="modal-button">Cerrar</button>
        </div>
      </Modal>
    </div>
  );
};

export default PasswordRecoveryPage;
