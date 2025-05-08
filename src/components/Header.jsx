import React from 'react';
import '../styles/Header.css';

function Header() {
  return (
    <header className="header">
        <div className="logo">
          <span className="check-icon">✓</span>
          <h1>Pomofocus</h1>
        </div>
        <div className="header-buttons">
          <button className="btn btn-secondary">
            <span className="btn-icon"><img src="/img/config-white.png" className = "seticon"/></span>
            <span className="btn-text">Setting</span>
          </button>
          <button className="btn btn-secondary">
            <span className="btn-icon">👤</span>
            <span className="btn-text">Sign In</span>
          </button>
          <button className="btn btn-icon-only">
            <span className="btn-icon">⋮</span>
          </button>
        </div>

    </header>
  );
}

export default Header;