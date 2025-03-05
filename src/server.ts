import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { openDb } from "./database";
import authRoutes from "./auth";
import { authenticateToken } from "./middleware";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());
app.use(authRoutes);

// 🟢 Criar uma nova postagem
app.post("/posts", authenticateToken, async (req, res) => {
  const { title, content } = req.body;
  if (!title || !content) {
    return res
      .status(400)
      .json({ error: "Título e conteúdo são obrigatórios" });
  }

  const db = await openDb();
  const result = await db.run(
    "INSERT INTO posts (title, content) VALUES (?, ?)",
    [title, content]
  );

  res.json({ id: result.lastID, title, content });
});

// 🔵 Listar todas as postagens
app.get("/posts", async (req, res) => {
  const db = await openDb();
  const posts = await db.all("SELECT * FROM posts ORDER BY created_at DESC");

  res.json(posts);
});

// 🟠 Atualizar uma postagem
app.put("/posts/:id", authenticateToken, async (req, res) => {
  const { id } = req.params;
  const { title, content } = req.body;

  if (!title || !content) {
    return res
      .status(400)
      .json({ error: "Título e conteúdo são obrigatórios" });
  }

  const db = await openDb();
  const result = await db.run(
    "UPDATE posts SET title = ?, content = ? WHERE id = ?",
    [title, content, id]
  );

  if (result.changes === 0) {
    return res.status(404).json({ error: "Postagem não encontrada" });
  }

  res.json({ message: "Postagem atualizada com sucesso" });
});

// 🔴 Deletar uma postagem
app.delete("/posts/:id", authenticateToken, async (req, res) => {
  const { id } = req.params;
  const db = await openDb();
  const result = await db.run("DELETE FROM posts WHERE id = ?", [id]);

  if (result.changes === 0) {
    return res.status(404).json({ error: "Postagem não encontrada" });
  }

  res.json({ message: "Postagem deletada com sucesso" });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 Servidor rodando na porta ${PORT}`);
});
