import React, { useState } from 'react';
import './Menu.css';

function Menu({ addToCart }) {
  const [selectedPizza, setSelectedPizza] = useState(null);
  const [customizations, setCustomizations] = useState({});

  const pizzas = [
    {
      id: 1,
      name: 'Margherita',
      description: 'Molho de tomate, mussarela, manjericão fresco',
      price: 25.90,
      baseIngredients: ['Molho de tomate', 'Mussarela', 'Manjericão'],
      image: 'margherita'
    },
    {
      id: 2,
      name: 'Pepperoni',
      description: 'Molho de tomate, mussarela, pepperoni',
      price: 32.90,
      baseIngredients: ['Molho de tomate', 'Mussarela', 'Pepperoni'],
      image: 'pepperoni'
    },
    {
      id: 3,
      name: 'Calabresa',
      description: 'Molho de tomate, mussarela, calabresa, cebola',
      price: 28.90,
      baseIngredients: ['Molho de tomate', 'Mussarela', 'Calabresa', 'Cebola'],
      image: 'calabresa'
    },
    {
      id: 4,
      name: 'Quatro Queijos',
      description: 'Molho de tomate, mussarela, parmesão, provolone, gorgonzola',
      price: 35.90,
      baseIngredients: ['Molho de tomate', 'Mussarela', 'Parmesão', 'Provolone', 'Gorgonzola'],
      image: 'quatro-queijos'
    },
    {
      id: 5,
      name: 'Portuguesa',
      description: 'Molho de tomate, mussarela, presunto, ovos, cebola, azeitonas',
      price: 30.90,
      baseIngredients: ['Molho de tomate', 'Mussarela', 'Presunto', 'Ovos', 'Cebola', 'Azeitonas'],
      image: 'portuguesa'
    },
    {
      id: 6,
      name: 'Frango com Catupiry',
      description: 'Molho de tomate, mussarela, frango desfiado, catupiry',
      price: 33.90,
      baseIngredients: ['Molho de tomate', 'Mussarela', 'Frango desfiado', 'Catupiry'],
      image: 'frango-catupiry'
    }
  ];

  const availableIngredients = [
    'Pepperoni', 'Calabresa', 'Presunto', 'Frango desfiado', 'Atum',
    'Mussarela', 'Parmesão', 'Provolone', 'Gorgonzola', 'Catupiry',
    'Tomate', 'Cebola', 'Pimentão', 'Milho', 'Ervilha',
    'Azeitonas', 'Ovos', 'Manjericão', 'Orégano', 'Bacon'
  ];

  const handleCustomize = (pizza) => {
    setSelectedPizza(pizza);
    setCustomizations({});
  };

  const toggleIngredient = (ingredient) => {
    setCustomizations(prev => ({
      ...prev,
      [ingredient]: !prev[ingredient]
    }));
  };

  const addCustomizedPizza = () => {
    if (!selectedPizza) return;

    const selectedIngredients = Object.keys(customizations).filter(
      ingredient => customizations[ingredient]
    );

    const customizedPizza = {
      ...selectedPizza,
      customIngredients: selectedIngredients,
      finalPrice: selectedPizza.price + (selectedIngredients.length * 2)
    };

    addToCart(customizedPizza);
    setSelectedPizza(null);
    setCustomizations({});
  };

  const closeModal = () => {
    setSelectedPizza(null);
    setCustomizations({});
  };

  return (
    <div className="menu-container">
      <div className="container">
        <h1>🍕 Nosso Cardápio</h1>
        <p>Escolha sua pizza favorita e personalize com os ingredientes que você mais gosta!</p>

        <div className="pizzas-grid">
          {pizzas.map(pizza => (
            <div key={pizza.id} className="pizza-card">
              <div className={`pizza-image ${pizza.image}`}></div>
              <div className="pizza-info">
                <h3>{pizza.name}</h3>
                <p>{pizza.description}</p>
                <div className="ingredients">
                  <strong>Ingredientes:</strong>
                  <ul>
                    {pizza.baseIngredients.map((ingredient, index) => (
                      <li key={index}>{ingredient}</li>
                    ))}
                  </ul>
                </div>
                <div className="price">R$ {pizza.price.toFixed(2)}</div>
                <div className="pizza-actions">
                  <button 
                    className="btn btn-primary"
                    onClick={() => addToCart(pizza)}
                  >
                    Adicionar ao Carrinho
                  </button>
                  <button 
                    className="btn btn-secondary"
                    onClick={() => handleCustomize(pizza)}
                  >
                    Personalizar
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Modal de Personalização */}
        {selectedPizza && (
          <div className="modal-overlay" onClick={closeModal}>
            <div className="modal-content" onClick={e => e.stopPropagation()}>
              <div className="modal-header">
                <h2>Personalizar {selectedPizza.name}</h2>
                <button className="close-btn" onClick={closeModal}>×</button>
              </div>
              
              <div className="modal-body">
                <div className="base-pizza">
                  <h3>Pizza Base</h3>
                  <p>{selectedPizza.description}</p>
                  <p><strong>Preço base: R$ {selectedPizza.price.toFixed(2)}</strong></p>
                </div>

                <div className="customization-section">
                  <h3>Adicionar Ingredientes (+R$ 2,00 cada)</h3>
                  <div className="ingredients-grid">
                    {availableIngredients.map(ingredient => (
                      <label key={ingredient} className="ingredient-checkbox">
                        <input
                          type="checkbox"
                          checked={customizations[ingredient] || false}
                          onChange={() => toggleIngredient(ingredient)}
                        />
                        <span>{ingredient}</span>
                      </label>
                    ))}
                  </div>
                </div>

                <div className="selected-ingredients">
                  <h3>Ingredientes Selecionados:</h3>
                  <ul>
                    {selectedPizza.baseIngredients.map((ingredient, index) => (
                      <li key={index} className="base-ingredient">{ingredient}</li>
                    ))}
                    {Object.keys(customizations).filter(ingredient => customizations[ingredient]).map(ingredient => (
                      <li key={ingredient} className="custom-ingredient">+ {ingredient}</li>
                    ))}
                  </ul>
                </div>

                <div className="final-price">
                  <h3>Preço Final: R$ {
                    (selectedPizza.price + (Object.keys(customizations).filter(ingredient => customizations[ingredient]).length * 2)).toFixed(2)
                  }</h3>
                </div>
              </div>

              <div className="modal-footer">
                <button className="btn btn-secondary" onClick={closeModal}>
                  Cancelar
                </button>
                <button className="btn btn-primary" onClick={addCustomizedPizza}>
                  Adicionar ao Carrinho
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Menu; 