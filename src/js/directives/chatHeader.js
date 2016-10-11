
	var module = angular.module('app.chat.header',[]);

	module.directive('chatHeader',chatHeader);
	module.controller('chatHeaderController',chatHeaderController);

	function chatHeader(){
		return{
			templateUrl : 'templates/directives/chatHeader.html',
			controller : 'chatHeaderController'
		}
	};

	chatHeaderController.$inject =['$rootScope','$scope', '$location','httpUser'];
	function chatHeaderController($rootScope,$scope, $location, httpUser){
		$scope.$on('userLogin',function(event,user){
			debugger;
			$scope.userName = user.displayName;
			$scope.icon = user.photos;
		});
		$scope.logout = function(){
		var request = {
				method:'get',
				url:'/auth/logout'};
			
			var response = httpUser.public(request);
			
			response.then(function(data){
				$scope.userName = null;
				$scope.icon = null;
				$location.path('/login');
			});
		}
	};
