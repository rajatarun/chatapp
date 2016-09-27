angular.module('app',['ngMaterial','ngAnimate','ngRoute','ngMessages','app.chat.header', 'app.login', 'app.register', 'app.user.main.page','app.user.contacts','app.user.page'])
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
                })
                .when('/user/contacts',{
                    templateUrl:"templates/pages/contacts.html",
                    controller:'contactsController'
                });
                
            }])
     .controller('mainCntrl',['$routeParams',function($routeParams)
    {
      
        this.params = $routeParams;
    }]);
