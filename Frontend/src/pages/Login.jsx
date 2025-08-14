import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import './Login.scss';
import { loginUser } from '../features/auth/authSlice'; // <-- Use correct case for import

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  // Two-way binding using useState
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async (event) => {
    event.preventDefault();

    try {
      const resultAction = await dispatch(loginUser({ username, password }));
      if (loginUser.fulfilled.match(resultAction)) {
        navigate('/');
      } else {
        alert("Login failed. Please check your credentials.");
      }
    } catch (error) {
      alert("Login failed. Please check your credentials.");
    }
  };

  return (
    <div className="login-container">
      <header className="login-header">
        <span className="logo">▲</span>
        <span className="brand">SoundStream</span>
      </header>

      <main className="login-main">
        <h2>Welcome back</h2>

        <form className="login-form" onSubmit={handleLogin}>
          <input
            id="username"
            type="text"
            placeholder="Email"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <input
            id="password"
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button type="submit">Log In</button>
        </form>
      </main>

      <footer className="login-footer">
        <span>Don't have an account? <Link to="/register">Sign Up</Link></span>
      </footer>
    </div>
  );
};

export default Login;
