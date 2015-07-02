app.service('mynodeservice', function ($http) {
    
    this.get = function(){
        var res = $http.get("http://localhost:8080/Locadora/api/filmes");
        return res;
    }

    this.getById = function (id) {
        
        var res = $http.get("http://localhost:8080/Locadora/api/filmes/" + id);
        return res;
    }

    this.post = function (filme) {
        var res = $http.post("http://localhost:8080/Locadora/api/filmes", filme);
        return res;
    }

    this.put = function (filme) {
        var res = $http.put("http://localhost:8080/Locadora/api/filmes/" + filme._id, filme);
        return res;
    }

    this.delete = function (id) {
        var res = $http.delete("http://localhost:8080/Locadora/api/filmes/" + id);
        return res;
    }
});