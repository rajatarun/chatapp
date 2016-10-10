
var Watrouter = function(watson){
	var alchemy_language = watson.alchemy_language({
		  api_key: '5eebfd52e3328db5a637a148cef169afb6ccb6ca'
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