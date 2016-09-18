var app = angular.module("app.register",[])
app.controller('regController',regController);

regController.$inject =['$scope', '$location'];
	function regController($scope, $location){
		debugger;
		$scope.regFrame = true;
	};
