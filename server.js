// === server.js ===

const express = require("express");
const sqlite3 = require("sqlite3");
const path = require("path");

const app = express();
const PORT = 3000;

// Conectar a la base de datos SQLite
const db = new sqlite3.Database("./data.db", sqlite3.OPEN_READWRITE, (err) => {
  if (err) return console.error("Error al conectar con la base de datos:", err);
  console.log("Base de datos conectada correctamente.");
});

// Middleware para servir archivos estáticos desde /public
app.use(express.static(path.join(__dirname, "public")));

// Middleware para interpretar datos JSON
app.use(express.json());

// Ruta API para obtener productos desde la base de datos
app.get("/api/products", (req, res) => {
  const sql = "SELECT * FROM products";
  db.all(sql, (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(rows);
  });
});

// Ruta para aumentar la cantidad en el carrito de un producto
app.post("/api/add/:id", (req, res) => {
  const id = req.params.id;
  const sql = "UPDATE products SET cartCount = cartCount + 1 WHERE id = ?";
  db.run(sql, [id], (err) => {
    if (err) return res.status(500).json({ error: err.message });
    res.sendStatus(200);
  });
});

// Ruta para disminuir la cantidad en el carrito de un producto
app.post("/api/remove/:id", (req, res) => {
  const id = req.params.id;
  const sql = "UPDATE products SET cartCount = MAX(cartCount - 1, 0) WHERE id = ?";
  db.run(sql, [id], (err) => {
    if (err) return res.status(500).json({ error: err.message });
    res.sendStatus(200);
  });
});

// Ruta de respaldo: redirige a index.html si no coincide otra ruta
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

// Iniciar el servidor en el puerto 3000
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
