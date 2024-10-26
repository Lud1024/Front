// src/components/SidebarMenu.jsx
import React, { useState } from 'react';
import { FaUserCircle, FaPlusSquare, FaTasks, FaTools, FaChartLine, FaSignOutAlt, FaUsersCog, FaUserPlus, FaListUl } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import './SidebarMenu.css';

const SidebarMenu = () => {
  const navigate = useNavigate();
  const [adminSubmenuOpen, setAdminSubmenuOpen] = useState(false);

  const handleLogout = () => {
    sessionStorage.removeItem('auth');
    sessionStorage.removeItem('nombreUsuario');
    navigate('/');
  };

  const nombreUsuario = sessionStorage.getItem('nombreUsuario') || "Usuario"; 

  const toggleAdminSubmenu = () => {
    setAdminSubmenuOpen((prev) => !prev);
  };

  return (
    <div className="sidebar">
      <div className="sidebar-header">
        <FaUserCircle className="user-icon" />
        <span className="username">{nombreUsuario}</span>
      </div>

      <ul className="sidebar-menu">
        <li onClick={() => navigate('/ticket-creation')}>
          <FaPlusSquare className="menu-icon" />
          <span>Creación de Tickets</span>
        </li>
        <li onClick={() => navigate('/ticket-management')}>
          <FaTasks className="menu-icon" />
          <span>Gestión de Tickets</span>
        </li>
        <li onClick={() => navigate('/ticket-resolution')}>
          <FaTools className="menu-icon" />
          <span>Resolución de Tickets</span>
        </li>
        <li onClick={() => navigate('/report-tracking')}>
          <FaChartLine className="menu-icon" />
          <span>Seguimiento y Reportes</span>
        </li>

        {/* Administración de Usuarios con submenús */}
        <li onClick={toggleAdminSubmenu}>
          <FaUsersCog className="menu-icon" />
          <span>Administración de Usuarios</span>
          {adminSubmenuOpen && (
            <ul className="submenu">
              <li onClick={() => navigate('/user-creation')}>
                <FaUserPlus className="menu-icon" />
                <span>Crear Usuario</span>
              </li>
              <li onClick={() => navigate('/user-list')}>
                <FaListUl className="menu-icon" />
                <span>Lista de Usuarios</span>
              </li>
            </ul>
          )}
        </li>

        <li onClick={handleLogout}>
          <FaSignOutAlt className="menu-icon" />
          <span>Logout</span>
        </li>
      </ul>
    </div>
  );
};

export default SidebarMenu;
