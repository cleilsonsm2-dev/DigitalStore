
# 🛍️ Digital Store

Projeto de uma loja virtual desenvolvido como parte do meu aprendizado em desenvolvimento web, utilizando React no frontend, Node.js e Express no backend, e MySQL como banco de dados.

O objetivo é construir uma aplicação de e-commerce moderna, responsiva e funcional, com cadastro de usuários, autenticação, catálogo de produtos e carrinho de compras.

---

## 📌 Sobre o projeto

A Digital Store é uma aplicação web de comércio eletrônico que busca oferecer uma experiência simples e intuitiva para os usuários.

O projeto está sendo desenvolvido gradualmente, implementando funcionalidades tanto no frontend quanto no backend, com integração a banco de dados e autenticação de usuários.

---

## 🚀 Tecnologias utilizadas

### Frontend
- React
- JavaScript
- HTML5
- CSS3
- Vite

### Backend
- Node.js
- Express.js
- Sequelize ORM
- MySQL
- JWT (JSON Web Token)
- bcryptjs

### Ferramentas
- Visual Studio Code
- Git
- GitHub
- MySQL

---

## ✨ Funcionalidades

### Frontend
- [x] Página inicial
- [x] Layout responsivo
- [x] Catálogo de produtos
- [x] Exibição de preços
- [x] Categorias de produtos
- [x] Carrinho de compras
- [x] Adicionar produtos ao carrinho
- [x] Remover produtos do carrinho
- [x] Controle de quantidade
- [x] Cálculo automático do total
- [x] Página de cadastro de usuários
- [x] Página de login

### Backend
- [x] API REST com Express
- [x] Conexão com MySQL
- [x] ORM Sequelize
- [x] Modelagem de usuários
- [x] Modelagem de produtos
- [x] Modelagem de categorias
- [x] Modelagem de imagens de produtos
- [x] Modelagem de opções de produtos
- [x] Cadastro de usuários
- [x] Criptografia de senhas com bcrypt
- [x] Autenticação JWT
- [x] Middleware de autenticação
- [x] Consulta de perfil autenticado
- [x] Atualização de dados do usuário
- [x] Exclusão de conta

### Em desenvolvimento
- [ ] Integração completa entre frontend e backend
- [ ] Persistência do carrinho de compras
- [ ] Gerenciamento de produtos
- [ ] Gerenciamento de categorias
- [ ] Painel administrativo
- [ ] Finalização de pedidos
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
│   │   └── auth.js
│   │
│   ├── models/
│   │   ├── user.js
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
│   ├── server.js
│   ├── package.json
│   └── .env
│
├── frontend/
│   ├── src/
│   │   ├── pages/
│   │   │   ├── Cadastro.jsx
│   │   │   ├── cadastro.css
│   │   │   ├── Login.jsx
│   │   │   └── Login.css
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

Para executar o projeto localmente, é necessário ter instalado:

- [Node.js](https://nodejs.org/)
- [MySQL](https://dev.mysql.com/downloads/)
- [Visual Studio Code](https://code.visualstudio.com/)
- Git

---

## 🗄️ Configuração do banco de dados

Abra o MySQL e execute:

```sql
CREATE DATABASE digitalstore;
```

O banco de dados será utilizado pelo backend através do Sequelize.

---

## 🔧 Configuração do Backend

### 1. Acesse a pasta backend

```bash
cd backend
```

### 2. Instale as dependências

```bash
npm install
```

### 3. Configure as variáveis de ambiente

Crie um arquivo `.env` dentro da pasta `backend`.

Exemplo:

```env
PORT=3000

DB_HOST=localhost
DB_PORT=3306
DB_NAME=digitalstore
DB_USER=root
DB_PASSWORD=sua_senha_mysql

JWT_SECRET=coloque_uma_chave_secreta_forte
JWT_EXPIRES_IN=1d
```

**Importante:** Não compartilhe seu arquivo `.env` nem envie senhas ou chaves secretas para o GitHub.

### 4. Inicie o servidor

Modo desenvolvimento:

```bash
npm run dev
```

Ou modo normal:

```bash
npm start
```

O backend estará disponível em:

http://localhost:3000

---

## 💻 Configuração do Frontend

### 1. Abra outro terminal

Acesse a pasta frontend:

```bash
cd frontend
```

### 2. Instale as dependências

```bash
npm install
```

### 3. Inicie o projeto

```bash
npm run dev
```

O frontend estará disponível em:

http://localhost:5173

---

## 🔗 API

### Autenticação

| Método | Endpoint | Descrição |
|---|---|---|
| POST | `/api/auth/register` | Cadastro de usuário |
| POST | `/api/auth/login` | Login de usuário |

### Usuários

| Método | Endpoint | Descrição |
|---|---|---|
| GET | `/api/users/me` | Consulta usuário autenticado |
| GET | `/api/users/:id` | Consulta usuário |
| PUT | `/api/users/:id` | Atualiza dados do usuário |
| DELETE | `/api/users/:id` | Exclui conta |

### Produtos

| Método | Endpoint | Descrição |
|---|---|---|
| GET | `/api/products` | Listagem de produtos |

### Categorias

| Método | Endpoint | Descrição |
|---|---|---|
| GET | `/api/categories` | Listagem de categorias |

> Algumas rotas podem receber atualizações durante o desenvolvimento.

---

## 🔐 Autenticação

O sistema utiliza JSON Web Token (JWT) para autenticação.

As senhas dos usuários são armazenadas utilizando hash com bcrypt, evitando armazenamento em texto puro.

As rotas protegidas exigem o envio do token no cabeçalho HTTP:

```http
Authorization: Bearer SEU_TOKEN
```

---

## 🛒 Carrinho de compras

O carrinho permite:

- Adicionar produtos.
- Aumentar quantidade de produtos.
- Remover produtos.
- Calcular subtotal.
- Calcular total da compra.

Atualmente, o carrinho é controlado no frontend.

---

## 📱 Responsividade

A interface foi desenvolvida utilizando CSS e media queries para adaptar o layout a diferentes tamanhos de tela, incluindo:

- Computadores
- Tablets
- Smartphones

---

## ▶️ Executando o projeto

Para executar a aplicação, é necessário manter dois terminais abertos.

### Terminal 1: Backend

```bash
cd backend
npm run dev
```

### Terminal 2: Frontend

```bash
cd frontend
npm run dev
```

Depois acesse:

http://localhost:5173

---

## 📌 Status do projeto

🟡 Em desenvolvimento

O projeto está sendo desenvolvido continuamente, com implementação gradual de funcionalidades, integração entre frontend e backend, autenticação e melhorias na experiência do usuário.

---

## 👨‍💻 Desenvolvedor

Projeto desenvolvido por **Cleilson Mendonça** como parte dos estudos e evolução em desenvolvimento web.

---

## 📄 Licença

Projeto desenvolvido para fins educacionais e de aprendizado.
