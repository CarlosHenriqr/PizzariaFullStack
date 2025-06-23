import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './components/Login';
import Register from './components/Register';
import Home from './components/Home';
import Menu from './components/Menu';
import Cart from './components/Cart';
import Navigation from './components/Navigation';
import './App.css';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [cart, setCart] = useState([]);

  const addToCart = (pizza) => {
    setCart(prevCart => {
      const existingItem = prevCart.find(item => item.id === pizza.id);
      if (existingItem) {
        return prevCart.map(item =>
          item.id === pizza.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prevCart, { ...pizza, quantity: 1 }];
    });
  };

  const removeFromCart = (pizzaId) => {
    setCart(prevCart => prevCart.filter(item => item.id !== pizzaId));
  };

  const updateQuantity = (pizzaId, newQuantity) => {
    if (newQuantity <= 0) {
      removeFromCart(pizzaId);
      return;
    }
    setCart(prevCart =>
      prevCart.map(item =>
        item.id === pizzaId
          ? { ...item, quantity: newQuantity }
          : item
      )
    );
  };

  const handleLogin = () => {
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setCart([]);
  };

  return (
    <Router>
      <div className="App">
        {isLoggedIn && <Navigation cartCount={cart.length} onLogout={handleLogout} />}
        <div className="main-content">
          <Routes>
            <Route 
              path="/login" 
              element={
                !isLoggedIn ? (
                  <Login onLogin={handleLogin} />
                ) : (
                  <Navigate to="/home" replace />
                )
              } 
            />
            <Route 
              path="/register" 
              element={
                !isLoggedIn ? (
                  <Register onLogin={handleLogin} />
                ) : (
                  <Navigate to="/home" replace />
                )
              } 
            />
            <Route 
              path="/home" 
              element={
                isLoggedIn ? (
                  <Home />
                ) : (
                  <Navigate to="/login" replace />
                )
              } 
            />
            <Route 
              path="/menu" 
              element={
                isLoggedIn ? (
                  <Menu addToCart={addToCart} />
                ) : (
                  <Navigate to="/login" replace />
                )
              } 
            />
            <Route 
              path="/cart" 
              element={
                isLoggedIn ? (
                  <Cart 
                    cart={cart} 
                    removeFromCart={removeFromCart} 
                    updateQuantity={updateQuantity}
                  />
                ) : (
                  <Navigate to="/login" replace />
                )
              } 
            />
            <Route 
              path="/" 
              element={
                isLoggedIn ? (
                  <Navigate to="/home" replace />
                ) : (
                  <Navigate to="/login" replace />
                )
              } 
            />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App; 