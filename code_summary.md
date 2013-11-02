ls.py

```python
from os import listdir
from os import sys

if len(sys.argv) == 2:
  files = listdir(sys.argv[1])
else:
  files = listdir(".")

for file in files:
  print file
```

ls.js

```javascript
// Include the fs node module to interact with filesystem
var fs = require("fs");

// Read the list of files in path
var files;

if (process.argv.length == 3){
  files = fs.readdirSync(process.argv[2]);
} else {
  files = fs.readdirSync(".");
}

// Log the filenames to the console
for (var i=0; i<files.length; i++) {
        console.log(files[i]);
}
```

count.js

```javascript
// Include the fs node module to interact with filesystem
var fs = require("fs");

// Get path from the command line argument
var path = process.argv[2];

// Get n from the command line argument
var n = process.argv[3];

// Create string
var str = "";
for (var i=1; i<=n; i++) {
        str += i + " ";
}

// write to file
fs.writeFileSync(path, str);
```

server1.js

```javascript
// include the HTTP node module
var http = require("http");

// create HTTP server that responds with Hello World
var server = http.createServer(function (req, res) {
        res.end("Hello World!\n");
});

// Bind the server to listen on port 8080
server.listen(8080);
```

server2.js

```javascript
// include the HTTP node module
var http = require("http");

// create HTTP server that responds with the request url
var server = http.createServer(function (req, res) {
        res.end("You just sent a " + req.method + " request to " + req.url);
});

// Bind the server to listen on port 8080
server.listen(8080);
```

server3.js

```javascript
// include the HTTP node module
var http = require("http");

// our "data" - array of users
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

// create HTTP server that responds to requests
var server = http.createServer(function (req, res) {
  if (req.method !== "GET") res.end("Not supported");

  // tokenize path
  var url = req.url.split("/");

  // check first path section
  switch (url[1]) {

    // users route
    case "users":

      // see if we are querying for a specific user
      if (url[2]) {
        for (var i=0; i<users.length; i++) {
          if (users[i].id == url[2]) res.end(JSON.stringify(users[i]));
        }
        res.end("User not found");
      } else {
        res.end(JSON.stringify(users));
      }
      break;

    // joke route
    case "joke":
      res.end("You want to hear a JavaScript joke? I'll callback later.");
      break;
  }

  // if all fails
  res.end("Query not supported");
});

// Bind the server to listen on port 8080
server.listen(8080);
```

server1.js

```javascript
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
```

board.html

```html
  <ul id="msgs"></ul>

  <script src="/socket.io/socket.io.js"></script>
  <script>
    var socket = io.connect("http://localhost:8080");

    var ul = document.getElementById("msgs");
    socket.on("new", function(data) {
      var li = document.createElement("li");
      li.innerHTML = data.msg;
      ul.appendChild(li);
    });
  </script>
```

index.html

```html
  <input type="text" id="input" />
  <button id="sendbtn">Send</button>


  <script src="/socket.io/socket.io.js"></script>
  <script>
    var socket = io.connect("http://localhost:8080");

    var btn = document.getElementById("sendbtn");
    var input = document.getElementById("input");
    btn.onclick = function() {
      socket.emit("msg", { msg: input.value });
    };
  </script>
```

board.js

```javascript
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
```

static.js

```javascript
var http = require("http");
var fs = require("fs");

var server = http.createServer(function(req,res) {
  var filename = req.url.substr(1);
  fs.exists(filename, function(exists) {
    if (!exists) {
      res.writeHead(404, {"Content-Type": "text/plain"});
      res.end("404 Not Found\n");
      return;
    } else {
      fs.readFile(filename, "binary", function(err, file) {
        if (err) {
          res.writeHead(500, {"Content-Type": "text/plain"});
          res.end(err + "\n");
          return;
        } else {
          res.writeHead(200);
          res.end(file, "binary");
        }
      })
    }
  });
});

server.listen(8080);
```