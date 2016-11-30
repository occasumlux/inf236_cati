angular.module("myApp",[])
    .controller("audioCtrl",function ($scope,$http,$window) {

        $scope.title = "Lista de Audios";

        $http.get("http://10.0.2.15:3000/verListaArchivos")
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
