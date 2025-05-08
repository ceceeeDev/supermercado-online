// Importa el módulo sqlite3 para poder trabajar con bases de datos SQLite
const sqlite3 = require("sqlite3");

// Crea o abre una base de datos SQLite llamada "data.db" con permisos de lectura y escritura
const db = new sqlite3.Database("./data.db", sqlite3.OPEN_READWRITE | sqlite3.OPEN_CREATE, (err) => {
  if (err) return console.error("Error al abrir o crear la base de datos:", err);
  console.log("Base de datos abierta correctamente.");
});


// Define la instrucción SQL para crear la tabla 'products' si no existe
const sql = `
  CREATE TABLE IF NOT EXISTS products (
    id INTEGER PRIMARY KEY AUTOINCREMENT, -- Clave primaria, se incrementa automáticamente
    name TEXT NOT NULL,                   -- Nombre del producto (obligatorio)
    price REAL NOT NULL,                  -- Precio del producto (obligatorio, número decimal)
    image TEXT NOT NULL                   -- Ruta o nombre del archivo de imagen (obligatorio)
  );
`;


// Ejecuta la creación de la tabla
db.run(sql, (err) => {
  if (err) return console.error("Error al crear la tabla:", err);
  console.log("Tabla 'products' creada correctamente.");
});

// Cierra la conexión a la base de datos después de crear la tabla
db.close();
