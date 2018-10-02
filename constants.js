/* Modules */
fs = require('fs');

enableConsoleLog = true;
enableServer = true;
enableSecureServer = true;
enableBasicAuth = false;
enableFileLogging = true;
enableReducedHeaders = true;

if(enableConsoleLog === false){
    console.log = function() {};
}
ServerPort = '80';
SecureServerPort = '443';
DefaultCatch = '/*';
DefaultCatchResponse = "Page Not Found";

/* SSL Connection details */
KeyLocation = 'ssl/privatekey.pem';
CertLocation = 'ssl/certificate.pem';

privateKey = fs.readFileSync(KeyLocation).toString();
certificate = fs.readFileSync(CertLocation).toString();

Credentials = {
    key: privateKey,
    cert: certificate,
    rejectUnauthorized: true
};

/* Database Connection Details */
DBHost = '127.0.0.1'
DBUser = 'Dummy'
DBPassword = 'Dummy'
DBPort = '3306'
DBName = 'testdb'

/* Basic Auth Information */
users = {
    'admin': 'supersecret',
    'adam': 'password1234',
}
/* Log File Details */

LogFile = 'logs/access.log';

/* Exports */
exports.ServerPort = ServerPort;
exports.SecureServerPort = SecureServerPort;
exports.DefaultCatch = DefaultCatch;
exports.DefaultCatchResponse = DefaultCatchResponse;
exports.Credentials = Credentials;

exports.DBHost = DBHost;
exports.DBUser = DBUser;
exports.DBPassword = DBPassword;
exports.DBPort = DBPort;
exports.DBName = DBName;

exports.users = users;

exports.enableServer = enableServer;
exports.enableSecureServer = enableSecureServer;
exports.enableBasicAuth = enableBasicAuth;
exports.enableFileLogging = enableFileLogging;
exports.enableReducedHeaders = enableReducedHeaders;
exports.LogFile = LogFile;
exports.enableConsoleLog = enableConsoleLog ;