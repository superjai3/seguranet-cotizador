const https = require("https");
const fs = require("fs");
const path = require("path");

// Asegúrate de que las rutas sean correctas
const options = {
  key: fs.readFileSync(path.join(__dirname, "certs", "key.pem")), // Ruta a tu archivo key.pem
  cert: fs.readFileSync(path.join(__dirname, "certs", "cert.pem")), // Ruta a tu archivo cert.pem
};

const app = require("express")(); // O tu aplicación de Node.js si estás usando otra librería

// Aquí puedes agregar las rutas de tu servidor, por ejemplo:
app.get("/", (req, res) => {
res.send("¡HTTPS funcionando correctamente!");
});

// Crea el servidor HTTPS
https.createServer(options, app).listen(443, () => {
console.log("Servidor corriendo en https://localhost:443");
});
