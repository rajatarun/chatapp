var app = angular.module('app.user.main.page',['app.http.service']);
app.controller('UserController',UserController);

	UserController.$inject =['$rootScope','$window','$scope', '$location', 'httpUser','$mdSidenav'];
function UserController($rootScope,$window,$scope, $location, httpUser,$mdSidenav){
		init();

		function init(){
			var request = {
				method:'get',
				url:'/users/profile'};
			var response = httpUser.public(request);
			response.then(function(data){
				$scope.user = data;
				$scope.$emit('userLogin',$scope.user);	
			});
			
		}
		$scope.toggleLeft = buildToggler('left');
	    $scope.toggleRight = buildToggler('right');
	    $scope.sendMessage = function(){
	    	socket.emit('Admin',{
	    		personId:'a12d',
	    		message:$scope.message
	    	});
	    }
	    function buildToggler(componentId) {
	      return function() {
	        $mdSidenav(componentId).toggle();
	      }
	    }
	};
