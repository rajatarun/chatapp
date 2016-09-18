var contacts = angular.module("app.user.contacts",['app.http.service']);

contacts.$inject = ['$scope','httpUser','$mdDialog','$window'] 
contacts.controller('contactsController',function($scope,httpUser,$mdDialog,$window){
	var request = {
				method:'get',
				url:'/users/authenticate'};
	var response = httpUser.public(request);
	this.openMenu = function($mdOpenMenu, ev) {
      originatorEv = ev;
      $mdOpenMenu(ev);
    };
	response.then(function(res){
		if(res.status === 'SUCCESS'){
			$scope.$emit('userLogin',res.user);
		}
		else{
			$window.location.href = '/';
		}
	});
});