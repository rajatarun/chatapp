angular.module('app',['ngMaterial','ngAnimate','ngSanitize','ngRoute','ngMessages','vkEmojiPicker','mgcrea.ngStrap','app.chat.header', 'app.login', 'app.register', 'app.user.main.page','app.user.contacts','app.newRegister'])
    .config(['$routeProvider','$locationProvider',
        function($routeProvider, $locationProvider) {
            $locationProvider.hashPrefix('');
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
                .when('/user/contacts',{
                    templateUrl:"templates/pages/contacts.html",
                    controller:'contactsController'
                })
                .when('/contacts',{
                    templateUrl:"templates/pages/contactsAuth.html"
                })
                .when('/newRegister',{
                    templateUrl:"templates/newRegister.html",
                    controller:"newRegisterController"
                })
                
            }])
     .controller('mainCntrl',['$routeParams',function($routeParams)
    {
        this.params = $routeParams;
    }]);
