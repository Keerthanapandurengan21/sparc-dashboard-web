import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import './Login.scss';
import { loginService } from '../../redux/services/AuthService';
import SparcLogo from '../../assests/Images/SparcLogo.png';
import UserLogo from '../../assests/Images/UserLogo.png';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { loading, isAuthenticated, error } = useSelector((state) => state.auth);

  const handleLogin = (e) => {
    e.preventDefault();
    dispatch(loginService({ email, password }))
      .then(() => {
        if (isAuthenticated) {
          localStorage.setItem('selectedSite', 'forever21');
          navigate('/dashboard');
        }
      })
      .catch((err) => {
        alert(err);
      });
  };

  return (
    <div className="login-container">
      <div className="login-image">
        <img src={SparcLogo} alt="Sparc Logo" />
      </div>
      <div className="login-form">
        <img src={UserLogo} alt="User Logo" className="user-logo" />
        {error && <p className="error-message">{error}</p>}
        <form onSubmit={handleLogin}>
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button type="submit" className="login-btn" disabled={loading}>
            {loading ? 'Logging in...' : 'Login'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
