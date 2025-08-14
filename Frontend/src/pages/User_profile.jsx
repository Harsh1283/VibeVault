import React from "react";
import Navigation from "../components/Navigation";
import "./User_profile.css";
import { useSelector } from "react-redux";

const ProfilePage = () => {
  const {user} = useSelector((state) => state.auth);
  console.log(user);
  

  return (
    <div className="profile-section">
      <header className="profile-header">
        <span className="back-icon" role="img" aria-label="back">
          <i className="ri-arrow-left-line"></i>
        </span>
        <h2>Profile</h2>
      </header>

      <div className="profile-content">
        <div className="avatar-circle">
          <i className="ri-user-3-fill avatar-icon"></i>
        </div>
        <h3 className="user-name">Welcome, {user?.UserName}</h3>
        <p className="user-email">{user?.email}</p>
      </div>

      {/* Bottom Navigation */}
      <Navigation />
    </div>
  );
};

export default ProfilePage;
