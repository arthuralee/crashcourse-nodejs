// include the HTTP node module
var http = require("http");
var express = require("express");

// initialize express
var app = express();

var users = [
  {
    id: 99,
    name: "Arthur",
    email: "arthur@arthurlee.me"
  },
  {
    id: 201,
    name: "John",
    email: "john@example.com"
  }
];


app.get("/users", function(req, res) {
  res.send(users);
});

app.get("/users/:id", function(req, res) {
  for (var i=0; i<users.length; i++) {
    if (users[i].id == req.params.id) res.send(users[i]);
  }
  res.end("User not found");
});

app.get("/joke", function(req, res) {
  res.end("You want to hear a JavaScript joke? I'll callback later.");
});

app.all("*", function(req, res) {
  res.end("Query not supported");
});

// Bind the server to listen on port 8080
app.listen(8080);