// src/pages/UserListPage.jsx
import React from 'react';
import UserList from '../components/UserList';
import SidebarMenu from '../components/SidebarMenu';

const UserListPage = () => {
  return (
    <div>
      <SidebarMenu />
      <UserList />
    </div>
  );
};

export default UserListPage;
