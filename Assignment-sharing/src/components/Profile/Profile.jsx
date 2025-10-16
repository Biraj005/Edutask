import React from "react";
import "./Profile.css";

const Profile = ({ name, email, role }) => {
  return (
    <div className="profile-card">
      <div className="profile-avatar">{name[0]}</div>
      <div className="profile-info">
        <h4>{name}</h4>
        <p>{role}</p>
        <p>{email}</p>
      </div>
    </div>
  );
};

export default Profile;
