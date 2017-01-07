/**
 * Created by Tarun Raja on 12/30/2016.
 */
var app = angular.module("app.newRegister",[]);
app.controller('newRegisterController',newRegisterController);

newRegisterController.$inject =['$window','$scope', '$location','httpUser'];
function newRegisterController($window,$scope, $location,httpUser){
    $scope.formData = {};
    $scope.signUp = function () {
        $scope.res = httpUser.public({
            method:'post',
            url:'/auth/newRegister',
            params:{
                name:$scope.formData.username,
                password:$scope.formData.password
            }
        });
    }
};