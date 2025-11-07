import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../Store/AuthContext';
import './MyAccount.css';
import { FaUserCircle, FaSignOutAlt, FaEdit } from 'react-icons/fa';

const MyAccount = () => {
    const navigate = useNavigate();
    const { user, Logout } = useContext(AuthContext);

    if (!user) {
        navigate('/login');
        return null;
    }

    const handleLogout = () => {
        Logout();
        navigate('/login');
    };

    const handleEditProfile = () => {
        alert('Edit Profile feature coming soon!');
    };

    const capitalize = (s) => (s ? s.charAt(0).toUpperCase() + s.slice(1) : '');

    return (
        <div className="my-account-page">
            <div className="account-card">
                <header className="account-header">
                    <FaUserCircle className="account-avatar" />
                    <h2>{user.name || 'User Name'}</h2>
                    <p>{user.email || 'user@example.com'}</p>
                    <span className="role-badge">{capitalize(user.role)}</span>
                </header>

                <div className="account-body">
                    <div className="account-section actions">
                        <h3>Actions</h3>
                        <button className="account-action-btn edit-btn" onClick={handleEditProfile}>
                            <FaEdit /> Edit Profile
                        </button>
                        <button className="account-action-btn logout-btn" onClick={handleLogout}>
                            <FaSignOutAlt /> Logout
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MyAccount;
