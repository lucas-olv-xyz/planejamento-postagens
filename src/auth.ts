import express from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { openDb } from "./database";

const router = express.Router();
const SECRET_KEY = "seuSegredoSuperSecreto"; // Idealmente, coloque isso no .env

// 🟢 Registro de Usuário
router.post("/register", async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ error: "Email e senha são obrigatórios" });
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  const db = await openDb();

  try {
    await db.run("INSERT INTO users (email, password) VALUES (?, ?)", [
      email,
      hashedPassword,
    ]);
    res.json({ message: "Usuário registrado com sucesso" });
  } catch (error) {
    res
      .status(400)
      .json({
        error: "Erro ao registrar usuário. Email pode já estar em uso.",
      });
  }
});

// 🔵 Login de Usuário
router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  const db = await openDb();
  const user = await db.get("SELECT * FROM users WHERE email = ?", [email]);

  if (!user || !(await bcrypt.compare(password, user.password))) {
    return res.status(401).json({ error: "Credenciais inválidas" });
  }

  const token = jwt.sign({ userId: user.id }, SECRET_KEY, { expiresIn: "1h" });
  res.json({ token });
});

export default router;
