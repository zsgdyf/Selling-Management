var mysql = require('mysql');
var connection = mysql.createConnection({
    host:'127.0.0.1',
    user:'root',
    password:'root',
    database:'product',
    charset:'UTF8_GENERAL_CI'
});
connection.connect(function(err) {
    if (err) {
        console.log(err);
        return;
    }
    console.log("Connection success！");
});
module.exports = connection;