var constants = require('./constants');
var mysql = require('mysql');
//  mysql Connection
var con = mysql.createConnection({
    host: constants.DBHost,
    user: constants.DBUser,
    password: constants.DBPassword,
    mysql_port: constants.DBPort,
    database: constants.DBName,

})

//  Connect to database
con.connect(function (err) {
    if (err) throw (err)
    console.log("Connected");
});

module.exports = {

    GetUsers: function GetUsers() {
        return new Promise(function (resolve, reject) {
            let sql = 'SELECT * FROM basicauth';
            var rows
            con.query(sql, function (err, result) {
                if (result === undefined) {
                    reject(Error('NoData'));
                    return;
                }
                
                rows = JSON.parse(JSON.stringify(result))

                if (rows !== undefined) {
                    //console.log(rows);
                    var data = JSON.stringify(rows);
                    resolve(rows);
                } else {
                    reject(Error('NoData'));
                }
            });
        });
    },



    GetAllData: function GetAllData(Table) {
        return new Promise(function (resolve, reject) {
            let sql = 'SELECT * FROM ' + Table;
            var rows
            con.query(sql, function (err, result) {
                if (result === undefined) {
                    reject(Error('NoData'));
                    return;
                }
                
                rows = JSON.parse(JSON.stringify(result))

                if (rows !== undefined) {
                    //console.log(rows);
                    var data = JSON.stringify(rows);
                    resolve(rows);
                } else {
                    reject(Error('NoData'));
                }
            });
        });
    },

}
