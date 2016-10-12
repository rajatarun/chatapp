var app = angular.module('app.http.service',[]);
app.service('httpUser', httpUser);

httpUser.$inject =['$http','$q'];
function httpUser($http, $q){
	function public(request){
		if(request.method === 'get'){
			var response = $q.defer();
			$http.get(request.url,request.params?request.params:'').then(getSuccess,getError);
			function getSuccess(res){
				response.resolve(res.data);
			};
			function getError(res){

			};
			return response.promise;
		};
		if(request.method === 'post'){
			var response = $q.defer();
			$http.post(request.url,request.params?request.params:'').then(postSuccess,postError);
			function postSuccess(res){
				response.resolve(res.data);
			};
			function postError(res){

			};
			return response.promise;
		};
	};
	 var services = {
	 	public:public
	 };
	 return services;
}