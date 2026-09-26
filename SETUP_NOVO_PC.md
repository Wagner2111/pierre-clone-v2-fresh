# 🖥️ Setup em Novo PC - Pierre Clone

## 📦 O Que Levar

### **Opção 1: Via GitHub (RECOMENDADO)**

```bash
# Basta clonar o repositório
git clone https://github.com/Wagner2111/pierre-clone.git
cd pierre-clone
```

**Vantagem:** Sempre atualizado, sem precisa carregar arquivos grandes

---

### **Opção 2: Via Arquivo Compactado**

Se preferir levar tudo em um arquivo:

1. **Arquivos essenciais apenas:**
   ```
   ✅ app/
   ✅ components/
   ✅ lib/
   ✅ public/
   ✅ styles/
   ✅ package.json
   ✅ package-lock.json
   ✅ tsconfig.json
   ✅ next.config.js
   ✅ tailwind.config.js
   ✅ .env.local.example
   ```

2. **Não precisa levar:**
   ```
   ❌ node_modules/     (2GB+, reinstala no novo PC)
   ❌ .next/           (build cache, regenera)
   ❌ .git/            (cria novo clone)
   ❌ .vercel/         (específico de cada máquina)
   ```

---

## 🚀 Setup no Novo PC

### **Passo 1: Clonar Repositório**

```bash
git clone https://github.com/Wagner2111/pierre-clone.git
cd pierre-clone
```

### **Passo 2: Instalar Dependências**

```bash
npm install
```

**Tempo:** 2-5 minutos (depende da internet)

### **Passo 3: Configurar Variáveis de Ambiente**

Crie arquivo `.env.local`:

```bash
# Copie do arquivo .env.local.example
cp .env.local.example .env.local
```

Edite `.env.local` com suas credenciais:

```env
# Pluggy Configuration
NEXT_PUBLIC_PLUGGY_CLIENT_ID=2e688d93-cb84-4e57-873f-5359c69913cb
PLUGGY_API_KEY=seu_token_jwt_aqui
PLUGGY_ENVIRONMENT=sandbox

# Production
NEXT_PUBLIC_PRODUCTION_REDIRECT_URI=http://localhost:3000/callback
```

### **Passo 4: Iniciar Servidor**

```bash
npm run dev
```

Acesse: `http://localhost:3000`

---

## 🔑 Credenciais Necessárias

Para que funcione, você precisa de:

### **1. Pluggy Credentials**
- **Client ID:** `2e688d93-cb84-4e57-873f-5359c69913cb` ✅
- **API Key:** (seu JWT token)
- **Conta:** https://dashboard.pluggy.ai

⚠️ **IMPORTANTE:** Token JWT expira em ~2 horas! Se não funcionar, gere um novo.

### **2. Git (para clonar)**
```bash
git --version  # Verificar se tem instalado
```

Se não tiver: https://git-scm.com/download

### **3. Node.js (para npm)**
```bash
node --version  # Deve ser v18+
npm --version   # Deve ser v9+
```

Se não tiver: https://nodejs.org

---

## ✅ Checklist de Setup

```
[ ] GitHub clonado
[ ] npm install executado
[ ] .env.local criado com credenciais
[ ] npm run dev iniciado
[ ] http://localhost:3000 abre
[ ] Consegue fazer login
[ ] Consegue clicar "Conectar Nova Conta"
```

---

## 🐛 Se Algo Não Funcionar

### **"npm command not found"**
- Instale Node.js: https://nodejs.org

### **"git command not found"**
- Instale Git: https://git-scm.com/download

### **Porta 3000 já em uso**
```bash
# Use outra porta
npm run dev -- -p 3001
```

### **QR Code não aparece**
- Verifique `.env.local` tem credenciais corretas
- Verifique se `PLUGGY_API_KEY` não expirou
- Gere novo token: https://dashboard.pluggy.ai

---

## 📁 Estrutura do Projeto

```
pierre-clone/
├── app/                    # Next.js app directory
│   ├── auth/              # Login page
│   ├── dashboard/         # Main dashboard
│   ├── callback/          # OAuth callback
│   └── api/               # API routes
├── components/            # React components
│   ├── PluggyConnect.tsx  # QR Code flow
│   ├── SimpleLineChart    # Gráficos
│   └── ...
├── lib/
│   ├── pluggy.ts          # Pluggy integration
│   ├── mockData.ts        # Mock data
│   └── oauth.ts           # Auth helpers
├── public/                # Static files
├── styles/                # CSS global
├── .env.local             # Variáveis de ambiente
├── package.json           # Dependências
└── README.md
```

---

## 🔄 Sync com GitHub

Se quiser atualizar com as últimas mudanças:

```bash
git pull origin main
npm install  # Caso haja novas dependências
npm run dev
```

---

## 🚢 Deploy em Produção

Para fazer deploy no Vercel (como agora):

```bash
vercel
```

Ou conecte seu repositório GitHub direto em https://vercel.com

---

## 📞 Troubleshooting

**Erro: "Cannot find module"**
```bash
rm -rf node_modules
npm install
```

**Erro: "Port already in use"**
```bash
# Matar processo na porta 3000
lsof -ti:3000 | xargs kill -9  # Mac/Linux
netstat -ano | findstr :3000   # Windows
```

**Tudo muito lento?**
```bash
# Limpar cache Next.js
rm -rf .next
npm run dev
```

---

## ✨ Resumo

1. **Clone:** `git clone ...`
2. **Instale:** `npm install`
3. **Configure:** Crie `.env.local` com credenciais
4. **Rode:** `npm run dev`
5. **Teste:** http://localhost:3000

**É isso! Projeto pronto em outro PC!** 🎉

---

*Data: 2026-09-18*  
*Versão: v1*  
*Última atualização: Hoje*
