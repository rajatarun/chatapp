var app = angular.module("app.user.page",[]);
app.controller('UserController',UserController);

	UserController.$inject =['$window','$scope', '$location', '$timeout', '$mdSidenav'];
	function UserController($window,$scope, $location, $timeout, $mdSidenav){
		$scope.toggleLeft = buildToggler('left');
	    $scope.toggleRight = buildToggler('right');

	    function buildToggler(componentId) {
	      return function() {
	        $mdSidenav(componentId).toggle();
	      }
	    }
	}