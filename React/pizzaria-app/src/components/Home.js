import React from 'react';
import { Link } from 'react-router-dom';
import './Home.css';

function Home() {
  return (
    <div className="home-container">
      <div className="container">
        <h1>🍕 Bem-vindo à Pizzaria App</h1>
        <p>Descubra as melhores pizzas artesanais feitas com ingredientes frescos e de qualidade!</p>
        
        <div className="cta-buttons">
          <Link to="/menu" className="btn btn-primary">
            Ver Cardápio
          </Link>
          <Link to="/cart" className="btn btn-secondary">
            Ver Carrinho
          </Link>
        </div>

        <div className="features">
          <div className="feature-card">
            <h3>🍅 Ingredientes Frescos</h3>
            <p>Nossas pizzas são preparadas com ingredientes selecionados e frescos, garantindo o melhor sabor em cada pedaço.</p>
          </div>
          
          <div className="feature-card">
            <h3>⚡ Entrega Rápida</h3>
            <p>Entregamos suas pizzas quentinhas em até 30 minutos, para que você possa aproveitar o melhor momento.</p>
          </div>
          
          <div className="feature-card">
            <h3>🎨 Personalização</h3>
            <p>Personalize sua pizza escolhendo os ingredientes que mais gosta. Cada pizza é única como você!</p>
          </div>
          
          <div className="feature-card">
            <h3>💳 Pagamento Seguro</h3>
            <p>Realize seus pedidos com segurança através de nossos métodos de pagamento confiáveis e seguros.</p>
          </div>
        </div>

        <div className="popular-pizzas">
          <h2>Pizzas Mais Populares</h2>
          <div className="pizza-grid">
            <div className="pizza-card">
              <div className="pizza-image margherita"></div>
              <h3>Margherita</h3>
              <p>Molho de tomate, mussarela, manjericão fresco</p>
              <span className="price">R$ 25,90</span>
            </div>
            
            <div className="pizza-card">
              <div className="pizza-image pepperoni"></div>
              <h3>Pepperoni</h3>
              <p>Molho de tomate, mussarela, pepperoni</p>
              <span className="price">R$ 32,90</span>
            </div>
            
            <div className="pizza-card">
              <div className="pizza-image calabresa"></div>
              <h3>Calabresa</h3>
              <p>Molho de tomate, mussarela, calabresa, cebola</p>
              <span className="price">R$ 28,90</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home; 