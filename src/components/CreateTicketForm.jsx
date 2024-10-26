// src/components/CreateTicketForm.jsx
import React, { useState } from 'react';
import './CreateTicketForm.css';

const CreateTicketForm = ({ onSubmit }) => {
  const [formData, setFormData] = useState({
    titulo: '',
    descripcion: '',
    prioridad: 'Alta',
    estado: 'Abierto',
    id_departamento: '',
    id_categoria_ticket: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <div className="form-container">
      <h2 className="form-title">Crear Ticket</h2>
      <form className="ticket-form" onSubmit={handleSubmit}>
        <label>Título</label>
        <input
          type="text"
          name="titulo"
          placeholder="Ingrese el título del ticket"
          value={formData.titulo}
          onChange={handleChange}
          required
        />

        <label>Descripción</label>
        <input
          type="text"
          name="descripcion"
          placeholder="Ingrese una descripción"
          value={formData.descripcion}
          onChange={handleChange}
          required
        />

        <label>Prioridad</label>
        <select
          name="prioridad"
          value={formData.prioridad}
          onChange={handleChange}
          required
        >
          <option value="Alta">Alta</option>
          <option value="Media">Media</option>
          <option value="Baja">Baja</option>
        </select>

        <label>Estado</label>
        <select
          name="estado"
          value={formData.estado}
          onChange={handleChange}
          required
        >
          <option value="Abierto">Abierto</option>
          <option value="Cerrado">Cerrado</option>
        </select>

        <label>Departamento</label>
        <input
          type="number"
          name="id_departamento"
          placeholder="ID del departamento"
          value={formData.id_departamento}
          onChange={handleChange}
          required
        />

        <label>Categoría</label>
        <input
          type="number"
          name="id_categoria_ticket"
          placeholder="ID de la categoría"
          value={formData.id_categoria_ticket}
          onChange={handleChange}
          required
        />

        <div className="button-container">
          <button type="submit">Crear Ticket</button>
        </div>
      </form>
    </div>
  );
};

export default CreateTicketForm;
