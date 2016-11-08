var mongodb = require('mongodb').MongoClient;
/* GET users listing. */
var passport = require('passport');
var router = function(express,google){
	var authRouter = express.Router();
	authRouter.post('/signUp',function(req, res) {
			var url = require('../config/mongodb').url;
			console.log(url);
			mongodb.connect(url,function(err,db){
				console.log(db+err);
				var collection = db.collection('users');
				var user = {
					username: req.body.name,
					password: req.body.password
				};
				collection.insert(user,function(err,result){
					req.login(result,function(){
			  		res.redirect('/auth/profile');
			  		});
				});
			});
	  		
		});
	authRouter.post('/signIn',passport.authenticate('local',{ failureRedirect: '/'}),
			function(req,res){
					res.redirect('/auth/profile');
	});
	authRouter.get('/profile',function(req,res){
			res.json(req.user);	
		});
	var token = '';
	authRouter.get('/google/callback',passport.authenticate('google',{
		successRedirect: '/users',
		failure: '/error/'
	}),function (req,res) {
        var urlWithCode = req.originalUrl;
        var idx = urlWithCode.lastIndexOf('code=');
        var code = urlWithCode.substring(idx+5).replace('#','');
        token = google.getToken(code,res);
    });
	authRouter.get('/logout', function(req, res){
		  req.logout();
		  res.redirect('/');
		});
	authRouter.get('/google',passport.authenticate('google',{
			scope: ['https://www.googleapis.com/auth/userinfo.profile',
			'https://www.googleapis.com/auth/userinfo.email','https://www.google.com/m8/feeds','https://www.googleapis.com/auth/contacts']
	}));
	authRouter.get('/facebook/callback',passport.authenticate('facebook',{
		successRedirect: '/users',
		failureRedirect: '/error/'
	}));
	authRouter.get('/facebook',passport.authenticate('facebook',{
			scope: ['email']
	}));

	return authRouter;
}
module.exports = router;


