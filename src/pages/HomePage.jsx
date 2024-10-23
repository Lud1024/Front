import React from 'react';
import SidebarMenu from '../components/SidebarMenu'; 
import './HomePage.css'; 

const HomePage = () => {
  
  return (
    <div className="home-container">
      <SidebarMenu />
      <div className="home-content">
        <h1>Página de Inicio</h1>
        <p>Este es el contenido de la pantalla de inicio.</p>
      </div>
    </div>
  );
};

export default HomePage;
