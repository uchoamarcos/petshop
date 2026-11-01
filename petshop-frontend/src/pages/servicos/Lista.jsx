import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import ServicoList from '../../components/ServicoList';
import { listarServicos, removerServico } from '../../api/servicos';

// Página de listagem: mostra a tabela de serviços e um botão para ir até
// a página de cadastro (/servicos/novo). Editar um serviço também leva
// para outra página (/servicos/:id/editar) — veja ServicoList.jsx.
function ServicosLista() {
  const [servicos, setServicos] = useState([]);
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState('');

  async function carregarServicos() {
    try {
      setErro('');
      setCarregando(true);
      const dados = await listarServicos();
      setServicos(dados);
    } catch {
      setErro('Não foi possível carregar os serviços. A API está rodando?');
    } finally {
      setCarregando(false);
    }
  }

  useEffect(() => {
    carregarServicos();
  }, []);

  async function handleRemover(id) {
    const confirmou = window.confirm('Tem certeza que deseja remover este serviço?');
    if (!confirmou) return;

    try {
      setErro('');
      await removerServico(id);
      await carregarServicos();
    } catch {
      setErro('Não foi possível remover o serviço.');
    }
  }

  return (
    <div className="container py-4">
      <Link to="/" className="btn btn-link ps-0 mb-3 text-decoration-none">
        ← Voltar
      </Link>

      <div className="d-flex justify-content-between align-items-center mb-4">
        <h1 className="mb-0">🐾 Serviços</h1>
        <Link to="/servicos/novo" className="btn btn-success">
          Novo serviço
        </Link>
      </div>

      {erro && (
        <div className="alert alert-danger" role="alert">
          {erro}
        </div>
      )}

      {carregando ? <p>Carregando...</p> : <ServicoList servicos={servicos} aoRemover={handleRemover} />}
    </div>
  );
}

export default ServicosLista;
