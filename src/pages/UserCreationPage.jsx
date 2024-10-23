// src/pages/UserCreationPage.jsx
import React, { useState } from 'react';
import axios from 'axios';
import SidebarMenu from '../components/SidebarMenu'; 
import './UserForm.css';

const UserCreationPage = () => {
  const [formData, setFormData] = useState({
    nombre_usuario: '',
    correo_electronico_usuario: '',
    rol_usuario: 'T', // Técnico por defecto
    palabra_secreta: '',
    contraseña: '',
    estado: 'A' // Activo por defecto
  });

  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:3000/api/usuarios', formData);
      setSuccessMessage('Usuario creado exitosamente');
      setErrorMessage('');
      // Limpiar el formulario
      setFormData({
        nombre_usuario: '',
        correo_electronico_usuario: '',
        rol_usuario: 'T',
        palabra_secreta: '',
        contraseña: '',
        estado: 'A'
      });
    } catch (error) {
      setSuccessMessage('');
      setErrorMessage('Error al crear el usuario');
    }
  };

  return (
    <div className="user-form-container">
      <h2>Crear Nuevo Usuario</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Nombre de Usuario:</label>
          <input
            type="text"
            name="nombre_usuario"
            value={formData.nombre_usuario}
            onChange={handleInputChange}
            required
          />
        </div>

        <div>
          <label>Correo Electrónico:</label>
          <input
            type="email"
            name="correo_electronico_usuario"
            value={formData.correo_electronico_usuario}
            onChange={handleInputChange}
            required
          />
        </div>

        <div>
          <label>Rol de Usuario:</label>
          <select name="rol_usuario" value={formData.rol_usuario} onChange={handleInputChange}>
            <option value="T">Técnico</option>
            <option value="A">Administrador</option>
            <option value="U">Usuario</option>
          </select>
        </div>

        <div>
          <label>Palabra Secreta:</label>
          <input
            type="password"
            name="palabra_secreta"
            value={formData.palabra_secreta}
            onChange={handleInputChange}
            required
          />
        </div>

        <div>
          <label>Contraseña:</label>
          <input
            type="password"
            name="contraseña"
            value={formData.contraseña}
            onChange={handleInputChange}
            required
          />
        </div>

        <button type="submit">Crear Usuario</button>
      </form>

      {successMessage && <p className="success-message">{successMessage}</p>}
      {errorMessage && <p className="error-message">{errorMessage}</p>}
    </div>
  );
};

export default UserCreationPage;
