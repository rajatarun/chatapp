angular.module('app',['ngMaterial','ngAnimate','ngRoute','ngMessages','app.chat.header', 'app.login', 'app.register', 'app.user.main.page'])
	.config(['$routeProvider','$locationProvider',
        function($routeProvider, $locationProvider) {
            $routeProvider
                .when('/login', {
                	path: "/login",
                    templateUrl:"templates/login.html",
                    controller:'logController'
                })
                .when('/users/:name', {
                    templateUrl:"templates/userPage.html",
                    controller:'UserController'
                })
                .when('/register', {
                    templateUrl:"templates/login.html",
                    controller:'regController'
                });
                $locationProvider.html5Mode(true);
            }])
	 .controller('mainCntrl',['$routeParams',function($routeParams)
    {
      
        this.params = $routeParams;
    }])