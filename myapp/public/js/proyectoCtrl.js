angular.module("myApp",[])
    .controller("proyectoCtrl", function($scope, $http, $window) {
        $scope.formData = {};
        $http.get('/api/encuestados')
            .success(function(data) {
                $scope.encuestados = data;
                console.log(data)
            })
            .error(function(data) {
                console.log('Error: ' + data);
            });

        $scope.crearProyecto = function(){
            // post(url, datosdelForm)
            $http.post('/api/proyecto', $scope.formData)
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
