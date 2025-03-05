# 📌 Gerenciador de Postagens

Um projeto Fullstack com **React, TypeScript, Node.js e SQLite** para gerenciar postagens com **autenticação JWT**.

## 🚀 Tecnologias Usadas

- **Frontend:** React + TypeScript
- **Backend:** Node.js + Express + TypeScript
- **Banco de Dados:** SQLite
- **Autenticação:** JSON Web Token (JWT)
- **Segurança:** Bcrypt.js para hashing de senhas

---

## 📌 Pré-requisitos

Antes de rodar o projeto, instale os seguintes softwares:

- **[Node.js](https://nodejs.org/)** (v16+ recomendado)
- **Gerenciador de pacotes:** `npm` ou `yarn`

---

## 📌 Como Rodar o Projeto

### **1️⃣ Clonar o repositório**

```sh
git clone https://github.com/lucas-olv-xyz/gerenciador-postagens.git
cd gerenciador-postagens
```

### **2️⃣ Instalar dependências**

```sh
npm install
```

### **3️⃣ Configurar o Banco de Dados**

Rodar o script para criar as tabelas no SQLite:

```sh
npx ts-node src/setupDb.ts
```

### **4️⃣ Rodar o Backend**

```sh
npx ts-node src/server.ts
```

### **5️⃣ Rodar o Frontend**

```sh
cd frontend
npm install
npm start
```

Acesse: `http://localhost:3000/`

---

## 📌 Endpoints da API

### **🟢 Registro de Usuário**

`POST /register`

```json
{
  "email": "teste@email.com",
  "password": "123456"
}
```

### **🔵 Login de Usuário**

`POST /login`

```json
{
  "email": "teste@email.com",
  "password": "123456"
}
```

**Resposta:**

```json
{
  "token": "SEU_TOKEN_JWT_AQUI"
}
```

### **🔒 Criar uma Postagem (Requer Token)**

`POST /posts`
**Headers:** `Authorization: Bearer SEU_TOKEN`

```json
{
  "title": "Minha Postagem",
  "content": "Conteúdo da postagem"
}
```

### **🔄 Listar Postagens**

`GET /posts`

### **✏️ Editar uma Postagem (Requer Token)**

`PUT /posts/:id`
**Headers:** `Authorization: Bearer SEU_TOKEN`

```json
{
  "title": "Título atualizado",
  "content": "Novo conteúdo"
}
```

### **🗑 Excluir uma Postagem (Requer Token)**

`DELETE /posts/:id`
**Headers:** `Authorization: Bearer SEU_TOKEN`

---

## 📌 Funcionalidades Implementadas

- ✅ Registro e login de usuários com JWT
- ✅ Criar, editar e excluir postagens
- ✅ Proteção de rotas com autenticação
- ✅ Interface interativa com React
- ✅ Feedbacks visuais de carregamento e erros

---

## 📌 Melhorias Futuras

- 🔹 Responsividade para mobile
- 🔹 Upload de imagens para posts
- 🔹 Paginação de postagens

---

## 📌 Autor

**Seu Nome**  
🔗 [LinkedIn](https://linkedin.com/in/seu-perfil)  
📧 Email: seuemail@email.com

---

### **Feito com 💙 por [Seu Nome]**
