var express = require("express");
var app = express();
var server = require("http").Server(app);
var io = require("socket.io")(server);

var messages = [
  {
    id: 1,
    text: "Hola soy un mensaje",
    author: "Computadora",
  },
];

app.use(express.static("public"));

//PROBANDO EL REQUEST(LO PUEDES QUITAR)
app.get("/hello", function (req, res) {
  res.status(200).send("Hello World!");
});

io.on("connection", function (socket) {
  console.log("Alguien se ha conectado con Sockets");

  //envia el mensaje
  socket.emit("messages", messages);

  //recibe mensaje
  socket.on("new-message", function (data) {
    messages.push(data);

    io.sockets.emit("messages", messages);
  });
});

//AQUI COLOCAS EL PUERTO DE TU SERVIDOR Y RUTA
server.listen(8080, function () {
  console.log("Servidor corriendo en http://192.168.25:8080");
});