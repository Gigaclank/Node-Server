/* Modules */
var morgan = require('morgan');
var express = require('express');
var fs = require('fs');
var path = require('path');
var basicAuth = require('express-basic-auth');
var bodyParser = require('body-parser')
require('body-parser-xml')(bodyParser);

/* Custom Files */
var constants = require('./constants');
var db = require('./database');

/* Instantiate variables/objects */
var app = express();
var accessLogStream;

exports.app = app;

var EasyXml = require('easyxml');

var serializer = new EasyXml({
    singularize: true,
    rootElement: 'response',
    dateFormat: 'ISO',
    manifest: true
});


/* express middleware*/

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(bodyParser.xml());

app.use(function (req, res, next) {
    res.sendData = function (obj) {
        var json = req.accepts('json');
        var text = req.accepts('text/html')
        var xmlAccepted = req.accepts('application/xml')
        if (json || text) {
            res.header('Content-Type', 'application/json');
            res.send(obj);
        } else if (xmlAccepted) {
            res.header('Content-Type', 'text/xml');
            var xml = serializer.render(obj);
            res.send(xml);
        } else {
            res.send(406);
        }
    };

    next();
});

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
    // db.GetUsers().then(function (data) {
    //     console.log(data);

    // }).catch(function (rej) {
    //     retData = 'Failure '+rej;
    //     res.json(retData);
    //     console.log(retData);
    // });
    app.use(basicAuth({ challenge: true, users: constants.users, unauthorizedResponse: getUnauthorizedResponse }))
}


function getUnauthorizedResponse(req) {
    return req.auth
        ? JSON.parse(JSON.stringify('Credentials ' + req.auth.user + ':' + req.auth.password + ' rejected'))
        : JSON.parse(JSON.stringify('No credentials provided'))
}


app.get('/favicon.ico', function (req, res) {
    var img = fs.readFileSync('./favicon.ico');
    res.writeHead(200, { 'Content-Type': 'image/ico' });
    res.end(img, 'binary');
});

/* Display server ports */
app.get('/Ports', function (req, res) {
    const SerialPort = require('serialport');
    var port;
    SerialPort.list().then(function (data) {
        // console.log(data);
        var portNames = [];
        data.forEach(function (port) {
            //  port = port.comName;
            console.log(port.comName);
            portNames.push(port.comName);
        })
        res.sendData(portNames);
    }).catch(function (rej) {
        retData = 'Failure ' + rej;
        console.log(retData);
        res.sendData(retData);
    });

})

//Display Data from a table
app.get('/:Table', function (req, res) {
    var retData;
    db.GetAllData(req.params.Table).then(function (data) {
        retData = data;
        res.sendData(retData);
        console.log(retData);
    }).catch(function (rej) {
        retData = 'Failure ' + rej;
        res.sendData(retData);
        console.log(retData);
    });
})

//default catch handle
app.get(constants.DefaultCatch, function (req, res) {
    var retData;
    db.GetAllData('testtable').then(function (data) {
        TestData = {
            Users: data,
        }

        res.sendData(TestData);
    }).catch(function (rej) {
        retData = 'Failure ' + rej;
        res.sendData(retData);
        console.log(retData);
    });
})

/* POST Headers */
app.post('/post', function (req, res) {
    var user_name = req.body.user || req.body.info.user;
    var password = req.body.pass || req.body.info.pass;
    var status = 200;
    console.log(req.body);
    console.log("User name = " + user_name + ",password is " + password);
    if (user_name == "Name" && password == "password") {

        status = 200;
        obj = {
            success: true,
            status: status,
            epoch: Date.now().toString(),
        }
    }
    else {
        status = 400;
        obj = {
            success: false,
            status: status,
            epoch: Date.now().toString(),
        }

    }

    res.status(status).sendData(obj);
})