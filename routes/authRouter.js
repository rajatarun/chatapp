var mongodb = require('mongodb').MongoClient;
/* GET users listing. */
var passport = require('passport');
var router = function(express){
	var authRouter = express.Router();
	authRouter.post('/signUp',function(req, res) {
			console.log(req.body);
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
	authRouter.get('/google/callback',passport.authenticate('google',{
		successRedirect: '/users/',
		failure: '/error/'
	}));
	authRouter.get('/google',passport.authenticate('google',{
			scope: ['https://www.googleapis.com/auth/userinfo.profile',
			'https://www.googleapis.com/auth/userinfo.email']
	}));
	authRouter.get('/facebook/callback',passport.authenticate('facebook',{
		successRedirect: '/users/',
		failureRedirect: '/error/'
	}));
	authRouter.get('/facebook',passport.authenticate('facebook',{
			scope: ['email']
	}));

	return authRouter;
}
module.exports = router;


