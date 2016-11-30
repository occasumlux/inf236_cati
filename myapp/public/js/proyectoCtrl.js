angular.module("myApp",[])
    .controller("proyectoCtrl", function($scope, $http, $window) {

        $scope.selection = [];
        $scope.formData = {};

        $scope.toggleSelection = function toggleSelection(id) {
            var idx = $scope.selection.indexOf(id);

            // is currently selected
            if (idx > -1) {
                $scope.selection.splice(idx, 1);
            }

            // is newly selected
            else {
                $scope.selection.push(id);
            }
        };

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
            $http.post('/api/proyecto', {form:$scope.formData, selec:$scope.selection})
                .success(function(data) {
                    $scope.formData = {};
                    $scope.selection = {};
                    $scope.todos = data;
                    console.log(data);
                })
                .error(function(data) {
                    console.log('Error:' + data);
                });
        };

    });
