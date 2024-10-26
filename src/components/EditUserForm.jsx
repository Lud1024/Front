import React, { useState, useEffect } from 'react';
import { updateUser } from '../api';
import './EditUserForm.css';

const EditUserForm = ({ user, onClose, onUpdate }) => {
  const [nombreUsuario, setNombreUsuario] = useState('');
  const [correoElectronico, setCorreoElectronico] = useState('');
  const [rolUsuario, setRolUsuario] = useState('');
  const [estado, setEstado] = useState('');
  const [contraseña, setContraseña] = useState('');
  const [palabraSecreta, setPalabraSecreta] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false); // Estado para controlar el modal de éxito

  useEffect(() => {
    if (user) {
      setNombreUsuario(user.nombre_usuario);
      setCorreoElectronico(user.correo_electronico_usuario);
      setRolUsuario(user.rol_usuario);
      setEstado(user.estado);
      setContraseña(''); // Dejar en blanco para nuevas contraseñas
      setPalabraSecreta(''); // Dejar en blanco para nuevas palabras secretas
    }
  }, [user]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const updatedUser = {
      nombre_usuario: nombreUsuario,
      correo_electronico_usuario: correoElectronico,
      rol_usuario: rolUsuario,
      estado: estado,
      ...(contraseña && { contraseña }), // Solo incluir si se cambia
      ...(palabraSecreta && { palabra_secreta: palabraSecreta }), // Solo incluir si se cambia
    };
    try {
      await updateUser(user.id_usuario, updatedUser);
      setIsModalOpen(true); // Mostrar el modal de éxito
      onUpdate(); // Actualiza la lista de usuarios en UserList
    } catch (error) {
      console.error("Error updating user:", error);
    }
  };

  const closeModal = () => {
    setIsModalOpen(false);
    onClose(); // Cerrar el formulario de edición
  };

  return (
    <div className="edit-user-modal">
      <form className="edit-user-form" onSubmit={handleSubmit}>
        <h2>Editar Usuario</h2>
        <label>Nombre de Usuario</label>
        <input
          type="text"
          value={nombreUsuario}
          onChange={(e) => setNombreUsuario(e.target.value)}
          required
        />
        
        <label>Correo Electrónico</label>
        <input
          type="email"
          value={correoElectronico}
          onChange={(e) => setCorreoElectronico(e.target.value)}
          required
        />
        
        <label>Rol</label>
        <select value={rolUsuario} onChange={(e) => setRolUsuario(e.target.value)} required>
          <option value="A">Administrador</option>
          <option value="T">Técnico</option>
        </select>
        
        <label>Estado</label>
        <select value={estado} onChange={(e) => setEstado(e.target.value)} required>
          <option value="A">Activo</option>
          <option value="I">Inactivo</option>
        </select>

        <label>Contraseña</label>
        <input
          type="password"
          value={contraseña}
          placeholder="Nueva contraseña"
          onChange={(e) => setContraseña(e.target.value)}
        />

        <label>Palabra Secreta</label>
        <input
          type="password"
          value={palabraSecreta}
          placeholder="Nueva palabra secreta"
          onChange={(e) => setPalabraSecreta(e.target.value)}
        />

        <button type="submit">Guardar Cambios</button>
        <button type="button" onClick={onClose}>Cancelar</button>
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

export default EditUserForm;
