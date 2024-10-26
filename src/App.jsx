// src/App.jsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import PasswordRecoveryPage from './pages/PasswordRecoveryPage';
import HomePage from './pages/HomePage';
import AboutPage from './pages/AboutPage';
import SidebarMenu from './components/SidebarMenu'; // Menú lateral
import UserCreationPage from './pages/UserCreationPage';
import UserListPage from './pages/UserListPage';

const PrivateRoute = ({ children }) => {
  return sessionStorage.getItem('auth') ? children : <Navigate to="/" />;
};

const AuthRoute = ({ children }) => {
  return sessionStorage.getItem('auth') ? <Navigate to="/home" /> : children;
};

const App = () => {
  const isAuthenticated = sessionStorage.getItem('auth'); // Verificar si el usuario está autenticado

  return (
    <Router>
      <div className="app">
        {/* Solo mostrar SidebarMenu si el usuario está autenticado */}
        {isAuthenticated && <SidebarMenu />}

        <div className={isAuthenticated ? "content-with-sidebar" : "content"}>
          <Routes>
            {/* Evitar que los usuarios autenticados accedan al login */}
            <Route path="/" element={<AuthRoute><LoginPage /></AuthRoute>} />
            <Route path="/password-recovery" element={<PasswordRecoveryPage />} />

            {/* Rutas protegidas */}
            <Route
              path="/home"
              element={
                <PrivateRoute>
                  <HomePage />
                </PrivateRoute>
              }
            />
            <Route
              path="/about"
              element={
                <PrivateRoute>
                  <AboutPage />
                </PrivateRoute>
              }
            />
          <Route
              path="/user-creation"
              element={
                <PrivateRoute>
                  <UserCreationPage />
                </PrivateRoute>
              }
            />
            <Route
              path="/user-list"
              element={
                <PrivateRoute>
                  <UserListPage />
                </PrivateRoute>
              }
            />
          <Route
              path="/user-creation"
              element={
                <PrivateRoute>
                  <UserCreationPage />
                </PrivateRoute>
              }
            />
            <Route
              path="/user-list"
              element={
                <PrivateRoute>
                  <UserListPage />
                </PrivateRoute>
              }
            />
          </Routes>
        </div>
      </div>
    </Router>
  );
};

export default App;
