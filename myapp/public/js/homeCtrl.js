angular.module("myApp",[])
    .controller("homeCtrl", function($scope, $http, $window) {
        $scope.title = " Software CATI ";
        $scope.title2 = " Bienvenido ";

        if($window.localStorage['id'] == 0){
            $window.location.href="/home";
        }
        $http.get('/api/usuarios/' + $window.localStorage['id'])
            .success(function (data) {
                $scope.user = data;
                console.log(data)
            })
            .error(function (data) {
                console.log('Error: ' + data);
            });

    });
