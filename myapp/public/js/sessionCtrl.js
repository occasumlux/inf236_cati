angular.module("myApp",[])
    .controller("sessionCtrl", function($scope, $http, $window) {
        $window.localStorage['id'] = 0;
        $scope.guardarId= function (id) {
            $window.localStorage['id'] = id;
        };

    });

