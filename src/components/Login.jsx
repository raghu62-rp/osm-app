import React, { useState } from 'react';
import { API_BASE_URL } from '../config';
import { login } from '../services/api.js';

const Login = ({ onClose, onLoginSuccess }) => {
  const [isSignup, setIsSignup] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      if (!isSignup) {
        // Use centralized login helper which includes network fallback in development
        const data = await login(formData.email, formData.password);

        localStorage.setItem('user', JSON.stringify({
          id: data._id || data.id || 'local-user-1',
          name: data.name || 'Local Dev',
          email: data.email || formData.email,
        }));

        onLoginSuccess(data);
        onClose();
      } else {
        // Fallback to original register flow for signups
        const response = await fetch(`${API_BASE_URL}/auth/register`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(formData),
        });

        const data = await response.json();
        if (!response.ok) {
          throw new Error(data.message || 'Registration failed');
        }

        localStorage.setItem('token', data.token);
        localStorage.setItem('user', JSON.stringify({
          id: data._id,
          name: data.name,
          email: data.email,
        }));

        onLoginSuccess(data);
        onClose();
      }
    } catch (err) {
      // Show a friendlier message for network/backend issues and offer demo login
      if (err.message && (err.message.toLowerCase().includes('failed to fetch') || err.message.toLowerCase().includes('unable to reach'))) {
        setError('Unable to reach authentication server. You can try Demo login to continue without a backend.');
      } else {
        setError(err.message);
      }
    } finally {
      setLoading(false);
    }
  };

  const handleDemoLogin = () => {
    const demoUser = {
      token: 'demo-token',
      _id: 'demo-user-1',
      name: 'Demo User',
      email: 'demo@example.com',
    };
    localStorage.setItem('token', demoUser.token);
    localStorage.setItem('user', JSON.stringify({ id: demoUser._id, name: demoUser.name, email: demoUser.email }));
    onLoginSuccess(demoUser);
    onClose();
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="auth-modal-overlay" onClick={onClose}>
      <div className="auth-modal" onClick={e => e.stopPropagation()}>
        <div className="auth-header">
          <h2>{isSignup ? 'Create Account' : 'Welcome Back'}</h2>
          <button className="close-btn" onClick={onClose}>✕</button>
        </div>

        <form onSubmit={handleSubmit}>
          {error && <div className="auth-error">{error}</div>}

          {isSignup && (
            <div className="form-group">
              <label htmlFor="name">Name</label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required={isSignup}
                placeholder="Enter your name"
              />
            </div>
          )}

          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              placeholder="Enter your email"
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
              placeholder="Enter your password"
            />
          </div>

          <button type="submit" className="auth-submit-btn" disabled={loading}>
            {loading ? 'Please wait...' : (isSignup ? 'Create Account' : 'Login')}
          </button>
          {!loading && (
            <button type="button" className="auth-demo-btn" onClick={handleDemoLogin}>
              Demo login
            </button>
          )}
        </form>

        <div className="auth-footer">
          <p>
            {isSignup ? 'Already have an account?' : "Don't have an account?"}
            <button 
              className="switch-auth-btn"
              onClick={() => setIsSignup(!isSignup)}
            >
              {isSignup ? 'Login' : 'Sign Up'}
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;