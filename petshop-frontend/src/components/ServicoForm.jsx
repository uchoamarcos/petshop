import { useEffect } from 'react';
import { useForm } from 'react-hook-form';

// Valores padrão para os campos que a página de criação não informa.
const VALORES_PADRAO = {
  nome_servico: '',
  descricao: '',
  preco: '',
  duracao_minutos: '',
};

// Formulário de cadastro/edição de serviços, usando a biblioteca
// react-hook-form para cuidar do estado dos campos e das validações,
// e classes do Bootstrap para o layout (grid, form-control, etc.).
//
// Esse componente não sabe se está criando ou editando: quem decide isso
// é a página que o usa (veja src/pages/servicos/Formulario.jsx), passando
// os valores iniciais e o que fazer ao salvar/cancelar.
function ServicoForm({ valoresIniciais, modoEdicao, aoSalvar, aoCancelar }) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({ defaultValues: { ...VALORES_PADRAO, ...valoresIniciais } });

  // Se os valores iniciais chegarem depois (ex.: enquanto a página busca o
  // cliente na API), atualizamos o formulário assim que eles ficarem prontos.
  useEffect(() => {
    reset({ ...VALORES_PADRAO, ...valoresIniciais });
  }, [valoresIniciais, reset]);

  return (
    <form className="card" onSubmit={handleSubmit(aoSalvar)}>
      <div className="card-body">
        <div className="row g-3">
          <div className="col-md-6">
            <label htmlFor="nome_servico" className="form-label">
              Nome do serviço
            </label>
            <input
              id="nome_servico"
              className={`form-control ${errors.nome_servico ? 'is-invalid' : ''}`}
              {...register('nome_servico', { required: 'Informe o nome do serviço.' })}
            />
            {errors.nome_servico && <div className="invalid-feedback">{errors.nome_servico.message}</div>}
          </div>

          <div className="col-md-6">
            <label htmlFor="preco" className="form-label">
              Preço
            </label>
            <input
              id="preco"
              type="number"
              step="0.01"
              className={`form-control ${errors.preco ? 'is-invalid' : ''}`}
              {...register('preco', { required: 'Informe o preço.' })}
            />
            {errors.preco && <div className="invalid-feedback">{errors.preco.message}</div>}
          </div>

          <div className="col-md-6">
            <label htmlFor="duracao_minutos" className="form-label">
              Duração (minutos) — Opcional
            </label>
            <input
              id="duracao_minutos"
              type="number"
              className="form-control"
              {...register('duracao_minutos')} // Removido o required para ficar opcional
            />
          </div>

          <div className="col-md-6">
            <label htmlFor="descricao" className="form-label">
              Descrição — Opcional
            </label>
            <input
              id="descricao"
              className="form-control"
              {...register('descricao')} // Removido o required para ficar opcional
            />
          </div>
        </div>

        <div className="mt-4 d-flex gap-2">
          <button type="submit" className="btn btn-success" disabled={isSubmitting}>
            {modoEdicao ? 'Salvar alterações' : 'Cadastrar'}
          </button>
          <button type="button" className="btn btn-outline-secondary" onClick={aoCancelar}>
            Cancelar
          </button>
        </div>
      </div>
    </form>
  );
}

export default ServicoForm;

