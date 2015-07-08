var config = require('./config.js');
var mongoose = require('mongoose'); 

console.log("Conectando ao MongoDB...");

mongoose.connect(config.mongodb.connection);
var db = mongoose.Connection;

if (db == 'undefined') {
    console.log("Erro ao criar conexão com MongoDB.");
}
console.log("Conexão com MongoDB realizada com sucesso.");

// Cria schema para Filme
var FilmeSchema = mongoose.Schema({
    CodFilme: String,
    Nome: String,
    Genero: String,
    Lancamento: Number
});
var FilmeModel = mongoose.model('Filme', FilmeSchema);
console.log("Schemas definidos com sucesso.");

// Seleciona todos os filmes
exports.get = function (request, response) {
    console.log("Selecionando todos os filmes.");

    FilmeModel.find().exec(function (error, filmes) {
        if (error) 
            response.status(500).send(error);
        
        response.send(filmes);
    });
};

// Seleciona um filme pelo id
exports.getById = function (request, response) {
    console.log("Selecionando o filme com id " + request.params.id);

    FilmeModel.findOne({ _id: request.params.id }, function (error, filme) {
        if (error)
            response.status(500).send(error);
        
        response.send(JSON.stringify(filme));
    });
};

// Cria um novo filme
exports.add = function (request, response) {
    console.log("Criando o filme " + request.body.Nome);
    
    var novoFilme = 
    {
        CodFilme: request.body.CodFilme, 
        Nome: request.body.Nome, 
        Genero: request.body.Genero,
        Lancamento: request.body.Lancamento
    };

    FilmeModel.create(novoFilme, function (error, filme) {
        if (error)
            response.status(500).send(error);
        
        response.send("Filme criado com sucesso!");
    });
};

// Altera um filme
exports.put = function (request, response) {
    console.log("Alterando o filme com id " + request.params.id);

    FilmeModel.findOne({ _id: request.params.id }, function (error, filme) {
        if (error) {
            response.status(500).send(error);
        } else {
            
            filme.CodFilme = request.body.CodFilme;
            filme.Nome = request.body.Nome;
            filme.Genero = request.body.Genero;
            filme.Lancamento = request.body.Lancamento;
            
            filme.save(function (err) {
                if (err)
                    response.status(500).send(err);
                
                response.send("Filme alterado com sucesso!");
            });
        }
    });
};

// Apaga um filme
exports.delete = function (request, response) {
    console.log("Apagando o filme com id " + request.params.id);

    FilmeModel.remove({ _id: request.params.id }, function (error, filme) {
        if (error)
            response.status(500).send(error);
        
        response.send("Filme apagado com sucesso!");
    });
};