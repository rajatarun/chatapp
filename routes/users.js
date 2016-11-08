

/* GET users listing. */
var watRouter = require('watson-developer-cloud');
var router = function(express,google){
var userRouter = express.Router();
var https = require('https');
userRouter.use(function(req,res,next){
	if(!req.user){
		res.redirect('/');
	}
	next();
});
userRouter.get('/contacts',function(req,res){
	if(req.user){
		var contacts = require('../public/contacts.json');
		res.send(contacts);
	}
	else{
		res.send({status:'FAILED'});	
	}
});
userRouter.get('/authenticate',function(req,res){
	if(req.user){
		
		res.send({status:'SUCCESS',user:req.user});
	}
	else{
		res.send({status:'FAILED'});	
	}
});
userRouter.post('/sentiment',function(req,res){
	var watRouter = require('watson-developer-cloud');
	var alchemy_language = watRouter.alchemy_language({
		  api_key: '5eebfd52e3328db5a637a148cef169afb6ccb6ca'
		});
	var alchemy = {};
	var parameters = {
			 text: req.body.text
			};
	if(req.user){
		alchemy_language.emotion(parameters, function (err, response) {
					  if (err)
						    console.log('error:', err);
						  else{
							  alchemy = JSON.stringify(response, null, 2);
							console.log(alchemy);
							res.send(alchemy);  
						  }
						});
	}
	
});
userRouter.post('/place',function(req,res){
	var watRouter = require('watson-developer-cloud');
	var alchemy_language = watRouter.alchemy_language({
		  api_key: '5eebfd52e3328db5a637a148cef169afb6ccb6ca'
		});
	var alchemy = {};
	var parameters = {
			 text: req.body.text
			};
	if(req.user){
		alchemy_language.concepts(parameters, function (err, response) {
			  if (err)
				    console.log('error:', err);
				  else{
					  alchemy = JSON.stringify(response, null, 2);
					console.log(alchemy);
					res.send(alchemy);  
				  	}
		});
	}
});
var authUrl;
userRouter.get('/authUrl',function(req,res){
	res.send(authUrl);
});
userRouter.get('/', function(req, res, next) {

	console.log(req);
    var contacts = '';
    https.get("https://www.google.com/m8/feeds/contacts/default/thin?alt=json&access_token="+req.user.refreshToken.access_token+ "&max-results=500&v=3.0",function(req,res){
        req.on('data',function(response){
            contacts += response;
        })
        req.on('end',function(){
            console.log(JSON.parse(JSON.stringify(contacts)));

        })
    });
	res.redirect('/#users/'+req.user.name.givenName);
});
// userRouter.get('/:username',function(req,res){
// 	res.send(req.user);
// });
userRouter.get('/profile',function(req,res){
	
	res.send(req.user);
});
return userRouter;
}

module.exports = router;
