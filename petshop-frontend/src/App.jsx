import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import ClientesLista from './pages/clientes/Lista';
import ClienteFormulario from './pages/clientes/Formulario';
import ServicosLista from './pages/servicos/Lista';
import ServicoFormulario from './pages/servicos/Formulario';

// Cada <Route> liga um endereço (path) a uma página (element).
//
// O cadastro de clientes usa três rotas: uma para listar, e duas que
// reaproveitam a mesma página de formulário (uma para criar, outra para
// editar um cliente já existente, usando o parâmetro ":id").
//
// PONTO DE EXERCÍCIO: quando o cadastro de "Serviços" estiver pronto, o
// mais comum é seguir o mesmo padrão: "/servicos", "/servicos/novo" e
// "/servicos/:id/editar".
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/clientes" element={<ClientesLista />} />
        <Route path="/clientes/novo" element={<ClienteFormulario />} />
        <Route path="/clientes/:id/editar" element={<ClienteFormulario />} />
        <Route path="/servicos" element={<ServicosLista />} />
        <Route path="/servicos/novo" element={<ServicoFormulario />} />
        <Route path="/servicos/editar/:id" element={<ServicoFormulario />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
