const sqlite3 = require("sqlite3");

const db = new sqlite3.Database("./data.db");

const sql = `ALTER TABLE products ADD COLUMN cartCount INTEGER DEFAULT 0`;

db.run(sql, (err) => {
  if (err) {
    console.error("⚠️ Error al agregar columna (puede que ya exista):", err.message);
  } else {
    console.log("✅ Columna 'cartCount' añadida correctamente.");
  }
});

db.close();
