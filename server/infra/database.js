const Client = require('pg').Client;
const db = new Client({
    user: 'justo',
    password: '123',
    host: '200.19.1.18',
    port: '5432',
    database: 'justo',
});

db.connect();
console.log(db.database);


module.exports = db;