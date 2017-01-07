var app = angular.module("app.login",[]);
app.controller('logController',logController);

	logController.$inject =['$window','$scope', '$location','httpUser'];
	function logController($window,$scope, $location,httpUser){
		$scope.googleRedirect = function(){
			$window.location.href = '/auth/google';
		};
		$scope.facebookRedirect = function(){
			$window.location.href = '/auth/facebook'
		};
		$scope.formData = {};
		$scope.loginFrame = true;
		$scope.regFrame = true;
        $scope.signUp = function () {
            $scope.res = httpUser.public({
                method:'post',
                url:'/auth/signUp',
				params:{
                	name:$scope.formData.username,
                	password:$scope.formData.password,
					email:$scope.formData.email
                }
            });
        }
	};