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

fs.writeFileSync(path, str);