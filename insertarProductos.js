// Importa el módulo sqlite3 para trabajar con bases de datos SQLite
const sqlite3 = require("sqlite3");

// Crea o abre una base de datos SQLite llamada "data.db" con permisos de lectura y escritura
const db = new sqlite3.Database("./data.db", sqlite3.OPEN_READWRITE, (err) => {
  if (err) return console.error(err);
  console.log("Conectado a la base de datos.");
});


// Lista de productos a insertar en la tabla 'products'
const productos = [
  { name: "Galleta Oreo", price: 5.5, image: "producto1.jpg" },
  { name: "Paquete de Coca Cola", price: 8.0, image: "producto2.jpg" },
  { name: "Dorito", price: 0.75, image: "producto3.jpg" }
];


// Inserta cada producto de la lista en la base de datos usando un bucle
productos.forEach(p => {
  db.run(
    // Consulta preparada para insertar los datos de forma segura
    "INSERT INTO products (name, price, image) VALUES (?, ?, ?)",
    [p.name, p.price, p.image], // Los valores se pasan como arreglo
    (err) => {
      if (err) return console.error("Error al insertar producto:", err); // Muestra si ocurre error
    }
  );
});


// Cierra la conexión a la base de datos al finalizar
db.close();
