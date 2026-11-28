# 🛍️ Digital Store

Aplicação de e-commerce desenvolvida com React, Node.js, Express e MySQL, como projeto de aprendizado e evolução em desenvolvimento web.

A Digital Store tem como objetivo oferecer uma experiência de compra simples e intuitiva, com cadastro de usuários, autenticação, catálogo de produtos, categorias e carrinho de compras.

O projeto está sendo desenvolvido em etapas, com uma arquitetura preparada para receber novas funcionalidades.

---

## 🚀 Tecnologias utilizadas

### Frontend
- React 19
- JavaScript
- HTML5
- CSS3
- Vite

### Backend
- Node.js
- Express.js
- Sequelize ORM
- MySQL
- JSON Web Token (JWT)
- bcryptjs

### Ferramentas
- Visual Studio Code
- Git e GitHub
- MySQL

---

## ✨ Funcionalidades

### Frontend

- [x] Página inicial da loja
- [x] Catálogo de produtos
- [x] Exibição de preços e categorias
- [x] Carrinho de compras
- [x] Adicionar e remover produtos do carrinho
- [x] Controle de quantidade
- [x] Cálculo automático do total
- [x] Cadastro de usuários
- [x] Login
- [x] Recuperação de senha
- [x] Redefinição de senha
- [x] Página Minha Conta
- [x] Encerramento de sessão
- [x] Persistência e verificação de sessão

### Backend

- [x] API REST com Express
- [x] Conexão com MySQL
- [x] Modelagem com Sequelize
- [x] Modelagem de usuários
- [x] Modelagem de produtos
- [x] Modelagem de categorias
- [x] Modelagem de imagens de produtos
- [x] Modelagem de opções de produtos
- [x] Cadastro de usuários
- [x] Criptografia de senhas com bcrypt
- [x] Autenticação com JWT
- [x] Middleware de autenticação
- [x] Controle de permissões por perfil
- [x] Perfis de cliente e administrador
- [x] Consulta e atualização de dados do usuário
- [x] Proteção de rotas administrativas
- [x] Recuperação de senha por token
- [x] Redefinição de senha
- [x] Confirmação da senha atual para alteração de senha

### Em desenvolvimento

- [ ] Integração completa do catálogo com a API
- [ ] Painel administrativo
- [ ] Gerenciamento completo de produtos
- [ ] Gerenciamento de categorias
- [ ] Controle de estoque
- [ ] Cadastro de fornecedores
- [ ] Gestão de pedidos
- [ ] Relatórios financeiros e de vendas
- [ ] Persistência do carrinho de compras
- [ ] Integração com meios de pagamento
- [ ] Histórico de pedidos

---

## 📂 Estrutura do projeto

```text
DigitalStore/
│
├── backend/
│   ├── config/
│   │   └── database.js
│   │
│   ├── middleware/
│   │   ├── auth.js
│   │   └── admin.js
│   │
│   ├── models/
│   │   ├── user.js
│   │   ├── PasswordReset.js
│   │   ├── Category.js
│   │   ├── Product.js
│   │   ├── ProductImage.js
│   │   ├── ProductOption.js
│   │   └── index.js
│   │
│   ├── routes/
│   │   ├── auth.js
│   │   ├── user.js
│   │   ├── categories.js
│   │   └── products.js
│   │
│   ├── services/
│   │
│   ├── server.js
│   ├── package.json
│   └── package-lock.json
│
├── frontend/
│   ├── src/
│   │   ├── pages/
│   │   │   ├── Cadastro.jsx
│   │   │   ├── Cadastro.css
│   │   │   ├── Login.jsx
│   │   │   ├── Login.css
│   │   │   ├── MinhaConta.jsx
│   │   │   ├── MinhaConta.css
│   │   │   ├── EsqueciSenha.jsx
│   │   │   ├── EsqueciSenha.css
│   │   │   ├── RedefinirSenha.jsx
│   │   │   └── RedefinirSenha.css
│   │   │
│   │   ├── App.jsx
│   │   ├── App.css
│   │   ├── main.jsx
│   │   └── index.css
│   │
│   ├── index.html
│   └── package.json
│
└── README.md
```

---

## ⚙️ Pré-requisitos

Antes de executar o projeto, instale:

