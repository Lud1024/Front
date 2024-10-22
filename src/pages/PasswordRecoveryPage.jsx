import React, { useState } from 'react';

const PasswordRecoveryPage = () => {
  const [username, setUsername] = useState('');
  const [secretWord, setSecretWord] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState('');

  const handleRecovery = (e) => {
    e.preventDefault();

    // Validar que la nueva contraseña y la confirmación coincidan
    if (newPassword !== confirmPassword) {
      setMessage('Las contraseñas no coinciden.');
      return;
    }

    // Simular la recuperación de contraseña (Aquí iría la lógica para manejar la recuperación con la API)
    setMessage('Tu contraseña ha sido actualizada con éxito.');
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
          type="text"
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

        <button type="submit">Recuperar</button>

        {/* Mensaje de error o éxito */}
        {message && <p>{message}</p>}
      </form>
    </div>
  );
};

export default PasswordRecoveryPage;
