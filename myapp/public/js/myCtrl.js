var app = angular.module("myApp",[]);

// window.localstorage: sirve para guardar sesiones a pesar de cerrar el explorador
// o para ocupar en otro controlador
app.controller("myCtrl", function($scope,$http) {
    $scope.title="Listar Usuarios";
    $scope.title2="Registrar Usuario";
    $scope.formData = {};

    $http.get('/api/usuarios')
        .success(function(data) {
            $scope.users = data;
            console.log(data)
        })
        .error(function(data) {
            console.log('Error: ' + data);
        });

    $scope.crearUsuario = function(){
        // post(url, datosdelForm)
        $http.post('/api/usuarios', $scope.formData)
            .success(function(data) {
                $scope.formData = {};
                $scope.todos = data;
                console.log(data);
            })
            .error(function(data) {
                console.log('Error:' + data);
            });
    };

    $scope.deleteUsuario = function(id) {
        $http.delete('/api/usuarios/' + id)
            .success(function(data) {
                $scope.users = data;
                console.log(data);
            })
            .error(function(data) {
                console.log('Error:' + data);
            });
    };

    $scope.profile = function (id) {
        $http.get('/api/usuarios/'+ id)
            .success(function (data) {
                $scope.user = data;
                console.log(data);
            })
            .error(function (data) {
                console.log('Error:' +  data);
            })

    }
});
