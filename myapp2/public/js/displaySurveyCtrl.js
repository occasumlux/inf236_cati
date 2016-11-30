/**
 * Created by daryl on 11/27/16.
 */
var myapp = angular.module("myApp",[]);

myapp.controller('displaySurveyCtrl', function($scope, $http, $sce, $window) {

    if($window.localStorage['id'] == 0){
        $window.location.href="/login";
    }

    $scope.user = {username: $window.localStorage['username']};

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