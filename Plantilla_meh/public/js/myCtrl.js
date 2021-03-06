/**
 * Created by famancil on 23-08-16.
 */
var app = angular.module("MiPrimerApp",[]);

app.controller("myCtrl", function($scope,$http,$window) {
    $scope.title="Listar Usuario";
    $scope.title2="Registrar Usuario";
    $scope.formData = {};
    $scope.user={};
    $scope.user.username= $window.localStorage['username'];
    /*$scope.firstName = "John";
    $scope.lastName= "Doe";*/

    $scope.logout = function(){
        $window.localStorage.clear();

    }


    $http.get('/api/usuarios')
        .success(function(data) {
            $scope.users = data;
            console.log(data)
        })
        .error(function(data) {
            console.log('Error: ' + data);
        });
    $scope.crearUsuario = function(){
        $http.post('/api/usuarios', $scope.formData)
            .success(function(data) {
                $scope.formData = {};
                $scope.usuarios = data;
                console.log(data);
            })
            .error(function(data) {
                console.log('Error:' + data);
            });
    };
    $scope.deleteUsuario = function(id) {
        $http.delete('/api/usuarios/' + id)
            .success(function(data) {
                $scope.usuarios = data;
                console.log(data);
            })
            .error(function(data) {
                console.log('Error:' + data);
            });
    };
    $scope.updateUsuario = function(id) {
        $http.put('/api/usuarios/' + id, {})
            .success(function(data) {
                $scope.usuarios = data;
                console.log(data);
            })
            .error(function(data) {
                console.log('Error:' + data);
            });
    };
});
/*app.controller("mysCtrl", function($scope,$http) {
    //$scope.title = "Listar Usuario";
    $scope.title2 = "Registrar Usuario";
});*/