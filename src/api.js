import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:3000/tickets/usuarios', 
});

export const login = async (nombre_usuario, contraseña) => {
  try {
    const response = await api.post('/login', { nombre_usuario, contraseña });
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : { message: 'Error de red' };
  }
};
