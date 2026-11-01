import { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import ServicoForm from '../../components/ServicoForm';
import { buscarServico, criarServico, atualizarServico } from '../../api/servicos';

// Página de cadastro/edição de um serviço.
//
// A mesma página serve para os dois casos:
// - /servicos/novo          -> não tem ":id" na rota, então é criação
// - /servicos/:id/editar     -> tem ":id" na rota, então é edição
function ServicoFormulario() {
  const { id } = useParams();
  const navigate = useNavigate();
  const modoEdicao = Boolean(id);

  // Na criação já começamos com um objeto vazio (o ServicoForm preenche os
  // valores padrão). Na edição começamos com "null" até a API responder.
  const [valoresIniciais, setValoresIniciais] = useState(modoEdicao ? null : {});
  const [erro, setErro] = useState('');

  useEffect(() => {
    if (!modoEdicao) return;

    async function carregarServico() {
      try {
        const servico = await buscarServico(id);
        setValoresIniciais(servico);
      } catch {
        setErro('Não foi possível carregar este serviço.');
      }
    }
    carregarServico();
  }, [id, modoEdicao]);

  async function handleSalvar(dados) {
    try {
      setErro('');
      if (modoEdicao) {
        await atualizarServico(id, dados);
      } else {
        await criarServico(dados);
      }
      navigate('/servicos');
    } catch {
      setErro('Não foi possível salvar o serviço.');
    }
  }

  return (
    <div className="container py-4">
      <Link to="/servicos" className="btn btn-link ps-0 mb-3 text-decoration-none">
        ← Voltar para a lista
      </Link>

      <h1 className="mb-4">{modoEdicao ? 'Editar serviço' : 'Novo serviço'}</h1>

      {erro && (
        <div className="alert alert-danger" role="alert">
          {erro}
        </div>
      )}

      {!valoresIniciais && !erro && <p>Carregando...</p>}

      {valoresIniciais && (
        <ServicoForm
          valoresIniciais={valoresIniciais}
          modoEdicao={modoEdicao}
          aoSalvar={handleSalvar}
          aoCancelar={() => navigate('/servicos')}
        />
      )}
    </div>
  );
}

export default ServicoFormulario;
