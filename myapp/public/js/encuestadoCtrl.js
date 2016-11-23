angular.module("myApp",[])
    .controller("encuestadoCtrl", function($scope, $http, $window) {
        $scope.title = " Agregar Encuestado ";
        $scope.title2 = "Lista de Encuestados";

        $http.get('/api/encuestados')
            .success(function(data) {
                $scope.encuestados = data;
                console.log(data)
            })
            .error(function(data) {
                console.log('Error: ' + data);
            });

        $scope.crearUsuario = function(){
            // post(url, datosdelForm)
            $http.post('/api/entrevistado', $scope.formData)
                .success(function(data) {
                    $scope.formData = {};
                    $scope.todos = data;
                    console.log(data);
                })
                .error(function(data) {
                    console.log('Error:' + data);
                });
        };
    });
