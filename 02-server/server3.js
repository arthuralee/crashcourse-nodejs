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