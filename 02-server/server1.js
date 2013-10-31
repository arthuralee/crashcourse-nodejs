// include the HTTP node module
var http = require("http");

// create HTTP server that responds with Hello World
var server = http.createServer(function (req, res) {
	res.end("Hello World!\n");
});

// Bind the server to listen on port 8080
server.listen(8080);