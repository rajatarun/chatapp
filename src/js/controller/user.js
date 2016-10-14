var socket =io();
var app = angular.module('app.user.main.page',['app.http.service']);
app.controller('UserController',UserController);

UserController.$inject =['$rootScope','$window','$scope', '$location', 'httpUser','$mdSidenav', '$compile','$filter','$q'];
function UserController($rootScope,$window,$scope, $location, httpUser,$mdSidenav, $compile, $filter,$q){
		init();
		$scope.var =":smile:";
		
		$scope.msg = null;
		$scope.showChat = false;
		$scope.activeFrnd = '';
		var msg = '';
		function init(){
			var request = {
				method:'get',
				url:'/users/profile'};
			
			var response = httpUser.public(request);
			
			response.then(function(data){
				$scope.user = data;
				$scope.$emit('userLogin',$scope.user);	
				  if($scope.user.name.givenName === 'tarun'){
	    	 	$scope.activeFrnd = 'sanjana';
			    	}
			    else{
			    	 	$scope.activeFrnd = 'tarun';	
			    }
			});
			
			
		}
		this.showChat = function(contact){
			$scope.showChat = true;
			$scope.activeFrnd = contact.Name;
		}
		var originatorEv;

	    this.openMenu = function($mdOpenMenu, ev) {
	      originatorEv = ev;
	      $mdOpenMenu(ev);
	    }	
	    $scope.chat = null;
	  
	    this.typing =function(socket){
	    	socket = io();
	    	
	    	socket.emit('chat_typing', {typing:true,from:$scope.user.name,to:$scope.activeFrnd});
	    	
	    	socket.on('typing_'+$scope.user.name.givenName.toLowerCase(), function(msg){	
	    		if(msg.typing){
	    			$scope.isTyping = true;
	    		}
		    });
	    };
	    this.submit = function(socket){
	    	
	    	 socket =io();
	    	 
	    	 var date = new Date();
	    	var request1 = {
				method:'post',
				url:'/users/sentiment',
				params:{text:$scope.chat}};
			var Sentiresponse = httpUser.public(request1);
			var request2 = {
					method:'post',
					url:'/users/place',
					params:{text:$scope.chat}};
			var Placeresponse = httpUser.public(request2);
			var sentiment = '';
			var places = null;
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
	    		
	    		socket.emit('chat_message', {msg:chatMessage+smiley,from:$scope.user.name,to:$scope.activeFrnd,time:date.toLocaleTimeString()});
	    		$scope.icon = $scope.user.photos;
	    		var html='<li id="msgleft" class="messages md-whiteframe-4dp layout-margin" ><md-whiteframe ><b>'+$filter('imagify')(chatMessage+'</b><span class="centersmiley">'+smiley+'</md-whiteframe></span>'+'<sup>'+date.toLocaleTimeString()+'</sup>')+'</li>',
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
		    			var html='<li id="msgright" class="messages md-whiteframe-4dp layout-margin" ><md-whiteframe >'+$filter('imagify')(msg.msg)+'</md-whiteframe><sup>'+date.toLocaleTimeString()+'</sup>'+'</li>',
		    	    	el = document.getElementById('messages');
		    			angular.element(el).append( $compile(html)($scope));
		    			
		    		});
		    	  });
	    	
		    	return false;
	    	};
	    	
	    
	};
