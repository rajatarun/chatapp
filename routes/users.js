
/* GET users listing. */
var watRouter = require('watson-developer-cloud');
var router = function(express){
var userRouter = express.Router();

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
		alchemy_language.sentiment(parameters, function (err, response) {
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
userRouter.get('/', function(req, res, next) {
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
