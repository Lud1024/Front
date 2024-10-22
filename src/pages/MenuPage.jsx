import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FaHome, FaInfoCircle, FaSignOutAlt } from 'react-icons/fa';
import './MenuPage.css'; // Crea un archivo CSS para estilizar el menú

const MenuPage = () => {
  const navigate = useNavigate();

  // Función para cerrar la sesión
  const handleLogout = () => {
    sessionStorage.removeItem('auth'); // Remover la autenticación
    navigate('/'); // Redirigir al login
  };

  return (
    <div className="menu-container">
      <nav className="menu">
        <ul>
          <li onClick={() => navigate('/home')}>
            <FaHome className="icon" /> <span>Inicio</span>
          </li>
          <li onClick={() => navigate('/about')}>
            <FaInfoCircle className="icon" /> <span>Acerca de</span>
          </li>
          <li onClick={handleLogout}>
            <FaSignOutAlt className="icon" /> <span>Cerrar sesión</span>
          </li>
        </ul>
      </nav>
      <div className="content">
        <h1>Bienvenido al Menú</h1>
        <p>Selecciona una de las opciones en el menú para continuar.</p>
      </div>
    </div>
  );
};

export default MenuPage;