- [Node.js](https://nodejs.org/)
- [MySQL](https://dev.mysql.com/downloads/)
- [Visual Studio Code](https://code.visualstudio.com/)
- [Git](https://git-scm.com/)

---

## 🗄️ Configuração do banco de dados

Crie o banco de dados MySQL:

```sql
CREATE DATABASE digital_store;
```

O backend utiliza Sequelize para realizar a conexão e gerenciar os modelos do banco de dados.

---

## 🔧 Configuração do Backend

### 1. Acesse a pasta

```bash
cd backend
```

### 2. Instale as dependências

```bash
npm install
```

### 3. Configure o arquivo `.env`

Crie um arquivo chamado `.env` dentro da pasta `backend`, utilizando as variáveis esperadas pela configuração do projeto.

Exemplo de configuração:

```env
PORT=3000

DB_HOST=localhost
DB_PORT=3306
DB_NAME=digital_store
DB_USER=root
DB_PASSWORD=sua_senha_mysql

JWT_SECRET=sua_chave_secreta_forte
JWT_EXPIRES_IN=1d
```

Caso utilize o serviço de envio de e-mails para recuperação de senha, configure também as variáveis exigidas pelo serviço de e-mail do projeto.

**Importante:** nunca envie o arquivo `.env` para o GitHub. Ele contém informações privadas, como senhas e chaves de acesso.

### 4. Inicie o backend

```bash
NODE_USE_SYSTEM_CA=1 npm run dev
```

O servidor ficará disponível em:

http://localhost:3000

---

## 💻 Configuração do Frontend

Abra outro terminal.

### 1. Acesse a pasta

```bash
cd frontend
```

### 2. Instale as dependências

```bash
npm install
```

### 3. Inicie o frontend

```bash
npm run dev
```

A aplicação ficará disponível em:

http://localhost:5173

---

## 🔗 Principais rotas da API

### Autenticação

| Método | Endpoint | Descrição |
|---|---|---|
| POST | `/api/auth/register` | Cadastro de usuário |
| POST | `/api/auth/login` | Login |
| POST | `/api/auth/forgot-password` | Solicitação de recuperação de senha |
| POST | `/api/auth/reset-password` | Redefinição de senha |

### Usuários

| Método | Endpoint | Descrição |
|---|---|---|
| GET | `/api/users/me` | Consulta o usuário autenticado |
| GET | `/api/users/:id` | Consulta usuário |
| PUT | `/api/users/:id` | Atualiza dados da conta |
| DELETE | `/api/users/:id` | Exclui conta |

### Produtos

| Método | Endpoint | Descrição |
|---|---|---|
| GET | `/api/products` | Lista produtos |
| GET | `/api/products/:id` | Consulta produto |
| POST | `/api/products` | Cadastra produto (administrador) |
| PUT | `/api/products/:id` | Atualiza produto (administrador) |
| DELETE | `/api/products/:id` | Exclui produto (administrador) |

### Categorias

| Método | Endpoint | Descrição |
|---|---|---|
| GET | `/api/categories` | Lista categorias |
| GET | `/api/categories/:id` | Consulta categoria |
| POST | `/api/categories` | Cadastra categoria (administrador) |
| PUT | `/api/categories/:id` | Atualiza categoria (administrador) |
| DELETE | `/api/categories/:id` | Exclui categoria (administrador) |

As rotas protegidas exigem autenticação e, nas operações administrativas, permissão de administrador.

---

## 🔐 Segurança e autenticação

A Digital Store utiliza:

- JWT para autenticação.
- bcryptjs para proteção das senhas.
- Middleware para verificar a validade dos tokens.
- Controle de acesso por perfil de usuário.
- Proteção de rotas administrativas.
- Tokens temporários para recuperação de senha.
- Confirmação da senha atual nas alterações de senha.

O token de autenticação deve ser enviado no cabeçalho HTTP:

```http
Authorization: Bearer SEU_TOKEN
```

O cadastro público não permite que um usuário escolha seu próprio perfil administrativo.

---

## 🛒 Carrinho de compras

O carrinho possui funcionalidades para:

- Adicionar produtos.
- Alterar quantidades.
- Remover produtos.
- Calcular subtotais.
- Calcular o total da compra.

Atualmente, o controle do carrinho é realizado no frontend.

---

## 📱 Responsividade

A interface utiliza CSS e media queries para adaptar a experiência de navegação a diferentes dispositivos:

- Computadores.
- Tablets.
- Smartphones.

---

## 📌 Planejamento do projeto

O desenvolvimento está dividido em etapas:

1. Autenticação e middleware.
2. Segurança das contas e senhas.
3. Controle de permissões administrativas.
4. Testes do sistema de usuários.
5. Gerenciamento de produtos e categorias.
6. Carrinho de compras.
7. Interface e responsividade.
8. Segurança e configurações.
9. Testes completos da loja.
10. Preparação para publicação.

O painel administrativo será desenvolvido inicialmente para o gerenciamento de produtos. Um módulo de serviços poderá ser incorporado em uma fase futura.

---

## 👨‍💻 Desenvolvedor

Projeto desenvolvido por **Cleilson Mendonça**, como parte dos estudos e evolução em desenvolvimento web.

Repositório: https://github.com/cleilsonsm2-dev/DigitalStore

---

## 📄 Licença

Projeto desenvolvido para fins educacionais e de aprendizado.