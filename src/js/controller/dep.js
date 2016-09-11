angular.module('app',['ngMaterial','ngAnimate','ngRoute','ngMessages','app.chat.header', 'app.login'])
	.config(['$routeProvider','$locationProvider',
        function($routeProvider, $locationProvider) {
            $routeProvider
                .when('/login', {
                	path: "/login",
                    templateUrl:"templates/login.html",
                    controller:'logController'
                })
                .when('/register', {
                    templateUrl:"templates/Registration.html",
                    controller:'regController'
                });
                $locationProvider.html5Mode(true);
            }])
	 .controller('mainCntrl',['$routeParams',function($routeParams)
    {
      
        this.params = $routeParams;
    }])