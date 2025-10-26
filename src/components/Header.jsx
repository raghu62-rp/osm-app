import React, { useState, useEffect } from 'react';
import Login from './Login';

const Header = ({ cartItemCount, onCartClick }) => {
  const [showLogin, setShowLogin] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const userStr = localStorage.getItem('user');
    if (userStr) {
      setUser(JSON.parse(userStr));
    }
  }, []);

  const handleLoginSuccess = (userData) => {
    setUser(userData);
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setUser(null);
  };

  return (
    <header className="header">
      <div className="container">
        <div className="header-content">
          <a href="#" className="logo">
            🛍️ ShopEasy
          </a>
          
          <nav className="nav">
            <a href="#" className="nav-link">Home</a>
            <a href="#products" className="nav-link">Products</a>
            <a href="#about" className="nav-link">About</a>
            <a href="#contact" className="nav-link">Contact</a>
            
            <button className="cart-btn" onClick={onCartClick}>
              🛒 Cart
              {cartItemCount > 0 && (
                <span className="cart-count">{cartItemCount}</span>
              )}
            </button>

            {user ? (
              <div className="user-menu">
                <span className="welcome-text">Hello, {user.name}</span>
                <button className="auth-btn" onClick={handleLogout}>
                  Logout
                </button>
              </div>
            ) : (
              <button className="auth-btn" onClick={() => setShowLogin(true)}>
                Login
              </button>
            )}
          </nav>
        </div>
      </div>

      {showLogin && (
        <Login 
          onClose={() => setShowLogin(false)} 
          onLoginSuccess={handleLoginSuccess}
        />
      )}
    </header>
  );
};

export default Header;