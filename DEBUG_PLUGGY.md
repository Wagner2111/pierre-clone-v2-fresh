# 🔧 Debug - Pluggy QR Code

## ⚠️ Problema Identificado

A integração com Pluggy foi corrigida com os **endpoints corretos** da API. Se ainda houver problemas, siga este guia.

---

## 🚀 Teste Agora (v2 - Corrigida)

### **Passo 1: Aguarde Deploy**
O Vercel está fazendo redeploy com as correções. Aguarde **3-5 minutos**.

```
Status: Em redeploy...
```

### **Passo 2: Acesse o App**
```
https://pierre-clone.vercel.app
```

### **Passo 3: Faça Login**
```
Email: test@test.com
Senha: teste123
```

### **Passo 4: Clique em "Conectar Nova Conta"**

---

## 🐛 Verificar Erros no Console

Se ainda houver erro, abra o **console do navegador** (F12):

### **1. Abra o DevTools**
```
Windows/Linux: F12 ou Ctrl+Shift+I
Mac: Cmd+Option+I
```

### **2. Vá até a aba "Console"**
```
Procure por mensagens vermelhas de erro
```

### **3. Procure por estas mensagens:**

#### ✅ **Sucesso (QR Code funcionando)**
```
✓ "QR Code generated:" (log verde)
  url: "https://qr-link-from-pluggy"
  connectionId: "connection-123"
```

#### ❌ **Erro 1: Cliente ID inválido**
```
✗ "Pluggy API error:"
  message: "Invalid client ID"
```
**Solução:**
- Verifique se `NEXT_PUBLIC_PLUGGY_CLIENT_ID` está correto no Vercel
- Console log: `2e688d93-cb84-4e57-873f-5359c69913cb`

#### ❌ **Erro 2: API Key inválida**
```
✗ "Pluggy API error:"
  message: "Invalid API key"
```
**Solução:**
- API Key expirou (tokens Pluggy duram ~2 horas)
- Gere uma nova no dashboard: https://dashboard.pluggy.ai
- Copie a nova em `PLUGGY_API_KEY`

#### ❌ **Erro 3: Ambiente errado**
```
✗ "Failed to generate QR code:"
  message: "401 Unauthorized"
```
**Solução:**
- Verifique se `PLUGGY_ENVIRONMENT=sandbox`
- Em produção seria `production`

#### ❌ **Erro 4: Redirect URI não configurado**
```
✗ "Pluggy API error:"
  message: "Invalid redirect URL"
```
**Solução:**
- Configure em Vercel Environment Variables:
  ```
  NEXT_PUBLIC_PRODUCTION_REDIRECT_URI=https://pierre-clone.vercel.app/callback
  ```

---

## 📋 Checklist de Configuração

Verifique cada item no Vercel:

### **Environment Variables**

```
✅ NEXT_PUBLIC_PLUGGY_CLIENT_ID
   Valor: 2e688d93-cb84-4e57-873f-5359c69913cb
   
✅ PLUGGY_API_KEY
   Valor: eyJhbGciOi... (seu JWT token)
   
✅ PLUGGY_ENVIRONMENT
   Valor: sandbox (ou production)
   
✅ NEXT_PUBLIC_PRODUCTION_REDIRECT_URI
   Valor: https://pierre-clone.vercel.app/callback
```

**Como verificar:**
1. Acesse: https://vercel.com/pierre-clone
2. Vá em **Settings** → **Environment Variables**
3. Verifique cada uma acima

---

## 🔄 Forçar Redeploy

Se mudou variáveis, force redeploy:

1. Acesse: https://vercel.com/pierre-clone
2. Clique em **Deployments**
3. Clique nos 3 pontos do último deploy
4. Selecione **Redeploy**
5. Aguarde 3-5 minutos

---

## 🧪 Teste Local (Alternativa)

Se Vercel não funcionar, teste localmente:

```bash
# 1. Instale dependências
npm install

# 2. Configure .env.local
NEXT_PUBLIC_PLUGGY_CLIENT_ID=2e688d93-cb84-4e57-873f-5359c69913cb
PLUGGY_API_KEY=seu_token_aqui
PLUGGY_ENVIRONMENT=sandbox

# 3. Inicie servidor
npm run dev

# 4. Acesse
http://localhost:3000
```

---

## 📊 Fluxo Esperado (com console)

```
1. Clica "Conectar Nova Conta"
   Console: (vazio)

2. Seleciona banco (ex: Nubank)
   Console: (vazio)

3. Clica "Continuar"
   Console: ✓ "QR Code generated:"
            ✓ "url: https://..."

4. QR Code aparece na tela
   Console: (aguardando scan)

5. Escaneia no celular
   Console: ✓ "Aguardando confirmação..."

6. Faz login no banco
   Console: (processando)

7. Autoriza acesso
   Console: ✓ "Sucesso!" ou erro

8. Redireciona para dashboard
```

---

## 🆘 Se Nada Funcionar

### **Opção A: Verificar Credenciais Pluggy**

1. Acesse: https://dashboard.pluggy.ai
2. Vá em **API Keys**
3. Copie:
   - Client ID (novo)
   - API Key (novo)
4. Atualize no Vercel
5. Force redeploy

### **Opção B: Gerar Novo Token JWT**

O token Pluggy expira em ~2 horas. Se for antigo:

1. Acesse: https://dashboard.pluggy.ai
2. Vá em **Authentication** ou **Credentials**
3. Regenere o **API Key**
4. Copie o novo JWT token
5. Atualize `PLUGGY_API_KEY` no Vercel
6. Force redeploy

### **Opção C: Teste com Curl**

Verifique se as credenciais funcionam:

```bash
curl -X POST https://sandbox.pluggy.ai/connections \
  -H "Authorization: Bearer YOUR_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "connectorId": 1,
    "redirectUrl": "https://pierre-clone.vercel.app/callback",
    "clientId": "YOUR_CLIENT_ID"
  }'
```

Se receber um `url` com QR code = ✅ Credenciais funcionando

---

## 📞 Próximos Passos

1. **Após deploy:** Acesse https://pierre-clone.vercel.app
2. **Abra Console:** F12
3. **Clique em "Conectar Nova Conta"**
4. **Me envie a mensagem de erro do console** ou **"QR Code apareceu com sucesso!"**

Aí vamos debug juntos se necessário! 🚀

---

**Documento atualizado:** 2026-09-17  
**Versão:** v2 (Endpoints corrigidos)
