app.controller('mynodecontroller', function ($scope, mynodeservice) {
    
    $scope.Filme = {
        _id:"",
        CodFilme: "",
        Nome: "",
        Genero: "",
        Lancamento: 2015
    }

    carregaFilmes();
    
    function carregaFilmes() {
        var promise = mynodeservice.get();
        promise.then(function (resp) {
            $scope.Filmes = resp.data;
            $scope.Message = "Requisição GET realizada com sucesso!";
        }, function (err) {
            $scope.Message = "Erro na requisição GET:" + err.status;
        });
    };

    $scope.salvar = function () {
        
        if ($scope.Filme._id == "") {

            var post = mynodeservice.post($scope.Filme);
            post.then(function (resp) {
                $scope.Message = "Requisição POST realizada com sucesso!";
                carregaFilmes();
                limpaCampos();
            }, function (err) {
                $scope.Message = "Erro na requisição POST: " + err.status;
            });

        }
        else {

            var put = mynodeservice.put($scope.Filme);
            put.then(function (resp) {
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
        $scope.Filme.Lancamento = 2015;
    }

    $scope.editar = function (filme) {
        var promise = mynodeservice.getById(filme._id);
        promise.then(function (resp) {
            $scope.Message = "Requisição GET realizada com sucesso!";
            $scope.Filme = {
                _id: resp.data._id,
                CodFilme: resp.data.CodFilme,
                Nome: resp.data.Nome,
                Genero: resp.data.Genero,
                Lancamento: resp.data.Lancamento
            };
        }, function (err) {
            $scope.Message = "Erro na requisição GET:" + err.status;
        });
    }

    $scope.apagar = function (filme) {
        var promise = mynodeservice.delete(filme._id);
        promise.then(function (resp) {
            $scope.Message = "Requisição DELETE realizada com sucesso!";
            carregaFilmes();

        }, function (err) {
            $scope.Message = "Erro na requisição DELETE:" + err.status;
        });
    }
    
});