const express = require('express');
const MongoClient = require('mongodb').MongoClient;
const bodyParser = require('body-parser');
const initControllers = require('./app/controllers/');

const app = express();
const port = 8000;

app.use(bodyParser.json());

var url = 'mongodb://localhost:27017/';
// Use connect method to connect to the Server
MongoClient.connect(url, function(err, database) {
    if(err) console.log('Could not connect to database');

    const db = database.db('smoothit');
    initControllers(app, db);

    app.listen(port, '0.0.0.0');
});