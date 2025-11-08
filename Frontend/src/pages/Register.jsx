import React, { useState } from 'react';
import './Register.scss';
import { useNavigate, Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { registerUser } from '../features/auth/authSlice';

const Register = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { loading, error } = useSelector((state) => state.auth);

  // Two-way binding using useState
  const [UserName, setUserName] = useState('');
  const [Password, setPassword] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const result = await dispatch(registerUser({ UserName, Password })).unwrap();
      console.log(result);
      navigate('/');
    } catch (error) {
      console.error("Registration error:", error);
      alert(error?.message || "Registration failed. Try a different username.");
    }
  };

  return (
    <div>
      <section className='register-section'>
        <h1>VibeVault</h1>

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
          <button type="submit" disabled={loading}>
            {loading ? 'Registering...' : 'Register'}
          </button>
        </form>

        {error && <p className="error-message" style={{color: 'red', marginTop: '10px'}}>{error?.message || 'Registration failed'}</p>}

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
