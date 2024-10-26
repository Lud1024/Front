// src/pages/UserCreationPage.jsx
import React from 'react';
import SidebarMenu from '../components/SidebarMenu';
import UserForm from '../components/UserForm';
import './UserCreationPage.css';

const UserCreationPage = () => {
  return (
    <div className="user-creation-page">
      <SidebarMenu />
      <div className="content">
        <UserForm />
      </div>
    </div>
  );
};

export default UserCreationPage;
