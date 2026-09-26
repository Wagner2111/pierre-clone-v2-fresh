# 🚀 Guia Completo: Deploy em Produção

## 📊 Visão Geral

```
Frontend (Vercel)     ←→     Backend (Railway)
  Vercel.app                Railway.app
   (React/Next)            (Node/Express)
```

---

## 🌐 PARTE 1: Deploy Frontend no Vercel

### Passo 1: Preparar Repositório

```bash
# Garantir que tudo está commitado
git add .
git commit -m "Deploy: prepare for production"
git push origin main
```

### Passo 2: Conectar com Vercel

1. Ir para https://vercel.com
2. Clicar em "New Project"
3. Conectar sua conta GitHub
4. Selecionar repositório `pierre-clone`
5. Vercel detectará automaticamente Next.js

### Passo 3: Configurar Variáveis de Ambiente

Em Vercel Dashboard:
1. Ir para Settings → Environment Variables
2. Adicionar variável:
   - **Name**: `NEXT_PUBLIC_API_URL`
   - **Value**: `https://your-railway-backend.railway.app/api`
   - **Environments**: Production, Preview, Development

3. Clicar em "Save"

### Passo 4: Deploy

1. Clicar em "Deploy"
2. Vercel fará:
   - Build do Next.js
   - Deploy automático
   - HTTPS ativado
3. Você receberá URL: `https://xxxx.vercel.app`

**Tempo**: ~5 minutos

---

## 🚂 PARTE 2: Deploy Backend no Railway

### Passo 1: Preparar Backend para Production

```bash
# No diretório backend/
npm run build

# Verificar se tudo compila
ls -la dist/
```

### Passo 2: Criar Conta Railway

1. Ir para https://railway.app
2. Sign up com GitHub ou email
3. Criar novo projeto

### Passo 3: Conectar GitHub ao Railway

1. No Railway Dashboard: "New Project"
2. Selecionar "Deploy from GitHub"
3. Conectar conta GitHub
4. Autorizar Railway
5. Selecionar repositório `pierre-clone`
6. Selecionar branch `main`

### Passo 4: Configurar Banco de Dados

Railway detectará `Dockerfile` e iniciará build.

Para dados persistentes:
1. No Railway Dashboard
2. Adicionar "Data Storage" (Disk)
3. Montar em `/data`

### Passo 5: Configurar Variáveis de Ambiente

No Railway → Variables:

```
PORT=5000
NODE_ENV=production
DATABASE_PATH=/data/pierre.db
JWT_SECRET=<GERAR CHAVE ALEATÓRIA FORTE>
JWT_REFRESH_SECRET=<GERAR CHAVE ALEATÓRIA FORTE>
CORS_ORIGIN=https://your-vercel-domain.vercel.app
FRONTEND_URL=https://your-vercel-domain.vercel.app
```

**Como gerar chaves aleatórias**:
```bash
# No terminal local
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

### Passo 6: Deploy

1. Railway detectará `Dockerfile`
2. Build automático
3. Deploy automático
4. Você receberá URL: `https://xxxx.railway.app`

**Tempo**: ~10 minutos

---

## 🔗 PARTE 3: Conectar Frontend com Backend

### Passo 1: Obter URL do Backend

No Railway Dashboard:
1. Ir para seu projeto
2. Clicar em "Deployments"
3. Copiar URL do domínio

Será algo como: `https://pierre-backend-production.railway.app`

### Passo 2: Atualizar Vercel

No Vercel Dashboard:
1. Ir para seu projeto
2. Settings → Environment Variables
3. Editar `NEXT_PUBLIC_API_URL`
4. Alterar para: `https://pierre-backend-production.railway.app/api`
5. Clicar "Save"

### Passo 3: Redeploy Frontend

1. Voltar para Deployments
2. Clicar em "Redeploy"
3. Esperar build completar
4. Testar em https://your-vercel-domain.vercel.app

---

## 🧪 Testes Pós-Deploy

### Test 1: Verificar Backend

```bash
curl https://your-railway-backend.railway.app/api/health

# Esperado:
# {"status":"ok","message":"Pierre Backend is running"}
```

### Test 2: Criar Conta

1. Ir para https://your-vercel-domain.vercel.app/register
2. Preencher formulário
3. Clicar "Criar Conta"
4. Verificar se redireciona para /dashboard

### Test 3: Login

1. Fazer logout
2. Ir para /login
3. Usar email/senha criado
4. Verificar se funciona

---

## 🔒 Checklist de Segurança

- ✅ JWT_SECRET gerado aleatoriamente (32+ caracteres)
- ✅ JWT_REFRESH_SECRET gerado aleatoriamente
- ✅ CORS_ORIGIN configurado corretamente
- ✅ NODE_ENV=production
- ✅ HTTPS ativado em ambos
- ✅ Banco de dados persistente no Railway
- ✅ Variáveis de ambiente não commitadas

---

## 📊 URLs Finais

```
Frontend:    https://pierre-clone.vercel.app
Backend:     https://pierre-backend-production.railway.app
API:         https://pierre-backend-production.railway.app/api
```

---

## 💰 Custos (Grátis)

- **Vercel**: Grátis para projetos pessoais
- **Railway**: Primeiro $5/mês grátis (mais que suficiente)
- **Total**: Grátis! 🎉

---

## 🆘 Troubleshooting

### "CORS Error"
- Verificar `CORS_ORIGIN` no Backend
- Deve ser exatamente o domínio Vercel
- Redeploy backend após mudança

### "API 404"
- Verificar `NEXT_PUBLIC_API_URL` no Vercel
- Deve terminar em `/api`
- Redeploy frontend

### "JWT Error"
- Verificar `JWT_SECRET` configurado
- Não deve estar vazio
- Redeploy backend

### "Database not found"
- Verificar `/data` volume no Railway
- Pode levar tempo para criar
- Aguarde alguns minutos

---

## ✅ Status Final

| Componente | Plataforma | URL |
|-----------|-----------|-----|
| Frontend | Vercel | https://pierre-clone.vercel.app |
| Backend | Railway | https://pierre-backend.railway.app |
| Database | Railway Disk | /data/pierre.db |

**Tempo Total**: ~15 minutos

---

**🎉 Parabéns! Seu app está em produção!**
