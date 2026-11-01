// Rotas do cadastro de serviços.
//
// Esse arquivo só cuida da tabela "servicos". Ele é "montado" em um
// endereço base (/api/servicos) lá em server.js, por isso as rotas aqui
// dentro começam em "/" (a lista) e "/:id" (um serviço específico), e não
// em "/api/servicos".

import { Router } from 'express';
import db from '../database.js';

const router = Router(); // Criado no lugar correto, antes de qualquer uso!

// Campos que toda requisição de criação/atualização de serviço precisa ter.
const CAMPOS_OBRIGATORIOS = ['nome_servico', 'preco'];

// Confere se o corpo da requisição tem os campos obrigatórios preenchidos.
function validarServico(dados) {
  for (const campo of CAMPOS_OBRIGATORIOS) {
    if (!dados[campo] || String(dados[campo]).trim() === '') {
      return `O campo "${campo}" é obrigatório.`;
    }
  }
  return null;
}

// GET /api/servicos -> lista todos os serviços, do mais recente para o mais antigo
router.get('/', (req, res) => {
  const servicos = db
    .prepare('SELECT * FROM servicos ORDER BY id_servico DESC')
    .all();
  res.json(servicos);
});

// GET /api/servicos/:id -> busca um único serviço
router.get('/:id', (req, res) => {
  const servico = db
    .prepare('SELECT * FROM servicos WHERE id_servico = ?')
    .get(req.params.id);

  if (!servico) {
    return res.status(404).json({ erro: 'Serviço não encontrado.' });
  }
  res.json(servico);
});

// POST /api/servicos -> cria um novo serviço
router.post('/', (req, res) => {
  const erro = validarServico(req.body);
  if (erro) {
    return res.status(400).json({ erro });
  }

  // Os campos opcionais recebem "null" quando não vierem na requisição:
  // o SQLite aceita null (campo vazio), mas não aceita undefined.
  const {
    nome_servico,
    descricao,
    preco,
    duracao_minutos,
  } = req.body;

  const resultado = db
    .prepare(
      `INSERT INTO servicos
        (nome_servico, descricao, preco, duracao_minutos)
       VALUES (?, ?, ?, ?)`
    )
    .run(nome_servico, descricao || null, preco, duracao_minutos || null);

  const novoServico = db
    .prepare('SELECT * FROM servicos WHERE id_servico = ?')
    .get(resultado.lastInsertRowid);

  res.status(201).json(novoServico);
});

// PUT /api/servicos/:id -> updates um serviço existente
router.put('/:id', (req, res) => {
  const erro = validarServico(req.body);
  if (erro) {
    return res.status(400).json({ erro });
  }

  const servicoExistente = db
    .prepare('SELECT * FROM servicos WHERE id_servico = ?')
    .get(req.params.id);

  if (!servicoExistente) {
    return res.status(404).json({ erro: 'Serviço não encontrado.' });
  }

  const {
    nome_servico,
    descricao,
    preco,
    duracao_minutos,
  } = req.body;

  db.prepare(
    `UPDATE servicos SET
       nome_servico = ?, descricao = ?, preco = ?, duracao_minutos = ?
     WHERE id_servico = ?`
  ).run(nome_servico, descricao || null, preco, duracao_minutos || null, req.params.id);

  const servicoAtualizado = db
    .prepare('SELECT * FROM servicos WHERE id_servico = ?')
    .get(req.params.id);

  res.json(servicoAtualizado);
});

// DELETE /api/servicos/:id -> remove um serviço
router.delete('/:id', (req, res) => {
  const resultado = db
    .prepare('DELETE FROM servicos WHERE id_servico = ?')
    .run(req.params.id);

  if (resultado.changes === 0) {
    return res.status(404).json({ erro: 'Serviço não encontrado.' });
  }

  res.status(204).send();
});

export default router;
