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