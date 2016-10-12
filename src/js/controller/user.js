var socket =io();
var app = angular.module('app.user.main.page',['app.http.service']);
app.controller('UserController',UserController);

UserController.$inject =['$rootScope','$window','$scope', '$location', 'httpUser','$mdSidenav', '$compile','$filter','$q'];
function UserController($rootScope,$window,$scope, $location, httpUser,$mdSidenav, $compile, $filter,$q){
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
		
		var originatorEv;

	    this.openMenu = function($mdOpenMenu, ev) {
	      originatorEv = ev;
	      $mdOpenMenu(ev);
	    }	
	    $scope.chat = null;
	    this.typing =function(socket){
	    	socket = io();
	    	if($scope.user.name.givenName === 'tarun'){
	    	 	$scope.activeFrnd = 'sanjana';
	    	}
	    	else{
	    	 	$scope.activeFrnd = 'tarun';	
	    	}
	    	socket.emit('chat_typing', {typing:true,from:$scope.user.name,to:$scope.activeFrnd});
	    	if($scope.user.name.givenName === 'tarun'){
	    	 	$scope.activeFrnd = 'sanjana';
	    	 }
	    	 else{
	    	 	$scope.activeFrnd = 'tarun';	
	    	 }
	    	socket.on('typing_'+$scope.user.name.givenName.toLowerCase(), function(msg){	
	    		if(msg.typing){
	    			$scope.isTyping = true;
	    		}
		    });
	    };
	    this.submit = function(socket){
	    	
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
	    	var request1 = {
				method:'post',
				url:'/users/sentiment',
				params:{text:$scope.chat}};
			var Sentiresponse = httpUser.public(request1);
			var sentiment = '';
			var sentimentResponse;
			var chatMessage = $scope.chat;
	    	Sentiresponse.then(function(response){
	    		sentiment = response.docEmotions;
	    		var smiley ='';
	    		var mSmiley = '';
	    		var	maxSmiley = sentiment.anger;
	    		function max(sentiment){
	    		if(maxSmiley == sentiment.anger){
	    			mSmiley = 'anger';
	    		}
	    		if(maxSmiley < sentiment.joy){
	    			maxSmiley = sentiment.joy;
	    			mSmiley = 'joy';
	    		}
	    		else if(maxSmiley < sentiment.sadness){
	    			maxSmiley = sentiment.sadness;
	    			mSmiley = 'sadness';
	    		}
	    		else if(maxSmiley < sentiment.fear){
	    			maxSmiley = sentiment.fear;
	    			mSmiley = 'fear';
	    		}
	    		else if(maxSmiley < sentiment.disgust){
	    			maxSmiley = sentiment.disgust;
	    			mSmiley = 'disgust';
	    		}
	    		return mSmiley;
	    		}
	    		max(sentiment);
	    		switch(mSmiley){
	    		case 'anger':
	    			smiley =':rage:';
	    			break;
	    		case 'joy':
	    			smiley =':blush:';
	    			break;
	    		case 'sadness':
	    			smiley =':disappointed:';
	    			break;
	    		case 'fear':
	    			smiley =':cold_sweat:';
	    			break;
	    		case 'disgust':
	    			smiley =':expressionless:';
	    			break;
	    		
	    		}
	    		socket.emit('chat_message', {msg:chatMessage+smiley,from:$scope.user.name,to:$scope.activeFrnd});
	    		$scope.icon = $scope.user.photos;
	    		var html='<li id="msgleft" class="md-display-1"  ><img  ng-repeat="ico in icon" src="{{ico.value}}" style="height: 30px;width: 30px; padding-right="5px;">'+$filter('imagify')(chatMessage+smiley)+'</li>',
		    	el = document.getElementById('messages');
		    	angular.element(el).append($compile(html)($scope));
		    	});
			
	    		$scope.chat = '';
		    	socket.on('msg_'+$scope.user.name.givenName.toLowerCase(), function(msg){	
		    		$scope.msg = msg.msg?msg.msg:'';
		    		var incomingMessage = new Promise(function(resolve,reject){
	    				if(msg){
	    					resolve();
	    				}
	    				else{
	    					reject();
	    				}
	    			});
		    		incomingMessage.then(function(){
		    			var html='<li id="msgright" class="md-display-1"  >'+$filter('imagify')(msg.msg)+'<img  ng-repeat="ico in icon" src="{{ico.value}}" style="height: 30px;width: 30px; padding-right="5px;"></li>',
		    	    	el = document.getElementById('messages');
		    			angular.element(el).append( $compile(html)($scope));
		    			
		    		});
		    	  });
	    	
		    	return false;
	    	};
	    	
	    
	};
