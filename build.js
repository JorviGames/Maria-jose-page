
const fs = require("node:fs");
const path = require("node:path");

const origen = path.join(__dirname, "src", "views", "index.html");
const destino = path.join(__dirname, "public", "index.html");

fs.mkdirSync(path.dirname(destino), { recursive: true });
fs.copyFileSync(origen, destino);

console.log("HTML copiado correctamente a public/index.html");
