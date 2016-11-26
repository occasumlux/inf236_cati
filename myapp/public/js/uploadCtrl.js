var myapp = angular.module("myApp",[]);

myapp.controller('uploadCtrl', function ($scope, $http) {
    $scope.showContent = function($fileContent){
        $scope.content = $fileContent;
    };

    $scope.upload = function (message) {
        alert(message);
        console.log($scope.content);
        var text = $scope.content.split('\n'), x, line;
        for(x in text) {
            line = text[x].split(',');//[name, lastName, number, status]
            if (line.length != 4 || x == 0)//First line don't have information
                continue;
            alert(line[0]);//Name
            //$http.post('/entrevistado', {});//Send information to DB
        }
        alert(text.length);//Debug, number of lines
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