angular.module("myApp",[])
    .controller("audioCtrl",function ($scope,$http,$window) {

        if($window.localStorage['id'] == 0){
            $window.location.href="/login";
        }

        $scope.user = {username: $window.localStorage['username']};

        $scope.title = "Lista de Audios";

        $http.get("127.0.0.1/verListaArchivos")
            .success(function (data) {
                $scope.audios = data;
                console.log(data);
            }).error(function (data) {
            console.log('Error: ' + data);
        });

        var downloadPath = "/audios/";

        $scope.descargarAudio = function (audio) {
            console.log(audio);
            window.open(downloadPath+audio, '_blank', '');
        }

    });
