/**
 * Created by daryl on 11/27/16.
 */
var myapp = angular.module("myApp",[]);

myapp.controller('surveyCtrl', function ($scope, $http) {
    $scope.formData = {};

    $http.get('/api/projects')
        .success(function(data) {
            $scope.projects = data;
            //console.log(data)
        })
        .error(function(data) {
            console.log('Error: ' + data);
        });

    $http.get('/api/surveys')
        .success(function (data) {
            $scope.surveys = data;
        })
        .error(function (data) {
            console.log('Error: ' + data);
        });

    $scope.createSurvey = function(){
        if ($scope.formData.project != null && $scope.formData.url != null) {
            $http.post('/api/survey', $scope.formData)
                .success(function (data) {
                    $scope.formData = {};
                    $scope.todos = data;
                    console.log(data);
                })
                .error(function (data) {
                    console.log('Error:' + data);
                });
        }
    };
});