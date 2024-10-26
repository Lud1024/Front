import React, { useState } from 'react';
import { createUser } from '../api';
import './UserForm.css';

const UserForm = () => {
  const [formData, setFormData] = useState({
    nombre_usuario: '',
    correo_electronico_usuario: '',
    rol_usuario: '',
    palabra_secreta: '',
    contraseña: '',
    estado: 'A'
  });

  const [isModalOpen, setIsModalOpen] = useState(false); // Estado para controlar el modal

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await createUser(formData);
      setIsModalOpen(true); // Mostrar el modal de éxito
      setFormData({
        nombre_usuario: '',
        correo_electronico_usuario: '',
        rol_usuario: '',
        palabra_secreta: '',
        contraseña: '',
        estado: 'A'
      });
    } catch (error) {
      console.error("Error creating user:", error);
    }
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="form-container">
      <h2 className="form-title">Crear Usuario</h2>
      <form className="user-form" onSubmit={handleSubmit}>
        <div className="form-row">
          <label>Nombre de Usuario</label>
          <input
            type="text"
            name="nombre_usuario"
            placeholder="Ingrese el nombre de usuario"
            value={formData.nombre_usuario}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-row">
          <label>Correo Electrónico</label>
          <input
            type="email"
            name="correo_electronico_usuario"
            placeholder="Ingrese el correo electrónico"
            value={formData.correo_electronico_usuario}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-row">
          <label>Rol</label>
          <select
            name="rol_usuario"
            value={formData.rol_usuario}
            onChange={handleChange}
            required
          >
            <option value="">Seleccione Rol</option>
            <option value="A">Administrador</option>
            <option value="T">Técnico</option>
            <option value="U">Usuario</option>
          </select>
        </div>
        <div className="form-row">
          <label>Palabra Secreta</label>
          <input
            type="password"
            name="palabra_secreta"
            placeholder="Ingrese una palabra secreta"
            value={formData.palabra_secreta}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-row">
          <label>Contraseña</label>
          <input
            type="password"
            name="contraseña"
            placeholder="Ingrese la contraseña"
            value={formData.contraseña}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-row">
          <label>Estado</label>
          <select
            name="estado"
            value={formData.estado}
            onChange={handleChange}
            required
          >
            <option value="A">Activo</option>
            <option value="I">Inactivo</option>
          </select>
        </div>
        <button type="submit">Crear Usuario</button>
      </form>

      {/* Modal de confirmación */}
      {isModalOpen && (
        <div className="modal-overlay">
          <div className="modal">
            <h3>SE REALIZÓ LA OPERACIÓN CON ÉXITO</h3>
            <button onClick={closeModal}>Cerrar</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserForm;
