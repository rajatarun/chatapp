
var Watrouter = function(watson){
	console.log('hello')
	var alchemy_language = watson.alchemy_language({
		  api_key: 'f331b5cb91b40646fa39b119311d6a5f8aee1032'
		});
		var parameters = {
				 text: 'I love apples! I do not like bananas.',
				  targets: 'apples|bananas'
				};

				alchemy_language.sentiment(parameters, function (err, response) {
				  if (err)
				    console.log('error:', err);
				  else
				    console.log(JSON.stringify(response, null, 2));
				});
}