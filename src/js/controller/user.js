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
				debugger;
				$scope.user = data;
				$scope.$emit('userLogin',$scope.user);	
			});
			
		}
		
		var originatorEv;

	    this.openMenu = function($mdOpenMenu, ev) {
	      originatorEv = ev;
	      $mdOpenMenu(ev);
	    }	
	};
