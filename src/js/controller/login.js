var app = angular.module("app.login",[]);
app.controller('logController',logController);

	logController.$inject =['$window','$scope', '$location'];
	function logController($window,$scope, $location){
		$scope.googleRedirect = function(){
			$window.location.href = '/auth/google';
		};
		$scope.facebookRedirect = function(){
			$window.location.href = '/auth/facebook'
		};
		$scope.loginFrame = true;
	};