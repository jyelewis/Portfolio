var sqlite3 = require('sqlite3');

module.exports = new sqlite3.Database(__dirname+'/../../dataplus/database.db')