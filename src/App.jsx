import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import PasswordRecoveryPage from './pages/PasswordRecoveryPage';
import MenuPage from './pages/MenuPage';
import HomePage from './pages/HomePage';
import AboutPage from './pages/AboutPage';

const PrivateRoute = ({ children }) => {
  return sessionStorage.getItem('auth') ? children : <Navigate to="/" />;
};

const AuthRoute = ({ children }) => {
  return sessionStorage.getItem('auth') ? <Navigate to="/menu" /> : children;
};

const App = () => {
  return (
    <Router>
      <Routes>
        {/* Evitar que los usuarios autenticados accedan al login */}
        <Route path="/" element={<AuthRoute><LoginPage /></AuthRoute>} />
        <Route path="/password-recovery" element={<PasswordRecoveryPage />} />

        {/* Rutas protegidas */}
        <Route
          path="/menu"
          element={
            <PrivateRoute>
              <MenuPage />
            </PrivateRoute>
          }
        />
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
      </Routes>
    </Router>
  );
};

export default App;
