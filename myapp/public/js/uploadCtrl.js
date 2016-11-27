var myapp = angular.module("myApp",[]);

myapp.controller('uploadCtrl', function ($scope, $http) {
    $scope.showContent = function($fileContent){
        $scope.content = $fileContent;
    };

    $scope.upload = function (message) {
        //console.log($scope.content);
        var text = $scope.content.split('\n'), x, line;
        for(x in text) {
            line = text[x].split(',');//[name, lastName, number, status]
            if (line.length != 4 || x == 0)//First line don't have information
                continue;
            $http.post('/api/entrevistado',
                {nombre: capitalizeFirstLetter(line[0]) + " " + capitalizeFirstLetter(line[1]),
                    number: parseInt(line[2]),
                    edad: 0,
                    direccion: "Desconocida",
                    estado: capitalizeFirstLetter(line[3])})
                .success(function(data) {
                    console.log(data);
                })
                .error(function(data) {
                    console.log('Error:' + data);
                });//Send information to DB
        }
        $scope.content = null;
        alert(message);
    }
});

myapp.directive('onReadFile', function ($parse) {
    return {
        restrict: 'A',
        scope: false,
        link: function(scope, element, attrs) {
            var fn = $parse(attrs.onReadFile);

            element.on('change', function(onChangeEvent) {
                var reader = new FileReader();

                reader.onload = function(onLoadEvent) {
                    scope.$apply(function() {
                        fn(scope, {$fileContent:onLoadEvent.target.result});
                    });
                };
                reader.readAsText((onChangeEvent.srcElement || onChangeEvent.target).files[0]);
            });
        }
    };
});

myapp.directive( "mwConfirmClick", [
    function( ) {
        return {
            priority: -1,
            restrict: 'A',
            scope: { confirmFunction: "&mwConfirmClick" },
            link: function( scope, element, attrs ){
                element.bind( 'click', function( e ){
                    // message defaults to "Are you sure?"
                    var message = attrs.mwConfirmClickMessage ? attrs.mwConfirmClickMessage : "Are you sure?";
                    // confirm() requires jQuery
                    if( confirm( message ) ) {
                        scope.confirmFunction();
                    }
                });
            }
        }
    }
]);

function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}