var connect = require('connect');
var serveStatic = require('serve-static');
connect().use(serveStatic(__dirname)).listen(8099);


// npm install connect
// npm install serve-static
// To start a server "node server.js"
// http://localhost:8099/