# 🚀 GitHub Setup & Auto-Deploy

## Passo 1: Criar Repositório no GitHub

1. Acesse https://github.com/new
2. Nome: `pierre-clone` (ou outro nome de sua preferência)
3. Descrição: "Clone fiel do dashboard Pierre com OAuth, gráficos e dados reais"
4. Selecione **Public** (para conectar com Vercel)
5. **Não inicialize** com README/gitignore/license (já temos)
6. Clique em **Create repository**

## Passo 2: Fazer Push do Repositório Local

```bash
cd /c/Users/wagne/OneDrive/Documentos/Claude/pierre/clone-projeto

# Adicionar remote do GitHub
git remote add origin https://github.com/SEU_USUARIO/pierre-clone.git

# Renomear branch (se necessário)
git branch -M main

# Fazer push
git push -u origin main
```

## Passo 3: Conectar com Vercel para Auto-Deploy

1. Acesse https://vercel.com/new
2. Selecione "Import Git Repository"
3. Selecione seu repositório `pierre-clone`
4. **Framework**: Next.js (detectado automaticamente)
5. **Environment Variables**: Adicione as variáveis do `.env.local`
6. Clique em **Deploy**

### Variáveis de Ambiente no Vercel:
```
NEXT_PUBLIC_NUBANK_CLIENT_ID=27276142351691
NEXT_PUBLIC_NUBANK_AUTH_URL=https://nuapp.nubank.com.br/open-banking/authorize
NEXT_PUBLIC_PRODUCTION_REDIRECT_URI=https://seu-app.vercel.app/callback
NEXT_PUBLIC_VERCEL_ANALYTICS_ID=seu-analytics-id
NEXT_PUBLIC_ENABLE_OAUTH=true
NEXT_PUBLIC_ENABLE_ANALYTICS=true
NEXT_PUBLIC_ENABLE_CHAT=true
```

## Passo 4: Verificar Auto-Deploy

Agora toda vez que você fazer push para `main`:
```bash
git add .
git commit -m "sua mensagem"
git push
```

O Vercel automaticamente vai:
- ✅ Build a aplicação
- ✅ Rodar testes
- ✅ Fazer deploy em produção
- ✅ Enviar notificação de sucesso

## Passo 5: Configurar Preview Deploys (Opcional)

1. Crie uma branch de desenvolvimento:
```bash
git checkout -b dev
git push -u origin dev
```

2. No Vercel, vá em **Settings > Git**
3. Configure **Preview Deployments** para fazer deploy de PRs automaticamente

---

## 🔗 Links Importantes

- **GitHub Repo**: https://github.com/SEU_USUARIO/pierre-clone
- **Vercel Dashboard**: https://vercel.com/dashboard
- **Live App**: https://seu-app.vercel.app

## 📝 Comandos Úteis

```bash
# Ver remote
git remote -v

# Mudar URL do remote
git remote set-url origin https://github.com/SEU_USUARIO/pierre-clone.git

# Ver branches
git branch -a

# Criar branch nova
git checkout -b feature/novo-recurso

# Fazer push de nova branch
git push -u origin feature/novo-recurso
```

---

**Pronto! Agora seu projeto está no GitHub com auto-deploy no Vercel! 🎉**
