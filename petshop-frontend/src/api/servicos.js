// Funções que conversam com a API do petshop (veja o projeto petshop-api).
//
// Usamos o "fetch", que já vem pronto no navegador — não precisa instalar
// nenhuma biblioteca extra para fazer requisições HTTP.
//
// Graças ao proxy configurado em vite.config.js, "/api/clientes" é
// redirecionado automaticamente para http://localhost:3001/api/clientes.

const BASE_URL = '/api/servicos'; // endereço base da API para serviços

// Busca a lista de todos os serviços cadastrados.
export async function listarServicos() {
  const resposta = await fetch(BASE_URL);
  if (!resposta.ok) {
    throw new Error('Não foi possível carregar os serviços.');
  }
  return resposta.json();
}

// Busca um único serviço pelo id_servico (usado na página de edição).
export async function buscarServico(id) {
  const resposta = await fetch(`${BASE_URL}/${id}`);
  if (!resposta.ok) {
    throw new Error('Serviço não encontrado.');
  }
  return resposta.json();
}

// Cria um novo serviço. "dados" é um objeto com os campos do formulário.
export async function criarServico(dados) {
  const resposta = await fetch(BASE_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(dados),
  });
  if (!resposta.ok) {
    throw new Error('Não foi possível cadastrar o serviço.');
  }
  return resposta.json();
}

// Atualiza um serviço já existente, identificado pelo id_servico.
export async function atualizarServico(id, dados) {
  const resposta = await fetch(`${BASE_URL}/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(dados),
  });
  if (!resposta.ok) {
    throw new Error('Não foi possível atualizar o serviço.');
  }
  return resposta.json();
}

// Remove um serviço pelo id_servico.
export async function removerServico(id) {
  const resposta = await fetch(`${BASE_URL}/${id}`, { method: 'DELETE' });
  if (!resposta.ok) {
    throw new Error('Não foi possível remover o serviço.');
  }
}

// ---------------------------------------------------------------------
// PONTO DE EXERCÍCIO
// ---------------------------------------------------------------------
// Para o cadastro de "serviços oferecidos", crie um arquivo parecido,
// por exemplo "src/api/servicos.js", copiando estas mesmas cinco
// funções e trocando BASE_URL para '/api/servicos'.
// ---------------------------------------------------------------------
