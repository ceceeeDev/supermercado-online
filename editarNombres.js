// === editarNombres.js ===

const sqlite3 = require("sqlite3");
const db = new sqlite3.Database("./data.db");

// Cambia aquí los nombres según el ID de cada producto

// Producto con ID 1
db.run("UPDATE products SET name = ? WHERE id = ?", ["Pack de Galletas", 1]);

// Producto con ID 2
db.run("UPDATE products SET name = ? WHERE id = ?", ["Coca Cola Pack", 2]);

// Producto con ID 3
db.run("UPDATE products SET name = ? WHERE id = ?", ["Doritos", 3]);

// Puedes seguir agregando más líneas para otros productos

// Cierre de la base de datos

db.close((err) => {
  if (err) console.error("Error al cerrar la base de datos:", err);
  else console.log("✅ Nombres actualizados correctamente.");
});
