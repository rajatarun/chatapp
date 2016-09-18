var contacts = angular.module("app.user.contacts",['app.http.service']);

contacts.$inject = ['$scope','httpUser','$mdDialog','$window'] 
contacts.controller('contactsController',function($scope,httpUser,$mdDialog,$window){
	var request = {
				method:'get',
				url:'/users/authenticate'};
	var contactRequest = {
				method:'get',
				url:'/users/contacts'};
	var response = httpUser.public(request);
	var contacts = httpUser.public(contactRequest);
	this.openMenu = function($mdOpenMenu, ev) {
      originatorEv = ev;
      $mdOpenMenu(ev);
    };
	response.then(function(res){
		if(res.status === 'SUCCESS'){
			$scope.$emit('userLogin',res.user);
			contacts.then(function(response){
				$scope.contactsList = response;
			});
		}
		else{
			$window.location.href = '/';
		}
	});
});