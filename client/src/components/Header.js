import React from 'react';
import { NavLink } from 'react-router-dom';

const Header = props => {
  return (
    <div>
      <h1>Welcome to WebAuth-I React Page</h1>
      <div className="header-menu">
        <NavLink>Login</NavLink>
        <NavLink>Users</NavLink>
        <NavLink>Register</NavLink>
      </div>
    </div>
  );
};

export default Header;
