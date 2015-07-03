app.controller('nodecontroller', function ($scope, nodeservice) {
    
    $scope.Filme = {
        _id:"",
        CodFilme: "",
        Nome: "",
        Genero: "",
        Lancamento: ""
    }

    carregaFilmes();
    
    function carregaFilmes() {
        var get = nodeservice.get();
        get.then(function (resposta) {
            $scope.Filmes = resposta.data;
        }, function (err) {
            $scope.Message = "Erro na requisição GET para a listagem:" + err.status;
        });
    };

    $scope.salvar = function () {
        
        // Verifica se é um novo filme
        if ($scope.Filme._id == "") {

            var post = nodeservice.post($scope.Filme);
            post.then(function (resposta) {
                $scope.Message = "Requisição POST realizada com sucesso!";
                carregaFilmes();
                limpaCampos();

            }, function (err) {
                $scope.Message = "Erro na requisição POST: " + err.status;
            });

        }
        else {

            var put = nodeservice.put($scope.Filme);
            put.then(function (resposta) {
                $scope.Message = "Requisição PUT realizada com sucesso!";
                carregaFilmes();
                limpaCampos();
            }, function (err) {
                $scope.Message = "Erro na requisição PUT: " + err.status;
            });

        }
    };

    $scope.limpar = function () {
        limpaCampos();
    }

    function limpaCampos()
    {
        $scope.Filme._id = "";
        $scope.Filme.CodFilme = "";
        $scope.Filme.Nome = "";
        $scope.Filme.Genero = "";
        $scope.Filme.Lancamento = "";
    }

    $scope.editar = function (filme) {
        var get = nodeservice.getById(filme._id);
        get.then(function (resposta) {
            $scope.Message = "Requisição GET realizada com sucesso!";
            $scope.Filme = {
                _id: resposta.data._id,
                CodFilme: resposta.data.CodFilme,
                Nome: resposta.data.Nome,
                Genero: resposta.data.Genero,
                Lancamento: resposta.data.Lancamento
            };
        }, function (err) {
            $scope.Message = "Erro na requisição GET:" + err.status;
        });
    }

    $scope.apagar = function (filme) {
        var apagar = nodeservice.delete(filme._id);
        apagar.then(function (resposta) {
            $scope.Message = "Requisição DELETE realizada com sucesso!";
            carregaFilmes();
        }, function (err) {
            $scope.Message = "Erro na requisição DELETE:" + err.status;
        });
    }
    
});