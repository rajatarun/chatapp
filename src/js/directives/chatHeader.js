
	var module = angular.module('app.chat.header',[]);

	module.directive('chatHeader',chatHeader);
	module.controller('chatHeaderController',chatHeaderController);

	function chatHeader(){
		return{
			templateUrl : 'templates/directives/chatHeader.html',
			controller : 'chatHeaderController'
		}
	};

	chatHeaderController.$inject =['$rootScope','$scope', '$location'];
	function chatHeaderController($rootScope,$scope, $location){
		$scope.$on('userLogin',function(event,user){
			debugger;
			$scope.userName = user.displayName;
		});
	};
