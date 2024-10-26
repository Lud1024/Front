// src/pages/CreateTicketPage.js
import React from 'react';
import CreateTicketForm from '../components/CreateTicketForm';
import SidebarMenu from '../components/SidebarMenu';
import './CreateTicketPage.css';

const CreateTicketPage = () => {
  return (
    <div className="create-ticket-page">
      <SidebarMenu />
      <div className="content">
        <CreateTicketForm />
      </div>
    </div>
  );
};

export default CreateTicketPage;
