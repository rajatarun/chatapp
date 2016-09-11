
	var module = angular.module('app.chat.header',[]);

	module.directive('chatHeader',chatHeader);
	module.controller('chatHeaderController',chatHeaderController);

	function chatHeader(){
		return{
			templateUrl : 'templates/directives/chatHeader.html',
			controller : 'chatHeaderController'
		}
	};

	chatHeaderController.$inject =['$scope', '$location'];
	function chatHeaderController($scope, $location){
		
	};
