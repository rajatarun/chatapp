var app = angular.module("app.register",[])
app.controller('regController',regController);

regController.$inject =['$scope', '$location','httpUser'];
	function regController($scope, $location,httpUser){
		$scope.regFrame = true;
		$scope.signUp = function () {
            $scope.res = httpUser.public({
                method:'POST',
				url:'/signUp',
                name:$scope.name,
                password:$scope.password
            });
        }

	};
