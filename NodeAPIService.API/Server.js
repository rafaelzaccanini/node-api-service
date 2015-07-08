var body_parser = require('body-parser'); 
var express = require('express'); 
var config = require('./config.js');
var operacoes_filme = require('./filme-module.js'); 

var app = express(); 
app.use(body_parser.urlencoded({
    extended: true
}));
app.use(body_parser.json());

app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*'); 
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
    next();
});

app.get('/Locadora/api/filmes/:id', operacoes_filme.getById);
app.get('/Locadora/api/filmes', operacoes_filme.get);
app.post('/Locadora/api/filmes', operacoes_filme.add);
app.put('/Locadora/api/filmes/:id', operacoes_filme.put);
app.delete('/Locadora/api/filmes/:id', operacoes_filme.delete);

app.listen(config.server.porta);