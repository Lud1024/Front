import React, { useState } from 'react';
import { FaUserCircle, FaPlusSquare, FaTasks, FaTools, FaChartLine, FaSignOutAlt, FaUsersCog, FaUserPlus, FaListUl } from 'react-icons/fa'; // Iconos para los submenús
import { useNavigate } from 'react-router-dom';
import './SidebarMenu.css'; // Asegúrate de tener los estilos CSS

const SidebarMenu = () => {
  const navigate = useNavigate();
  const [adminSubmenuOpen, setAdminSubmenuOpen] = useState(false); // Estado para controlar el submenú

  const handleLogout = () => {
    sessionStorage.removeItem('auth'); // Eliminar la sesión
    sessionStorage.removeItem('nombreUsuario'); // Eliminar el nombre de usuario
    navigate('/'); // Redirigir al login
  };

  const nombreUsuario = sessionStorage.getItem('nombreUsuario'); // Obtener el nombre del usuario de sessionStorage

  const toggleAdminSubmenu = () => {
    setAdminSubmenuOpen(!adminSubmenuOpen); // Alternar el estado del submenú
  };

  return (
    <div className="sidebar">
      <div className="sidebar-header">
        <FaUserCircle className="user-icon" />
        <span className="username">{nombreUsuario}</span>
      </div>

      <ul className="sidebar-menu">
        <li>
          <a href="#" onClick={() => navigate('/ticket-creation')}>
            <FaPlusSquare className="menu-icon" />
            <span>Creación de Tickets</span>
          </a>
        </li>
        <li>
          <a href="#" onClick={() => navigate('/ticket-management')}>
            <FaTasks className="menu-icon" />
            <span>Gestión de Tickets</span>
          </a>
        </li>
        <li>
          <a href="#" onClick={() => navigate('/ticket-resolution')}>
            <FaTools className="menu-icon" />
            <span>Resolución de Tickets</span>
          </a>
        </li>
        <li>
          <a href="#" onClick={() => navigate('/report-tracking')}>
            <FaChartLine className="menu-icon" />
            <span>Seguimiento y Reportes</span>
          </a>
        </li>

        {/* Administrar usuarios con submenús */}
        <li>
          <a href="#" onClick={toggleAdminSubmenu}>
            <FaUsersCog className="menu-icon" />
            <span>Administración de Usuarios</span> {/* Nuevo segmento */}
          </a>
          {/* Mostrar submenús solo si el estado `adminSubmenuOpen` es verdadero */}
          {adminSubmenuOpen && (
            <ul className="submenu">
              <li>
                <a href="#" onClick={() => navigate('/user-creation')}>
                  <FaUserPlus className="menu-icon" />
                  <span>Crear Usuario</span>
                </a>
              </li>
              <li>
                <a href="#" onClick={() => navigate('/user-list')}>
                  <FaListUl className="menu-icon" />
                  <span>Lista de Usuarios</span>
                </a>
              </li>
            </ul>
          )}
        </li>

        <li>
          <a href="#" onClick={handleLogout}>
            <FaSignOutAlt className="menu-icon" />
            <span>Logout</span>
          </a>
        </li>
      </ul>
    </div>
  );
};

export default SidebarMenu;
