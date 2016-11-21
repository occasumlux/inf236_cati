/**
 * Created by daryl on 11/17/16.
 */
var myapp = angular.module("MiPrimerApp");

myapp.controller('UploadController', function ($scope) {
    $scope.showContent = function($fileContent){
        $scope.content = $fileContent;
    };
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
                    console.log(onLoadEvent.target.result.split('\n')[0]);
                    models.entrevistado.create({
                        nombre: 'Dios',
                        apellido: 'el único',
                        nro_fono: 'Está en tu corazón',
                        por_llamar: 'Siempre'
                    })
                };

                reader.readAsText((onChangeEvent.srcElement || onChangeEvent.target).files[0]);
            });
        }
    };
});