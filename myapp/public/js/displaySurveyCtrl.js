/**
 * Created by daryl on 11/27/16.
 */
var myapp = angular.module("myApp",[]);

myapp.controller('displaySurveyCtrl', function($scope, $http, $sce) {
    var id = document.getElementById('id').innerHTML;
    console.log('banana' + id);
    $http.get('/api/survey/' + id)
        .success(function (data) {
            $scope.surveyURL =  $sce.trustAsResourceUrl(data.url);
        })
        .error(function (data) {
            console.log('Error: ' + data);
        });
});