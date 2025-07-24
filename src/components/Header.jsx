import React from 'react';
import '../styles/Header.css';
import { useNavigate } from 'react-router-dom';

function Header() {
  const navigate = useNavigate();
  return (
    <header className="header">
        <div className="logo" style={{cursor: 'pointer'}} onClick={() => navigate('/')}> 
          <span className="check-icon">✓</span>
          <h1>Pomofocus</h1>
        </div>
        <div className="header-buttons">
          <button className="btn btn-secondary" onClick={() => navigate('/about')}>
            <span className="btn-icon">ℹ️</span>
            <span className="btn-text">About Us</span>
          </button>
          <button className="btn btn-secondary" onClick={() => navigate('/login')}>
            <span className="btn-icon">👤</span>
            <span className="btn-text">Login</span>
          </button>
        </div>

    </header>
  );
}

export default Header;