import React, { useState } from 'react';
import './Register.scss';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';

const Register = () => {
  const navigate = useNavigate();

  // Two-way binding using useState
  const [UserName, setUserName] = useState('');
  const [Password, setPassword] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();

    axios.post("http://localhost:3000/auth/register",
      { UserName, Password },
      { withCredentials: true }
    )
    .then(response => {
      console.log(response.data);
      navigate('/');
    })
    .catch(error => {
      console.error("Registration error:", error);
      alert("Registration failed. Try a different username.");
    });
  };

  return (
    <div>
      <section className='register-section'>
        <h1>Sound Stream</h1>

        <div className="middle"></div>
        <h1>Create new Account</h1>

        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="UserName"
            value={UserName}
            onChange={(e) => setUserName(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            value={Password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button type="submit">Register</button>
        </form>

        <footer className="login-footer">
          <span>
            Already have an account? <Link to="/login">Login</Link>
          </span>
        </footer>
      </section>
    </div>
  );
};

export default Register;
