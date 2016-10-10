var socket =io();
var app = angular.module('app.user.main.page',['app.http.service']);
app.controller('UserController',UserController);

UserController.$inject =['$rootScope','$window','$scope', '$location', 'httpUser','$mdSidenav', '$compile'];
function UserController($rootScope,$window,$scope, $location, httpUser,$mdSidenav, $compile){
		init();
		$scope.msg = null;
		var msg = '';
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
	    $scope.chat = null;
	    this.submit = function(socket){
	    	debugger;
	    	 socket =io();
	    	 socket.on('news', function (data) {
	    		    console.log(data);
	    	 });
	    	socket.emit('chat_message', $scope.chat);
	    		$scope.chat = '';
	    		
	    		debugger;
		    	socket.on('chat_message', function(msg){
		    		$scope.msg = msg;
		    		var html='<div id="msg">'+msg+'</div>',
		    	    el = document.getElementById('messages');
		    		angular.element(el).append( $compile(html)($scope))
		    	  });
		    	return false;
	    	};
	    	
	    
	};
