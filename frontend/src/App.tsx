import React, { useEffect, useState } from "react";
import "./App.css";

const API_URL = "http://localhost:3000/posts";

interface Post {
  id: number;
  title: string;
  content: string;
}

const App: React.FC = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [editingPost, setEditingPost] = useState<Post | null>(null);
  const [loading, setLoading] = useState(true);
  const [token, setToken] = useState<string | null>(null);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // Carregar postagens ao iniciar
  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    if (storedToken) {
      setToken(storedToken);
    }

    setLoading(true);
    fetch(API_URL)
      .then((res) => res.json())
      .then((data) => setPosts(data))
      .catch((error) => console.error("Erro ao buscar posts:", error))
      .finally(() => setLoading(false));
  }, []);

  // Criar uma nova postagem
  const handleCreatePost = async () => {
    if (!token) return alert("Você precisa estar logado para criar postagens.");

    const response = await fetch(API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ title, content }),
    });

    if (response.ok) {
      const newPost = await response.json();
      setPosts([...posts, newPost]);
      setTitle("");
      setContent("");
    } else {
      alert("Erro ao criar postagem.");
    }
  };

  // Excluir uma postagem
  const handleDeletePost = async (id: number) => {
    if (!token)
      return alert("Você precisa estar logado para excluir postagens.");

    const response = await fetch(`${API_URL}/${id}`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${token}` },
    });

    if (response.ok) {
      setPosts(posts.filter((post) => post.id !== id));
    } else {
      alert("Erro ao excluir postagem.");
    }
  };
  // Definir postagem para edição
  const startEditing = (post: Post) => {
    setEditingPost(post);
    setTitle(post.title);
    setContent(post.content);
  };

  // Cancelar edição
  const cancelEditing = () => {
    setEditingPost(null);
    setTitle("");
    setContent("");
  };

  // Atualizar uma postagem
  const handleUpdatePost = async () => {
    if (!editingPost || !title || !content)
      return alert("Preencha todos os campos!");

    if (!token)
      return alert("Você precisa estar logado para editar postagens.");

    const response = await fetch(`${API_URL}/${editingPost.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`, // ✅ Agora enviamos o token corretamente
      },
      body: JSON.stringify({ title, content }),
    });

    if (response.ok) {
      setPosts(
        posts.map((post) =>
          post.id === editingPost.id ? { ...post, title, content } : post
        )
      );
      cancelEditing();
    } else {
      alert("Erro ao atualizar postagem.");
    }
  };

  // Registrar um usuário
  const handleRegister = async () => {
    if (!email || !password) return alert("Preencha todos os campos!");

    const response = await fetch("http://localhost:3000/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    if (response.ok) {
      alert("Usuário registrado! Agora faça login.");
    } else {
      alert("Erro ao registrar.");
    }
  };

  // Fazer login
  const handleLogin = async () => {
    if (!email || !password) return alert("Preencha todos os campos!");

    const response = await fetch("http://localhost:3000/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    if (response.ok) {
      const data = await response.json();
      setToken(data.token);
      localStorage.setItem("token", data.token);
      alert("Login realizado com sucesso!");
    } else {
      alert("Email ou senha incorretos.");
    }
  };

  // Fazer logout
  const handleLogout = () => {
    setToken(null);
    localStorage.removeItem("token");
    alert("Logout realizado.");
  };

  return (
    <div className="container">
      <h1>Gerenciador de Postagens</h1>

      {!token ? (
        <>
          <h2>Login</h2>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="Senha"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button onClick={handleLogin}>Entrar</button>
          <button onClick={handleRegister}>Registrar</button>
        </>
      ) : (
        <>
          <h2>Bem-vindo!</h2>
          <button className="logout-btn" onClick={handleLogout}>
            Sair
          </button>

          <input
            type="text"
            placeholder="Título"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <textarea
            placeholder="Conteúdo"
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />
          {editingPost ? (
            <>
              <button className="edit-btn" onClick={handleUpdatePost}>
                💾 Salvar Alterações
              </button>
              <button
                className="delete-btn"
                onClick={cancelEditing}
                style={{ marginLeft: "10px" }}
              >
                ❌ Cancelar
              </button>
            </>
          ) : (
            <button onClick={handleCreatePost}>Criar Postagem</button>
          )}

          <h2>Postagens</h2>
          {loading && <p className="loading">🔄 Carregando postagens...</p>}
          <ul>
            {posts.map((post) => (
              <li key={post.id} className="post">
                <h3>{post.title}</h3>
                <p>{post.content}</p>
                <div className="post-actions">
                  <button
                    className="edit-btn"
                    onClick={() => startEditing(post)}
                  >
                    ✏️ Editar
                  </button>
                  <button
                    className="delete-btn"
                    onClick={() => handleDeletePost(post.id)}
                  >
                    🗑 Excluir
                  </button>
                </div>
              </li>
            ))}
          </ul>
        </>
      )}
    </div>
  );
};

export default App;
