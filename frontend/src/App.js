import "./App.css";
import Navbar from "./layout/Navbar";
import Home from "./pages/Home";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AddUser from "./users/AddUser";
import EditUser from "./users/EditUser";
import ViewUser from "./users/ViewUser";
import ClienteCadastro from "./pages/ClienteCadastro";
import Carrinho from "./pages/Carrinho";
import FinalizarPedido from "./pages/FinalizarPedido";
import HistoricoPedidos from "./pages/HistoricoPedidos";
import TodosOsItens from "./pages/TodosOsItens";
import CrudPizzas from "./pages/CrudPizzas";
import React from "react";
import PainelAdmin from "./pages/PainelAdmin";
import BackendStatus from "./components/BackendStatus";
import LoginCliente from "./pages/LoginCliente";
import CadastroCliente from "./pages/CadastroCliente";

function App() {
  // Exemplo: clienteId e carrinhoId fixos para teste
  const [clienteId] = React.useState(localStorage.getItem("clienteId") || 1);
  const [carrinhoId] = React.useState(1);
  
  return (
    <div className="App">
      <Router>
        <Navbar />
        <main className="main-content">
          <Routes>
            <Route exact path="/" element={<Home />} />
            <Route exact path="/pizzas" element={<TodosOsItens />} />
            <Route exact path="/carrinho" element={<Carrinho carrinhoId={carrinhoId} />} />
            <Route exact path="/pedidos" element={<HistoricoPedidos />} />
            <Route exact path="/finalizar-pedido" element={<FinalizarPedido />} />
            <Route exact path="/admin" element={<PainelAdmin />} />
            <Route exact path="/novo-cliente" element={<ClienteCadastro />} />
            <Route exact path="/nova-pizza" element={<CrudPizzas modoCriacao={true} />} />
            <Route exact path="/gerenciar-pizzas" element={<CrudPizzas modoCriacao={false} />} />
            <Route exact path="/users" element={<AddUser />} />
            <Route exact path="/edituser/:id" element={<EditUser />} />
            <Route exact path="/viewuser/:id" element={<ViewUser />} />
            <Route exact path="/login-cliente" element={<LoginCliente />} />
            <Route exact path="/cadastro-cliente" element={<CadastroCliente />} />
          </Routes>
        </main>
        <BackendStatus />
      </Router>
    </div>
  );
}

export default App;
