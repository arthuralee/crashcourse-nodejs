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