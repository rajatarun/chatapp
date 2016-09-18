angular.module('app',['ngMaterial','ngAnimate','ngRoute','ngMessages','app.chat.header', 'app.login', 'app.register'])
	.config(['$routeProvider','$locationProvider',
        function($routeProvider, $locationProvider) {
            $routeProvider
                .when('/login', {
                	path: "/login",
                    templateUrl:"templates/pages/login.html",
                    controller:'logController'
                })
                .when('/register', {
                	path: "/register",
                    templateUrl:"templates/pages/login.html",
                    controller:'regController'
                  })
               .when('/user/contacts',{
                   templateUrl:"templates/pages/contacts.html",
                     controller:'contactsController'
                  });
            }])
	 .controller('mainCntrl',['$routeParams',function($routeParams)
    {
      
        this.params = $routeParams;
    }])