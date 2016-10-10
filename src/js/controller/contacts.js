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
    $scope.showPrompt = function(event){
    	 // Appending dialog to document.body to cover sidenav in docs app
	    var confirm = $mdDialog.prompt()
	      .title('Add Contact')
	      .placeholder('phone Number')
	      .ariaLabel('Number')
	      .targetEvent(event)
	      .ok('ADD')
	      .cancel('CANCEL');

	    $mdDialog.show(confirm).then(function(result) {
	      $scope.status = 'You decided to name your dog ' + result + '.';
	    }, function() {
	      $scope.status = 'You didn\'t name your dog.';
	    });
    };
	response.then(function(res){
		if(res.status === 'SUCCESS'){
			$scope.$emit('userLogin',res.user);
			$scope.userHomePage = '/#/users/'+res.user.firstName
			contacts.then(function(response){
				$scope.contactsList = response;
			});
		}
		else{
			$window.location.href = '/';
		}
	});
});