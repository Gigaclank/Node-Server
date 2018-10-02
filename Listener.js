/* Modules */
var http = require('http');
var https = require('https');

/* Custom Files */
var handler = require('./app');
var constants = require('./constants');
var httpServer = {};//empty objects
var httpsServer = {};//empty objects

/* Create Servers */

if (constants.enableServer === true) {
  httpServer = http.createServer(handler.app);
}

if (constants.enableSecureServer === true) {
  httpsServer = https.createServer(constants.Credentials, handler.app);//create server with the standard credentials.
}

if (Object.keys(httpServer).length !== 0) {//ensure the object has been created
  /* listen to non Secure Server */
  httpServer.listen(constants.ServerPort, function () {
    var host = httpServer.address().address;
    var port = httpServer.address().port;
    
    console.log('HTTP Server Listening at http://%s:%s', host, port);
  });

}

if (Object.keys(httpsServer).length !== 0) {//ensure the object has been created
  /* listen to Secure Server */
  httpsServer.listen(constants.SecureServerPort, function () {
    var host = httpsServer.address().address;
    var port = httpsServer.address().port;
    console.log('HTTPS Server Listening at http://%s:%s', host, port);
  });

}

