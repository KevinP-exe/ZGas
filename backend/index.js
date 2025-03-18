// importo el archivo app.js
import app from "./app.js";
//importo el archivo de conexion de la base de datos
import "./database.js";
// importo el archivo config
import { config } from "./src/config.js";

// Creo una función que ejecuta el servidor
async function main() {
  app.listen(4000);
  console.log("Server running");
}

// Ejecuto la función
main();
