angular.module("myApp",[])
    .controller("sessionCtrl", function($scope, $http, $window) {
        $window.localStorage['id'] = 0;
        $window.localStorage['username'] = "";

        var userId = document.getElementById("user.id").innerHTML;

        $http.get('/api/usuarios/' + userId)
            .success(function (data) {
                $scope.user = data;
                //console.log(data.username);
                //$window.localStorage['user'] = data;
                $window.localStorage['username'] = data.username;
                console.log($window.localStorage['username'])
            })
            .error(function (data) {
                console.log('Error: ' + data);
            });

        $window.localStorage['id'] = userId;
        //console.log($window.localStorage['username']);

        $scope.guardarId= function (id) {
            $window.localStorage['id'] = id;
        };

    });

