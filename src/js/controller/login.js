
var app = angular.module("app.login",[])
app.controller('logController',logController);

	logController.$inject =['$scope', '$location'];
	function logController($scope, $location){
		debugger;
		$scope.googleRedirect = function(){
			$window.location.href = '/auth/google';
			}
		$scope.loginFrame = true;
	};
