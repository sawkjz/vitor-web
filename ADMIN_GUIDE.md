# 📋 Guia do Painel de Administração

## 🔐 Como Fazer Login como Admin

### Opção 1: Usando Email na Lista Branca (Mais Fácil)

Se seu email está na variável de ambiente `ADMIN_EMAIL_ALLOWLIST`, você pode fazer login diretamente:

1. **Crie um arquivo `.env.local`** na raiz do projeto:
```bash
VITE_SUPABASE_URL=https://sua-url-supabase.supabase.co
VITE_SUPABASE_ANON_KEY=sua_chave_anonima
```

2. **Configure a Lista Branca de Admin** no arquivo `.env`:
```bash
ADMIN_EMAIL_ALLOWLIST=seu-email@exemplo.com,outro-admin@exemplo.com
```

3. **Acesse o painel**:
   - Clique em "Participate now" → Logo no header aparecerá um botão com suas iniciais
   - Clique em "Sign in" para entrar como admin

### Opção 2: Usando Supabase (Produção)

1. **Configure o Supabase**:
   - Crie uma conta em [supabase.com](https://supabase.com)
   - Copie suas credenciais para `.env`

2. **Crie um usuário admin**:
   - No dashboard Supabase → Authentication → Users
   - Crie um novo usuário com email e senha
   - Adicione à tabela `admin_users` ou ao allowlist

3. **Faça login**:
   - Use o email e senha cadastrados

---

## 📝 Editando Sorteios

### Acesso ao Painel
1. Faça login como admin
2. Clique em suas iniciais → "Admin Profile"
3. Selecione a aba **"Cars"** (ou "Houses")

### Editando um Sorteio

#### Campos Principais:
- **Título**: Nome da campanha (ex: "Sorteio do Mustang")
- **Nome do Carro**: Modelo específico (ex: "Ford Mustang Black Edition 5.0")
- **Descrição Curta**: Uma linha de resumo
- **Descrição Longa**: Detalhes completos

#### Imagens:
- **Imagem Principal (Hero Image)**: A foto grande que aparece no card
- **Galeria**: 4 fotos adicionais para o produto

**Para uploadar**:
1. Clique no botão "Upload Image"
2. Selecione uma imagem do seu computador
3. Aguarde o upload completar

#### Preços e Ingressos:
- **Preço do Bilhete**: Valor em EUR/BRL
- **Moeda**: EUR ou BRL
- **Total de Bilhetes**: Quantidade disponível
- **Bilhetes Vendidos**: Atualizado automaticamente
- **Máximo por Compra**: Limite de bilhetes por pedido

#### Outras Configurações:
- **Status**: Ativo, Em Breve, Fora de Estoque
- **Data do Sorteio**: Quando será realizado
- **Destaque na Home**: Se deve aparecer na página principal
- **Destaques**: 3 pontos principais do sorteio

### Salvando Mudanças

1. Faça todas as alterações necessárias
2. Clique no botão **"Save"** (verde)
3. Aguarde a confirmação de sucesso
4. A página será atualizada automaticamente

---

## 🖼️ Dicas de Imagens

### Tamanho Recomendado:
- **Imagem Hero**: 800x600px (landscape)
- **Galeria**: 600x600px (square)
- **Formato**: JPG ou PNG
- **Peso Máximo**: 8MB

### Onde Pegar Imagens:
- Use imagens dos seus carros/propriedades
- Ou acesse [Unsplash](https://unsplash.com) para carros premium
- Mantenha a qualidade alta para aparência premium

---

## ⚡ Fluxo Rápido

```
1. Login → Click em suas iniciais
2. Admin Profile → Aba "Cars"
3. Edite um sorteio existente:
   - Altere título, descrição, fotos
   - Defina preço e quantidade de bilhetes
   - Clique em "Save"
4. Pronto! As mudanças aparecem no site
```

---

## 🔗 URLs Úteis

- **Frontend**: http://localhost:5173
- **Admin Panel**: http://localhost:5173 (após login)
- **API**: http://localhost:8787
- **API Store Config**: http://localhost:8787/api/store-config

---

## ❌ Troubleshooting

### "Sessão admin expirada"
- Faça logout e login novamente
- Verifique se seu email está na lista de admins

### "Erro ao salvar sorteios"
- Verifique se o backend está rodando
- Confirme que tem permissão de admin
- Aguarde alguns segundos e tente novamente

### Imagens não aparecem após upload
- Verifique a conexão com Supabase Storage
- Confirme que o arquivo está em formato válido (JPG/PNG)
- Tente com um arquivo menor

---

## 📞 Suporte

Se encontrar problemas:
1. Verifique o console do navegador (F12)
2. Verifique os logs do servidor
3. Confirme as variáveis de ambiente

