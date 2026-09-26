# 🔐 Pluggy Open Banking Integration Guide

## O que é Pluggy?

Pluggy é um agregador de Open Banking que conecta sua aplicação com múltiplos bancos brasileiros através de QR Code. Funciona de forma segura - seus dados e senha **nunca são compartilhados** com a aplicação.

## Bancos Suportados

✅ Nubank  
✅ Inter  
✅ Itaú  
✅ Bradesco  
✅ Santander  
✅ Caixa  
✅ +30 outras instituições

---

## 📋 Passo 1: Criar Conta Pluggy

1. Acesse: https://www.pluggy.ai
2. Clique em **"Sign Up"** / **"Cadastre-se"**
3. Preencha seus dados:
   - Email
   - Senha
   - Empresa/Nome
4. Verifique seu email
5. Faça login no dashboard

---

## 🔑 Passo 2: Obter Credenciais

1. Acesse o dashboard: https://dashboard.pluggy.ai
2. Vá em **API Keys** ou **Credenciais**
3. Copie:
   - **Client ID**
   - **API Key**
   - **Environment**: `sandbox` (para testes)

---

## ⚙️ Passo 3: Configurar Variáveis de Ambiente

### Local Development

Edite `.env.local`:

```env
# Pluggy Configuration
NEXT_PUBLIC_PLUGGY_CLIENT_ID=your_client_id_here
PLUGGY_API_KEY=your_api_key_here
PLUGGY_ENVIRONMENT=sandbox
```

### Production (Vercel)

1. Acesse: https://vercel.com/dashboard
2. Selecione projeto **pierre-clone**
3. Vá em **Settings** → **Environment Variables**
4. Adicione:
   ```
   NEXT_PUBLIC_PLUGGY_CLIENT_ID=your_client_id_here
   PLUGGY_API_KEY=your_api_key_here
   PLUGGY_ENVIRONMENT=production
   ```
5. Salve e aguarde redeploy

---

## 🧪 Passo 4: Testar QR Code

### Local

1. Rodando dev server: `npm run dev`
2. Acesse: http://localhost:3000
3. Faça login com credenciais de teste:
   ```
   Email: test@test.com
   Senha: teste123
   ```
4. Clique em **"Conectar nova conta"**
5. Selecione um banco
6. **Clique em "Continuar"**
7. Você verá o QR Code!

### Escanear QR Code

1. Abra o app do banco no seu celular
2. Procure por **"Conectar com QR Code"** ou **"Vincular aplicação"**
3. Escaneie o código que aparece na tela
4. Faça login com suas credenciais reais do banco
5. Autorize o acesso aos dados
6. Você será redirecionado com os dados sincronizados! ✅

---

## 📊 Dados Disponíveis via Pluggy

Após conectar um banco, você terá acesso a:

✅ **Contas**
- Saldo
- Tipo (corrente, poupança, investimento)
- Agência e conta

✅ **Cartões**
- Limite total
- Saldo utilizado
- Disponível
- Fatura

✅ **Transações**
- Data
- Descrição
- Valor
- Categoria

✅ **Investimentos**
- Saldo
- Rentabilidade
- Histórico

---

## 🔄 Fluxo Completo no App

1. **Usuário acessa o app**
   ```
   http://localhost:3000 ou https://pierre-clone.vercel.app
   ```

2. **Faz login**
   ```
   Email: test@test.com
   Senha: teste123
   ```

3. **Clica em "Conectar nova conta"**
   - Vê lista de bancos (Nubank, Inter, Itaú, etc)

4. **Seleciona um banco**
   - Escolhe o banco desejado

5. **Clica em "Continuar"**
   - Modal com QR Code apareça

6. **Escaneia no celular**
   - Abre app do banco
   - Faz login com credenciais reais
   - Autoriza acesso

7. **Retorna ao app**
   - Dados sincronizados automaticamente
   - Vê saldo, transações, cartões reais

---

## 🛡️ Segurança

- ✅ Seus dados nunca são compartilhados com a aplicação
- ✅ Autenticação acontece direto com o banco
- ✅ API Key é privada (nunca expõe no frontend)
- ✅ Tokens são criptografados

---

## 🐛 Troubleshooting

### "QR Code não aparece"
- Verifique se `NEXT_PUBLIC_PLUGGY_CLIENT_ID` está configurado
- Verifique console (F12) para erros
- Tente fazer refresh da página

### "Erro ao conectar banco"
- Verifique se está usando `sandbox` para testes
- Tente com outro banco
- Verifique se a API Key é válida

### "Dados não sincronizam"
- Aguarde alguns segundos
- Tente atualizar a página
- Verifique conexão de internet

---

## 📚 Links Úteis

- **Pluggy Dashboard**: https://dashboard.pluggy.ai
- **Pluggy Docs**: https://docs.pluggy.ai
- **API Reference**: https://docs.pluggy.ai/api/reference
- **Support**: https://www.pluggy.ai/suporte

---

## 🚀 Próximos Passos

1. ✅ Criar conta Pluggy
2. ✅ Obter credenciais
3. ✅ Configurar variáveis de ambiente
4. ✅ Testar QR Code localmente
5. ✅ Fazer deploy no Vercel
6. ✅ Testar em produção

Depois que tiver as credenciais, atualize o `.env.local` e comece a testar! 🎉
