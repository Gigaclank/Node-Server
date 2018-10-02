/* Modules */
var morgan = require('morgan');
var express = require('express');
var fs = require('fs');
var path = require('path');
var basicAuth = require('express-basic-auth');

/* Custom Files */
var constants = require('./constants');
var db = require('./database');

/* Instantiate variables/objects */
var app = express();
var accessLogStream;

exports.app = app;

/* Reduced Headers Sent */
if (constants.enableReducedHeaders === true) { 
    /*
    cannot remove the following headers:
    connection
    content-length
    content-type
    date
    */
    app.disable('x-powered-by');
    app.disable('etag');
}
/* Log Connections */
if (constants.enableFileLogging === true) {
    // create a write stream (in append mode)
    accessLogStream = fs.createWriteStream(path.join(__dirname, constants.LogFile), { flags: 'a' });
    // setup the logger
    app.use(morgan('combined', { stream: accessLogStream }));
}

/* Basic Authentication */
if (constants.enableBasicAuth === true) {
    app.use(basicAuth({ users: constants.users }))
}
//specific handler
app.get('/:Table', function (req, res) {
    var retData;
    db.GetAllData(req.params.Table).then(function (data) {
        retData = data;
        res.json(retData);
        console.log(retData);
    }).catch(function (rej) {
        retData = 'Failure '+rej;
        res.json(retData);
        console.log(retData);
    });
})

//default catch handle
app.get(constants.DefaultCatch, function (req, res) {
    var retData;
    db.GetAllData('userinformation').then(function (data) {
        retData = data;
        res.json(retData);
        console.log(retData);
    }).catch(function (rej) {
        retData = 'Failure '+rej;
        res.json(retData);
        console.log(retData);
    });
})

