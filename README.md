# CineTrack

Aplicação da disciplina de Programação de Sistemas Web, Universidade Estadual de Maringá (UEM).

Nome: Pedro Henrique de Oliveira Boro
RA: 140085

## Como rodar o backend

Na pasta `backend/`:

```bash
npm install
cp .env.example .env
npm run seed
npm run dev
```

A API fica em http://localhost:3000. O arquivo `.env` fica só na sua máquina.

## Como rodar o frontend

Em outro terminal, na pasta `frontend/`:

```bash
npm install
npm run dev
```

A interface fica em http://localhost:5173 e conversa com a API. Para gerar a versão de produção: `npm run build`.
