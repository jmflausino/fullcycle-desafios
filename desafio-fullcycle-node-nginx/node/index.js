const express = require("express");
const path = require('path');

const app = express()
app.set('view engine', 'pug')
app.set("views", path.join(__dirname, "views"));

const port = 3000;
const config = {
    host: 'db',
    user: 'root',
    password: 'root',
    database: 'nodedb'
};

const mysql = require('mysql');
const connection = mysql.createConnection(config);

const insert = `INSERT INTO people(name) VALUES('Ronaldinho Gaúcho')`;
connection.query(insert);

const sql = `SELECT * FROM people`;

const people = [];
connection.query(sql, function (err, result, fields) {
    if (err) throw err;

    Object.keys(result).forEach(function(key) {
        var person = result[key];
        people.push(person.name)
      });
});

connection.end();

app.get('/', function(req, res) {

    res.render('people', {people: people });

  });

app.listen(port, () => {
    console.log('Rodando na porta ' + port)
})