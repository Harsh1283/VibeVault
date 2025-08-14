// src/components/Navbar.jsx
import React from "react";
// import "../pages/Home.css";
import "../components/navbar.css"

const Navbar = () => {
  return (
    <header className="navbar">
  <span className="navbar__icon" role="img" aria-label="music-note">
    <i className="ri-music-line"></i>
  </span>

  <h1 className="navbar__title font-serif-bold">Stream</h1>

  <span className="navbar__search" role="img" aria-label="search">
    <i className="ri-search-line"></i>
  </span>
</header>

  );
};

export default Navbar;
