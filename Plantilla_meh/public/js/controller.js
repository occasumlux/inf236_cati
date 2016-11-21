angular.module("MiPrimerApp",[])
    .controller("MiPrimerController",function ($scope,$http,$window) {
        $scope.title="Bienvenido ";
        $scope.users=[];
        $scope.user={};
        $scope.user.username= $window.localStorage['username'];
        //console.log($scope.user.username);
        /*$http.get("http://192.168.43.195:3000/api/usuarios/"+user.id)
            .success(function (data) {
                console.log(data);
                $scope.users=data;

        })
            .error(function (err) {
                
            })*/
        $scope.logout = function(){
            $window.localStorage.clear();

        }
        
    });