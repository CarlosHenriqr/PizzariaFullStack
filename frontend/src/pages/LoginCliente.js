import React, { useState } from "react";
import { clienteAPI, carrinhoAPI } from "../services/api";
import { useNavigate } from "react-router-dom";

export default function LoginCliente() {
  const [email, setEmail] = useState("");
  const [mensagem, setMensagem] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMensagem("");
    setLoading(true);
    try {
      // Busca todos os clientes e encontra pelo e-mail
      const clientes = await clienteAPI.getAll();
      const cliente = clientes.find((c) => c.email === email);
      if (cliente) {
        localStorage.setItem("clienteId", cliente.id);
        localStorage.setItem("clienteNome", cliente.nome);
        localStorage.setItem("clienteEmail", cliente.email);
        // Buscar carrinho do cliente
        const carrinhos = await carrinhoAPI.getAll();
        const carrinho = carrinhos.find((c) => c.cliente && c.cliente.id === cliente.id);
        if (carrinho) {
          localStorage.setItem("carrinhoId", carrinho.id);
        } else {
          localStorage.removeItem("carrinhoId");
        }
        setMensagem("Login realizado! Redirecionando...");
        setTimeout(() => navigate("/"), 1200);
      } else {
        setMensagem("E-mail não encontrado. Cadastre-se!");
      }
    } catch (err) {
      setMensagem("Erro ao fazer login. Tente novamente.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="page-container">
      <div className="container">
        <div className="form-container">
          <h2>Login de Cliente</h2>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="email">E-mail</label>
              <input
                id="email"
                name="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                disabled={loading}
              />
            </div>
            <button type="submit" className="btn btn-primary" disabled={loading}>
              {loading ? "Entrando..." : "Entrar"}
            </button>
          </form>
          {mensagem && <div className="alert alert-info mt-3">{mensagem}</div>}
          <div className="mt-3 text-center">
            <span>Não tem conta? </span>
            <a href="/cadastro-cliente">Cadastre-se</a>
          </div>
        </div>
      </div>
    </div>
  );
} 