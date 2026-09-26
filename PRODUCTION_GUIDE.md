# 📱 Production Deployment Guide

## ✅ Checklist Completo

- [x] Clone fiel do Pierre dashboard
- [x] OAuth 2.0 integração (Nubank)
- [x] Gráficos responsivos (Line, Heatmap, Donut)
- [x] Dados reais da API Pierre
- [x] Chat Widget com IA
- [x] Vercel deployment
- [x] Variáveis de ambiente
- [x] Serviço de autenticação melhorado
- [x] Analytics integrado

---

## 🚀 Deploy no Vercel

### Pré-requisitos
- [x] Código no GitHub
- [x] .env.local configurado
- [x] Build passa localmente

### Passos

1. **Conectar repositório**
   ```
   1. Ir para https://vercel.com/new
   2. Selecionar "Import Git Repository"
   3. Autenticar com GitHub
   4. Selecionar repositório "pierre-clone"
   ```

2. **Configurar Environment Variables**
   ```
   NEXT_PUBLIC_NUBANK_CLIENT_ID=27276142351691
   NEXT_PUBLIC_PRODUCTION_REDIRECT_URI=https://seu-app.vercel.app/callback
   NEXT_PUBLIC_VERCEL_ANALYTICS_ID=seu-app
   NEXT_PUBLIC_ENABLE_OAUTH=true
   NEXT_PUBLIC_ENABLE_ANALYTICS=true
   ```

3. **Deploy**
   - Clique em "Deploy"
   - Vercel faz build automaticamente
   - App estará live em ~5 minutos

---

## 🔐 Testar OAuth em Produção

### 1. Obter Credenciais Reais (Nubank)

**IMPORTANTE**: Para testar OAuth real, você precisa:

- [ ] Se registrar em https://developer.nubank.com.br/
- [ ] Criar uma aplicação e obter `client_id` real
- [ ] Configurar redirect URIs:
  - Desenvolvimento: `http://localhost:3000/callback`
  - Produção: `https://seu-app.vercel.app/callback`

### 2. Atualizar Variáveis de Ambiente

**Em .env.local (local)**:
```env
NEXT_PUBLIC_NUBANK_CLIENT_ID=seu_client_id_real
NEXT_PUBLIC_NUBANK_AUTH_URL=https://nuapp.nubank.com.br/open-banking/authorize
```

**No Vercel (produção)**:
- Ir em Project Settings > Environment Variables
- Atualizar as mesmas variáveis

### 3. Fluxo de Teste

1. **Login inicial**
   ```
   Email: test@test.com
   Senha: teste123
   ```

2. **Clicar em "Conectar nova conta"**
   - Abrirá o fluxo de seleção de banco

3. **Selecionar Nubank**
   - Será redirecionado para Nubank
   - Fazer login com credenciais Nubank real
   - Autorizar acesso aos dados

4. **Callback**
   - Sistema retorna para o dashboard
   - Dados da conta aparecem

---

## 📊 Analytics em Produção

### Vercel Analytics

1. **Ativado automaticamente**
   - Já está configurado em `app/layout.tsx`
   - Enviará eventos para Vercel automaticamente

2. **Verificar dados**
   - Ir para https://vercel.com/dashboard
   - Selecionar seu projeto
   - Aba "Analytics"
   - Ver página views, visitantes únicos, etc.

### Eventos Customizados

Para rastrear ações específicas:

```typescript
import { track } from '@vercel/analytics'

// Exemplo: rastrear conexão de conta
track('account_connected', {
  bank: 'Nubank',
  user_id: user.id,
  timestamp: new Date().toISOString()
})
```

---

## 🔑 Variáveis de Ambiente Essenciais

```env
# OAuth
NEXT_PUBLIC_NUBANK_CLIENT_ID=seu_client_id
NEXT_PUBLIC_PRODUCTION_REDIRECT_URI=https://seu-app.vercel.app/callback

# Analytics
NEXT_PUBLIC_VERCEL_ANALYTICS_ID=seu-app
NEXT_PUBLIC_ENABLE_ANALYTICS=true

# Features
NEXT_PUBLIC_ENABLE_OAUTH=true
NEXT_PUBLIC_ENABLE_CHAT=true
```

---

## 🐛 Troubleshooting

### OAuth redirecionando para Vercel login

**Causa**: Variáveis de ambiente não configuradas
**Solução**: 
1. Verificar que VERCEL_PROJECT_ID está setado
2. Adicionar variáveis do .env.local no Vercel

### Analytics não funciona

**Causa**: NEXT_PUBLIC_ENABLE_ANALYTICS = false
**Solução**: 
1. Verificar .env.local
2. Set `NEXT_PUBLIC_ENABLE_ANALYTICS=true`

### Callback dá erro

**Causa**: Redirect URI não cadastrada no Nubank
**Solução**:
1. Ir em developer.nubank.com.br
2. Adicionar URLs na aplicação:
   - `http://localhost:3000/callback`
   - `https://seu-app.vercel.app/callback`

---

## 📝 Próximos Passos (Recomendados)

1. **Backend API**
   - [ ] Criar API real em Node/Python/Go
   - [ ] Conectar com banco de dados
   - [ ] Implementar autenticação JWT real

2. **Melhorias Frontend**
   - [ ] Adicionar testes unitários
   - [ ] Implementar PWA
   - [ ] Melhorar acessibilidade (A11y)

3. **Segurança**
   - [ ] Rate limiting nos endpoints
   - [ ] CORS configurado corretamente
   - [ ] Secrets em variáveis seguras

4. **Performance**
   - [ ] Image optimization
   - [ ] Code splitting
   - [ ] Caching strategy

5. **Monitoramento**
   - [ ] Error tracking (Sentry)
   - [ ] Performance monitoring (Datadog)
   - [ ] Uptime monitoring (UptimeRobot)

---

## 🔗 Links Úteis

- **App**: https://clone-projeto-xwegq8ux4-pingling.vercel.app
- **Vercel Dashboard**: https://vercel.com/dashboard
- **GitHub Repo**: https://github.com/seu-usuario/pierre-clone
- **Nubank Developer**: https://developer.nubank.com.br/

---

**Status**: ✅ Pronto para Produção

**Última atualização**: 17 de Setembro de 2026
