import React from 'react';
import './Cart.css';

function Cart({ cart, removeFromCart, updateQuantity }) {
  const calculateTotal = () => {
    return cart.reduce((total, item) => {
      const price = item.finalPrice || item.price;
      return total + (price * item.quantity);
    }, 0);
  };

  const handleQuantityChange = (pizzaId, newQuantity) => {
    updateQuantity(pizzaId, newQuantity);
  };

  const handleRemove = (pizzaId) => {
    removeFromCart(pizzaId);
  };

  if (cart.length === 0) {
    return (
      <div className="cart-container">
        <div className="container">
          <h1>🛒 Seu Carrinho</h1>
          <div className="empty-cart">
            <div className="empty-cart-icon">🛒</div>
            <h2>Seu carrinho está vazio</h2>
            <p>Adicione algumas pizzas deliciosas para começar!</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="cart-container">
      <div className="container">
        <h1>🛒 Seu Carrinho</h1>
        
        <div className="cart-content">
          <div className="cart-items">
            {cart.map((item) => (
              <div key={item.id} className="cart-item">
                <div className="item-image">
                  <div className={`pizza-image ${item.image}`}></div>
                </div>
                
                <div className="item-details">
                  <h3>{item.name}</h3>
                  <p className="item-description">{item.description}</p>
                  
                  {item.customIngredients && item.customIngredients.length > 0 && (
                    <div className="custom-ingredients">
                      <strong>Ingredientes adicionais:</strong>
                      <ul>
                        {item.customIngredients.map((ingredient, index) => (
                          <li key={index}>+ {ingredient}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                  
                  <div className="item-price">
                    R$ {(item.finalPrice || item.price).toFixed(2)}
                  </div>
                </div>
                
                <div className="item-quantity">
                  <label>Quantidade:</label>
                  <div className="quantity-controls">
                    <button 
                      className="quantity-btn"
                      onClick={() => handleQuantityChange(item.id, item.quantity - 1)}
                      disabled={item.quantity <= 1}
                    >
                      -
                    </button>
                    <span className="quantity-value">{item.quantity}</span>
                    <button 
                      className="quantity-btn"
                      onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
                    >
                      +
                    </button>
                  </div>
                </div>
                
                <div className="item-total">
                  <strong>Total:</strong>
                  <span>R$ {((item.finalPrice || item.price) * item.quantity).toFixed(2)}</span>
                </div>
                
                <div className="item-actions">
                  <button 
                    className="btn btn-secondary remove-btn"
                    onClick={() => handleRemove(item.id)}
                  >
                    Remover
                  </button>
                </div>
              </div>
            ))}
          </div>
          
          <div className="cart-summary">
            <div className="summary-card">
              <h3>Resumo do Pedido</h3>
              
              <div className="summary-items">
                {cart.map((item) => (
                  <div key={item.id} className="summary-item">
                    <span>{item.name} x{item.quantity}</span>
                    <span>R$ {((item.finalPrice || item.price) * item.quantity).toFixed(2)}</span>
                  </div>
                ))}
              </div>
              
              <div className="summary-total">
                <strong>Total do Pedido:</strong>
                <strong>R$ {calculateTotal().toFixed(2)}</strong>
              </div>
              
              <div className="delivery-info">
                <h4>Informações de Entrega</h4>
                <p>🕒 Tempo estimado: 30-45 minutos</p>
                <p>🚚 Taxa de entrega: R$ 5,00</p>
                <p>💳 Aceitamos cartões e dinheiro</p>
              </div>
              
              <div className="checkout-actions">
                <button className="btn btn-primary checkout-btn">
                  Finalizar Pedido
                </button>
                <button className="btn btn-secondary">
                  Continuar Comprando
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Cart; 