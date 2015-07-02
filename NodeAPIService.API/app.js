var body_Parser = require('body-parser'); 
var path = require('path'); 
var express = require('express'); 
var http = require('http'); 

var app = express(); 
app.use(body_Parser());


app.use(function (req, res, next) {
    
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:29301'); //Porta do site que vai chamar a API
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
    next();
});

var rwOperation = require('./ReadWrite.js'); 
var communicationPort = 8080; 

app.get('/Locadora/api/filmes/:id', rwOperation.getById);
app.get('/Locadora/api/filmes', rwOperation.get);
app.post('/Locadora/api/filmes', rwOperation.add);
app.put('/Locadora/api/filmes/:id', rwOperation.put);
app.delete('/Locadora/api/filmes/:id', rwOperation.delete);

app.listen(communicationPort);