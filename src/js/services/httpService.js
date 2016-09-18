var app = angular.module('app.http.service',[]);
app.service('httpUser', httpUser);

httpUser.$inject =['$http','$q'];
function httpUser($http, $q){
	function public(request){
		if(request.method === 'get'){
			var response = $q.defer();
			$http.get(request.url).then(getSuccess,getError);
			function getSuccess(res){
				response.resolve(res.data);
			};
			function getError(res){

			};
			return response.promise;
		};
		if(request.method === 'post'){
			$http.post(request.url,request.params?request.params:'').then(postSuccess,postError);
			function postSuccess(res){

			};
			function postError(res){

			};
		};
	};
	 var services = {
	 	public:public
	 };
	 return services;
}