// include the HTTP node module
var http = require("http");
var express = require("express");

// initialize express
var app = express();

app.get("/", function(req, res) {
  res.sendfile("index.html");
});

app.get("/board", function(req, res) {
  res.sendfile("board.html");
});

// Bind the server to listen on port 8080
var server = app.listen(8080);
var io = require("socket.io").listen(server);

io.sockets.on("connection", function(socket) {
  socket.on("msg", function (data) {
    io.sockets.emit("new", data);
  });
});
