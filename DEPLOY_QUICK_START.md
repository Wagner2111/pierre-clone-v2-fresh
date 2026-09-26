# 🚀 GUIA RÁPIDO DE DEPLOY (5 minutos)

## ANTES DE COMEÇAR

✅ Credenciais já preparadas:
- .env.production (Frontend)
- ackend/.env.production (Backend)

---

## PASSO 1: Upload para GitHub (2 min)

### 1.1 Criar repositório no GitHub
1. Ir para https://github.com/new
2. Nome: pierre-clone
3. Private ou Public (sua escolha)
4. Clicar em "Create repository"

### 1.2 Fazer Push
No PowerShell/Terminal:
\\\ash
cd C:\Users\wagne\OneDrive\Documentos\Claude\pierre-clone

git add .
git commit -m "Initial commit: Pierre Clone MVP - Full stack fintech app"
git branch -M main
git remote add origin https://github.com/SEU_USUARIO/pierre-clone.git
git push -u origin main
\\\

✅ Pronto! Repositório no ar.

---

## PASSO 2: Deploy Frontend - Vercel (1 min)

### 2.1 Ir para Vercel
1. https://vercel.com/
2. Clicar em "Sign Up" (se novo) ou "Sign In"
3. Escolher "GitHub" e autorizar

### 2.2 Importar Projeto
1. Clicar em "Add New" → "Project"
2. Selecionar repo pierre-clone
3. Clicar em "Import"

### 2.3 Configurar Variáveis
1. Em "Environment Variables", adicionar:
   - Name: NEXT_PUBLIC_API_URL
   - Value: https://pierre-clone-backend.railway.app
2. Clicar em "Add"

### 2.4 Deploy
- Clicar em "Deploy"
- ⏳ Esperar 1-2 min
- ✅ Link gerado: https://pierre-clone.vercel.app

---

## PASSO 3: Deploy Backend - Railway (1 min)

### 3.1 Ir para Railway
1. https://railway.app/
2. Clicar em "Start Project"
3. Escolher "Deploy from GitHub repo"

### 3.2 Conectar GitHub
1. Autorizar Railway a acessar GitHub
2. Selecionar repo pierre-clone
3. Clicar em "Deploy"

### 3.3 Configurar Variáveis (IMPORTANTE!)
1. Ir para "Variables" tab
2. Adicionar variáveis de \ackend/.env.production\:
   \\\
   PORT=5000
   NODE_ENV=production
   JWT_SECRET=pk_prod_4a8f92c1e5d3b7f9c2a6e8d1b5f3a9c7e2d6b8f1a4c7e9d2b5f8a1c4e7
   JWT_REFRESH_SECRET=pk_prod_refresh_8c2f5a9e1d4b7c6f3a8e2b5f9c1d4a7e2b5f8c1a4d7e0b3c6f9e2a5d8
   JWT_EXPIRATION=7d
   JWT_REFRESH_EXPIRATION=30d
   CORS_ORIGIN=https://pierre-clone.vercel.app
   DATABASE_URL=./pierre.db
   \\\
3. Clicar em "Deploy"

✅ Backend no ar: URL gerado automaticamente

---

## PASSO 4: Testar (1 min)

### 4.1 Frontend
1. Abrir https://pierre-clone.vercel.app
2. Clicar em "Register"
3. Preencher e submeter

### 4.2 Backend
1. Abrir https://pierre-clone-backend.railway.app/api/health
2. Deve mostrar: \{"status":"ok"}\

✅ PRONTO! Sistema em produção!

---

## ⚠️ TROUBLESHOOTING

### "Backend conexão recusada"
- Verificar CORS_ORIGIN no Railway matches Vercel URL
- Redeploiar Railway

### "401 Unauthorized"
- Verificar JWT_SECRET no .env.production
- Limpar cookies do navegador

### Build failed no Vercel
- Verificar node_modules em .gitignore
- Redeploiar

---

## 📊 Resumo Final

| Componente | URL | Status |
|-----------|-----|--------|
| Frontend | https://pierre-clone.vercel.app | ✅ Vercel |
| Backend | https://pierre-clone-backend.railway.app | ✅ Railway |
| Database | SQLite (local em Railway) | ✅ Pronto |
| Auth | JWT (seguro) | ✅ Pronto |

---

## 🎉 VOCÊ ESTÁ PRONTO!

Total de tempo: ~5 minutos
Status: Production Ready ✅
