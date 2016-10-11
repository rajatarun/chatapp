var socket =io();
var app = angular.module('app.user.main.page',['app.http.service']);
app.controller('UserController',UserController);

UserController.$inject =['$rootScope','$window','$scope', '$location', 'httpUser','$mdSidenav', '$compile','$filter'];
function UserController($rootScope,$window,$scope, $location, httpUser,$mdSidenav, $compile, $filter){
		init();
		$scope.var =":smile:";
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
		var request1 = {
				method:'get',
				url:'/users/sentiment'};
		var Sentiresponse = httpUser.public(request1);
		var originatorEv;

	    this.openMenu = function($mdOpenMenu, ev) {
	      originatorEv = ev;
	      $mdOpenMenu(ev);
	    }	
	    $scope.chat = null;
	    this.submit = function(socket){
	    	debugger;
	    	Sentiresponse.then(function(response){
				debugger;
			});
	    	 socket =io();
	    	 if($scope.user.name.givenName === 'tarun'){
	    	 	$scope.activeFrnd = 'sanjana';
	    	 }
	    	 else{
	    	 	$scope.activeFrnd = 'tarun';	
	    	 }
	    	 socket.on('news', function (data) {
	    		    console.log(data);
	    	 });
	    	socket.emit('chat_message', {msg:$scope.chat,from:$scope.user.name,to:$scope.activeFrnd});
	    		var chatMessage = $scope.chat;
	    		$scope.chat = '';
	    		$scope.icon = $scope.user.photos;
	    		var html='<li id="msgleft" class="md-display-1"  ><img  ng-repeat="ico in icon" src="{{ico.value}}" style="height: 30px;width: 30px; padding-right="5px;">'+$filter('imagify')(chatMessage)+'</li>',
		    	el = document.getElementById('messages');
		    	angular.element(el).append($compile(html)($scope));
		    	socket.on('msg_'+$scope.user.name.givenName.toLowerCase(), function(msg){	
		    		$scope.msg = msg;
		    		var incomingMessage = new Promise(function(resolve,reject){
	    				if(msg){
	    					resolve();
	    				}
	    				else{
	    					reject();
	    				}
	    			});
		    		incomingMessage.then(function(){
		    			var html='<li id="msgright" class="md-display-1"  >'+$filter('imagify')(msg)+'<img  ng-repeat="ico in icon" src="{{ico.value}}" style="height: 30px;width: 30px; padding-right="5px;"></li>',
		    	    	el = document.getElementById('messages');
		    			angular.element(el).append( $compile(html)($scope));
		    			
		    		});
		    	  });
		    	return false;
	    	};
	    	
	    
	};
