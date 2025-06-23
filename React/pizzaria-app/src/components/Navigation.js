import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import './Navigation.css';

function Navigation({ cartCount, onLogout }) {
  const location = useLocation();

  return (
    <nav className="navigation">
      <div className="nav-container">
        <div className="nav-brand">
          <Link to="/home">🍕 Pizzaria App</Link>
        </div>
        <div className="nav-menu">
          <Link 
            to="/home" 
            className={`nav-link ${location.pathname === '/home' ? 'active' : ''}`}
          >
            Início
          </Link>
          <Link 
            to="/menu" 
            className={`nav-link ${location.pathname === '/menu' ? 'active' : ''}`}
          >
            Cardápio
          </Link>
          <Link 
            to="/cart" 
            className={`nav-link cart-link ${location.pathname === '/cart' ? 'active' : ''}`}
          >
            🛒 Carrinho
            {cartCount > 0 && <span className="cart-count">{cartCount}</span>}
          </Link>
          <button onClick={onLogout} className="nav-link logout-btn">
            Sair
          </button>
        </div>
      </div>
    </nav>
  );
}

export default Navigation; 