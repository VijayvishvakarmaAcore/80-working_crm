import React from 'react';

const Topbar = ({ user, onLogout }) => (
  <header className="topbar">
    <h1>Employee Tracking System</h1>
    <div className="topbar-right">
      <div className="topbar-user">
        <div>
          <div className="user-name">{user.name}</div>
          <div className="user-role">{user.role} • {user.department || 'Administration'}</div>
        </div>
        <div className="user-avatar">{user.name[0]}</div>
      </div>
      <button className="btn-logout" onClick={onLogout}>🚪 Logout</button>
    </div>
  </header>
);

export default Topbar;