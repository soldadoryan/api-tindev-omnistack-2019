const mysql = require('mysql-model');

var connection = mysql.createConnection({
    host:       "localhost",
    user:       "root",
    password:   "",
    database:   "tindev"
});

module.exports = connection;