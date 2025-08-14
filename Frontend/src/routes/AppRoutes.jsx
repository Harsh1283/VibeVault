
import React from 'react';
import { useSelector } from 'react-redux';
import { Routes, Route, Navigate, Outlet } from 'react-router-dom';

import Home from '../pages/Home';
import Login from '../pages/Login';
import Register from '../pages/Register';
import Search from '../pages/Search';
import Upload from '../pages/Upload';
import User_profile from '../pages/User_profile';

// This component protects routes that require a user to be logged in
const ProtectedRoute = () => {
  const { isAuthenticated } = useSelector((state) => state.auth);
  // If user is authenticated, show the page (<Outlet />). Otherwise, redirect to login.
  return isAuthenticated ? <Outlet /> : <Navigate to="/login" replace />;
};

// This component is for routes that should only be seen by logged-out users
const PublicRoute = () => {
  const { isAuthenticated } = useSelector((state) => state.auth);
  // If user is authenticated, redirect them to the home page. Otherwise, show the page.
  return !isAuthenticated ? <Outlet /> : <Navigate to="/" replace />;
};

function AppRoutes() {
  return (
    <Routes>
      {/* Routes only for logged-out users (Login, Register) */}
      <Route element={<PublicRoute />}>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Route>

      {/* Protected routes only for logged-in users (Home, Search, etc.) */}
      <Route element={<ProtectedRoute />}>
        <Route path="/" element={<Home />} />
        <Route path="/search" element={<Search />} />
        <Route path="/upload" element={<Upload />} />
        <Route path="/profile" element={<User_profile />} />
        {/* Add any other protected routes here */}
      </Route>

      {/* Fallback route to redirect any unknown paths to the home page */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

export default AppRoutes;