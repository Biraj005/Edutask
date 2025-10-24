import React from 'react';
import './Sidebar.css'
import { useContext } from 'react';
import { AuthContext } from '../../Store/AuthContext';

const Sidebar = ({ user, onClose }) => {
  const {Logout}  = useContext(AuthContext);
  return (
 
    <div className="sidebar-overlay" onClick={onClose}>
     
      <aside className="sidebar-content" onClick={(e) => e.stopPropagation()}>
        
        <div className="sidebar-header">
          <h3 className="sidebar-title">Profile</h3>
          <button className="close-btn" onClick={onClose}>&times;</button>
        </div>
        
        <div className="profile-section">
          <div className="profile-avatar-large">{user.name[0]}</div>
          <h4 className="profile-name">{user.name}</h4>
          <p className="profile-email">{user.email}</p>
        </div>

        <nav className="sidebar-nav">
          <a href="#" className="nav-item">My Account</a>
          <a href="#" className="nav-item">Settings</a>
          <a href="#" className="nav-item">Help</a>
        </nav>

        <div className="sidebar-footer">
          <a onClick={Logout} href="#" className="nav-item logout">Logout</a>
        </div>
      </aside>
    </div>
  );
};

export default Sidebar;