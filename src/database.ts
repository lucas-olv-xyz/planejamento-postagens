import sqlite3 from "sqlite3";
import { open } from "sqlite";

// Função para abrir conexão com o banco de dados
export async function openDb() {
  return open({
    filename: "./database/posts.db",
    driver: sqlite3.Database,
  });
}
