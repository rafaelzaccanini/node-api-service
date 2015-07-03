var mongoose = require('mongoose'); 

mongoose.connect('mongodb://localhost:27017/LocadoraDB');
var db = mongoose.Connection;

if (db == 'undefined') {
    console.log("Erro ao criar conexão com MongoDB.");
}

//Cria schema para Filme
var FilmeSchema = mongoose.Schema({
    CodFilme: String,
    Nome: String,
    Genero: String,
    Lancamento: Number
});
var FilmeModel = mongoose.model('FilmeInfo', FilmeSchema);


// Seleciona todos os filmes
exports.get = function (request, response) {
    FilmeModel.find().exec(function (error, filmes) {
        if (error) 
            response.send(500, { error: error });
        else
            response.send(filmes);
    });
};

// Seleciona um filme pelo id
exports.getById = function (request, response) {
    FilmeModel.findOne({ _id: request.params.id }, function (error, filme) {
        if (error)
            response.send(500, { error: error });
        else
            response.send(JSON.stringify(filme));
    });
};

// Cria um novo filme
exports.add = function (request, response) {
    var novoFilme = 
    {
        CodFilme: request.body.CodFilme, 
        Nome: request.body.Nome, 
        Genero: request.body.Genero,
        Lancamento: request.body.Lancamento
    };

    FilmeModel.create(novoFilme, function (error, filme) {
        if (error)
            response.send(500, { error: error });
        else
            response.send("Filme criado com sucesso!");
    });
};

// Altera um filme
exports.put = function (request, response) {
    FilmeModel.findOne({ _id: request.params.id }, function (error, filme) {
        if (error) {
            response.send(500, { error: error });
        } else {
            
            filme.CodFilme = request.body.CodFilme;
            filme.Nome = request.body.Nome;
            filme.Genero = request.body.Genero;
            filme.Lancamento = request.body.Lancamento;
            
            filme.save(function (err) {
                if (err)
                    response.send(500, { error: err });
                
                response.send("Filme alterado com sucesso!");
            });
        }
    });
};

// Apaga um filme
exports.delete = function (request, response) {
    FilmeModel.remove({ _id: request.params.id }, function (error, filme) {
        if (error)
            response.send(500, { error: error });
        else
            response.send("Filme apagado com sucesso!");
    });
};