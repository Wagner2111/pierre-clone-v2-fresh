# 🚀 Pierre Backend - API Rest

## Setup Rápido

### 1. Instalação

```bash
cd backend
npm install
```

### 2. Configuração de Ambiente

```bash
cp .env.example .env
# Editar .env e alterar JWT_SECRET se necessário
```

### 3. Rodar em Desenvolvimento

```bash
npm run dev
```

Server rodará em `http://localhost:5000`

### 4. Build para Produção

```bash
npm run build
npm start
```

---

## 📊 Estrutura

```
backend/
├── src/
│   ├── index.ts              (Servidor principal)
│   ├── config/
│   │   └── database.ts       (SQLite inicialização)
│   ├── routes/
│   │   ├── auth.ts           (Login, Register)
│   │   ├── transactions.ts   (CRUD Transações)
│   │   └── accounts.ts       (CRUD Contas)
│   ├── middleware/
│   │   └── auth.ts           (Validação JWT)
│   └── utils/
│       └── jwt.ts            (Geração de tokens)
├── pierre.db                 (SQLite database)
├── package.json
├── tsconfig.json
└── .env
```

---

## 🔐 API Endpoints

### Auth
- `POST /api/auth/register` - Criar conta
- `POST /api/auth/login` - Login
- `POST /api/auth/logout` - Logout

### Transactions (Requer JWT)
- `GET /api/transactions` - Listar transações
- `POST /api/transactions` - Criar transação

### Accounts (Requer JWT)
- `GET /api/accounts` - Listar contas
- `POST /api/accounts` - Criar conta

---

## 🧪 Exemplo de Request

### Register
```bash
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "email": "user@example.com",
    "password": "password123",
    "name": "John Doe",
    "whatsapp": "+5511999999999"
  }'
```

### Login
```bash
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "user@example.com",
    "password": "password123"
  }'
```

### Get Transactions (com token)
```bash
curl -X GET http://localhost:5000/api/transactions \
  -H "Authorization: Bearer YOUR_ACCESS_TOKEN"
```

---

## 📚 Tech Stack

- **Node.js**: Runtime
- **Express.js**: Framework web
- **SQLite**: Banco de dados
- **JWT**: Autenticação
- **bcrypt**: Hash de senha
- **TypeScript**: Type safety

---

## ✅ Status

✅ Servidor Express configurado
✅ SQLite com 3 tabelas (users, transactions, accounts)
✅ Autenticação JWT com tokens
✅ Rotas CRUD completas
✅ Middleware de autenticação
✅ CORS configurado

Pronto para integração com frontend!
