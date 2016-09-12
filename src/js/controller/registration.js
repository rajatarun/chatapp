var app = angular.module("app.register",[])
app.controller('regController',regController);

regController.$inject =['$window','$scope', '$location'];
	function regController($window,$scope, $location){
		$scope.regFrame = true;
		$scope.googleRedirect = function(){
			$window.location.href = '/auth/google';
		};
		$scope.facebookRedirect = function(){
			$window.location.href = '/auth/facebook'
		};
	};
