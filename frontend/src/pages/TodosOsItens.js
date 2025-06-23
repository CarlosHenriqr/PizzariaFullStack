import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { pizzaAPI } from "../services/api";

function TodosOsItens() {
  const [pizzas, setPizzas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchPizzas = async () => {
      try {
        setLoading(true);
        const data = await pizzaAPI.getAll();
        setPizzas(data);
        setError("");
      } catch (err) {
        console.error('Erro ao carregar pizzas:', err);
        setError("Erro ao carregar pizzas. Verifique se o backend está rodando.");
      } finally {
        setLoading(false);
      }
    };

    fetchPizzas();
  }, []);

  return (
    <div className="page-container">
      <div className="container">
        <h1>🍕 Cardápio de Pizzas</h1>
        <p className="text-center mb-4">
          Confira nossa seleção de pizzas artesanais feitas com ingredientes frescos
        </p>

        {loading ? (
          <div className="loading">Carregando cardápio...</div>
        ) : error ? (
          <div className="alert alert-danger">
            {error}
            <br />
            <small>Certifique-se de que o backend está rodando na porta 8080</small>
          </div>
        ) : pizzas.length === 0 ? (
          <div className="empty-state">
            <h3>🍕 Nenhuma pizza disponível</h3>
            <p>Nenhuma pizza foi cadastrada ainda.</p>
            <Link to="/nova-pizza" className="btn btn-primary">
              Cadastrar Primeira Pizza
            </Link>
          </div>
        ) : (
          <div className="pizzas-grid">
            {pizzas.map((pizza) => (
              <div key={pizza.id} className="pizza-card">
                <div className={`pizza-image ${pizza.nome?.toLowerCase().includes('margherita') ? 'margherita' : 
                  pizza.nome?.toLowerCase().includes('pepperoni') ? 'pepperoni' : 
                  pizza.nome?.toLowerCase().includes('calabresa') ? 'calabresa' :
                  pizza.nome?.toLowerCase().includes('quatro') ? 'quatro-queijos' :
                  pizza.nome?.toLowerCase().includes('portuguesa') ? 'portuguesa' :
                  pizza.nome?.toLowerCase().includes('frango') ? 'frango-catupiry' : 'margherita'}`}>
                </div>
                <div className="pizza-info">
                  <h3>{pizza.nome}</h3>
                  <p>{pizza.descricao}</p>
                  <div className="ingredients">
                    <strong>Ingredientes:</strong>
                    <ul>
                      {pizza.descricao?.split(',').map((ingrediente, index) => (
                        <li key={index}>{ingrediente.trim()}</li>
                      ))}
                    </ul>
                  </div>
                  <div className="price">R$ {Number(pizza.preco).toFixed(2)}</div>
                  <div className="pizza-actions">
                    <Link to="/carrinho" className="btn btn-primary">
                      🛒 Adicionar ao Carrinho
                    </Link>
                    <Link to={`/admin`} className="btn btn-secondary">
                      📋 Ver Detalhes
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        <div className="text-center mt-4">
          <Link to="/carrinho" className="btn btn-success btn-lg">
            🛒 Ver Meu Carrinho
          </Link>
        </div>
      </div>
    </div>
  );
}

export default TodosOsItens;
