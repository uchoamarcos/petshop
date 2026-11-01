// API do Petshop
// -----------------------------------------------------------------------
// Servidor Express que expõe as rotas REST do sistema. Cada entidade
// (cliente, serviço, etc.) tem seu próprio arquivo de rotas dentro de
// routes/ — assim o projeto continua organizado mesmo com mais tabelas.
//
// Veja também o README.md deste projeto.
// -----------------------------------------------------------------------
import express from 'express';
import cors from 'cors';
import clientesRouter from './routes/clientes.js';
import servicosRouter from './routes/servicos.js'; // 
const app = express();
const PORT = 3001;
app.use(cors());
app.use(express.json());
app.use('/api/clientes', clientesRouter);
app.use('/api/servicos', servicosRouter); 
app.listen(PORT, () => {
  console.log(`API do petshop rodando em http://localhost:${PORT}`);
});