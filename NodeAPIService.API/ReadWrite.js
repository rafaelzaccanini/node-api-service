var mongooseDrv = require('mongoose'); 
mongooseDrv.connect('mongodb://localhost:27017/LocadoraDB');

var db = mongooseDrv.Connection;

if (db == 'undefined') {
    console.log("Erro ao criar conexão com MongoDB");
}

//Cria schema para Filme
var FilmeInfoSchema = mongooseDrv.Schema({
    CodFilme: String,
    Nome: String,
    Genero: String,
    Lancamento: Number
});
var FilmeInfoModel = mongooseDrv.model('FilmeInfo', FilmeInfoSchema);

// Seleciona todos os filmes
exports.get = function (req, resp) {
    FilmeInfoModel.find().exec(function (error, res) {
        if (error) {
            resp.send(500, { error: error });
        } else {
            resp.send(res);
        }
    });
};

// Seleciona um filme pelo id
exports.getById = function (req, resp) {
    FilmeInfoModel.findOne({ _id: req.params.id }, function (error, res) {
        if (error) {
            resp.send(500, { error: error });
        } else {
            resp.send(JSON.stringify(res));
        }
    });
};

// Cria um novo filme
exports.add = function (request, response) {
    var newFilme = 
    {
        CodFilme: request.body.CodFilme, 
        Nome: request.body.Nome, 
        Genero: request.body.Genero,
        Lancamento: request.body.Lancamento
    };
    FilmeInfoModel.create(newFilme, function (addError, addedFilme) {
        if (addError) {
            response.send(500, { error: addError });
        }
        else {
            response.send({ success: true, filme: addedFilme });
        }
    });
};

// Altera um filme
exports.put = function (request, response) {
    FilmeInfoModel.findOne({ _id: request.params.id }, function (error, res) {
        if (error) {
            response.send(500, { error: error });
        } else {
            
            res.CodFilme = request.body.CodFilme;
            res.Nome = request.body.Nome;
            res.Genero = request.body.Genero;
            res.Lancamento = request.body.Lancamento;
            
            res.save(function (err) {
                if (err)
                    res.send(500, { error: err });
                
                response.send(JSON.stringify(res));
            });
        }
    });
};

// Apaga um filme
exports.delete = function (request, response) {
    FilmeInfoModel.remove({ _id: request.params.id }, function (error, res) {
        if (error) {
            response.send(500, { error: error });
        } else {
            response.send("Filme apagado com sucesso!");
        }
    });
};