import React, { useState, useEffect } from 'react';
import { getUsers } from '../api';
import EditUserForm from './EditUserForm';
import './UserList.css';

const UserList = () => {
  const [users, setUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [editingUser, setEditingUser] = useState(null); // Usuario en edición

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const data = await getUsers();
      setUsers(data);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const filteredUsers = users.filter(user =>
    user.nombre_usuario.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const openEditForm = (user) => {
    setEditingUser(user);
  };

  const closeEditForm = () => {
    setEditingUser(null);
  };

  return (
    <div className="userlist-container">
      <h1 className="userlist-title">Lista de Usuarios</h1>

      <div className="search-bar">
        <input
          type="text"
          placeholder="Buscar usuario..."
          value={searchTerm}
          onChange={handleSearchChange}
        />
      </div>

      <table className="userlist-table">
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Correo Electrónico</th>
            <th>Rol</th>
            <th>Estado</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {filteredUsers.map((user) => (
            <tr key={user.id}> {/* key única para cada usuario */}
              <td>{user.nombre_usuario}</td>
              <td>{user.correo_electronico_usuario}</td>
              <td>{user.rol_usuario === 'A' ? 'Administrador' : 'Técnico'}</td>
              <td>{user.estado === 'A' ? 'Activo' : 'Inactivo'}</td>
              <td>
                <button className="action-button" onClick={() => openEditForm(user)}>Editar</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Modal para edición de usuario */}
      {editingUser && (
        <EditUserForm
          user={editingUser}
          onClose={closeEditForm}
          onUpdate={fetchUsers} // Refresca la lista de usuarios tras la edición
        />
      )}
    </div>
  );
};

export default UserList;
