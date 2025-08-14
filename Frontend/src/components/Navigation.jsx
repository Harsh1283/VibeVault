import React from "react";
import { useNavigate } from "react-router-dom";
import "./Navigation.css";

const Navigation = () => {
  const navigate = useNavigate();

  return (
    <nav className="bottom-nav">
      {/* Navigation icons */}
      <ul>
        <li className="active" onClick={() => navigate("/")}> {/* Home */}
          <span role="img" aria-label="home"><i className="ri-home-9-fill"></i></span>
        </li>
        <li onClick={() => navigate("/search")}> {/* Search */}
          <span role="img" aria-label="search"><i className="ri-search-line"></i></span>
        </li>
        <li onClick={() => navigate("/upload")}> {/* Upload */}
          <span role="img" aria-label="bookmark"><i className="ri-bookmark-fill"></i></span>
        </li>
        <li onClick={() => navigate("/profile")}> {/* Profile */}
          <span role="img" aria-label="user"><i className="ri-user-line"></i></span>
        </li>
      </ul>
    </nav>
  );
};

export default Navigation;
