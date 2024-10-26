// src/api.js
import axios from 'axios';

const api = axios.create({
  //baseURL: 'https://nest-tickets.onrender.com/tickets',
  baseURL: 'http://localhost:3000/tickets',
});

export const createTicket = async (ticketData) => {
  try {
    const response = await api.post('/tickets', ticketData);
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : { message: 'Error de red' };
  }
};

// Función para login
export const login = async (nombre_usuario, contraseña) => {
  try {
    const response = await api.post('/usuarios/login', { nombre_usuario, contraseña });
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : { message: 'Error de red' };
  }
};

// Función para crear un nuevo usuario
export const createUser = async (userData) => {
  try {
    const response = await api.post('/usuarios', userData);
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : { message: 'Error de red' };
  }
};

// Función para obtener la lista de usuarios
export const getUsers = async () => {
  try {
    const response = await api.get('/usuarios');
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : { message: 'Error de red' };
  }
};

// Función para editar un usuario específico utilizando `id_usuario`
export const updateUser = async (id_usuario, updatedData) => {
  try {
    const response = await api.patch(`/usuarios/${id_usuario}`, updatedData);
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : { message: 'Error de red' };
  }
};
