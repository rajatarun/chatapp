var mongodb = require('mongodb').MongoClient;
/* GET users listing. */

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
	authRouter.get('/profile',function(req,res){
			res.send('/auth/profile1');	
		});
	return authRouter;
}
module.exports = router;


