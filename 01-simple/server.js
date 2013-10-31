// Include the fs node module to interact with filesystem
var fs = require("fs");

// Get the path from the command line argument
var path = process.argv[2];

// Read the list of files in path
var files = fs.readdirSync(path);

// Log the filenames to the console
for (var i=0; i<files.length; i++) {
	console.log(files[i]);
}