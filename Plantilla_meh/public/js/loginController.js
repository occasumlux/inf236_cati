/**
 * Created by famancil on 12-11-16.
 */
angular.module("MiPrimerApp",[])
    .controller("loginController",function ($scope,$http,$window) {
        $scope.title="Login";
        $scope.users=[];
        $scope.user={};
        console.log($window.localStorage['username']);

        $scope.aux=$window.localStorage['username'];
        if($window.localStorage['username']){
            $window.location.href="/home";
        }

        /*$http.get("http://192.168.0.107:3000/api/usuarios")
            .success(function (data) {
                console.log(data);

            })
            .error(function (err) {

            })*/


        $scope.login=function () {

            $http.get("http://192.168.0.107:3000/api/usuarios")
                .success(function (data) {
                    console.log(data);
                    $scope.users=data;
                    for (var i = 0; i < $scope.users.length; ++i){
                        if($scope.users[i].email == $scope.user.email &&
                            $scope.users[i].password == $scope.user.password){
                            $window.localStorage['id']=$scope.users[i].id;
                            $window.localStorage['username']=$scope.users[i].username;
                            $window.localStorage['email']=$scope.user.email;
                            $window.localStorage['password']=$scope.user.password;
                            console.log($window.localStorage['id'] + " " + $window.localStorage['username']
                            + " " + $window.localStorage['email']+ " " + $window.localStorage['password']);
                        }
                    }
                })
                .error(function (err) {

                });

        };

        $scope.signup=function () {

            $http.get("http://192.168.0.107:3000/api/usuarios")
                .success(function (data) {
                    console.log(data);
                    $scope.users=data;
                    $window.localStorage['id']=$scope.users.length+1;
                    $scope.user.username='asdf';
                    $window.localStorage['username']=$scope.user.username;
                    $window.localStorage['email']=$scope.user.email;
                    $window.localStorage['password']=$scope.user.password;
                })
                .error(function (err) {

                });

        };

        $scope.reset=function () {

            $window.localStorage.clear();

        };

        $scope.logout = function(){
            $window.localStorage.clear();

        }
       /* $http.get("http://192.168.43.195:3000/api/usuarios/"+user.id)
            .success(function (data) {
                console.log(data);
                $scope.users=data;

            })
            .error(function (err) {

            })*/

    });