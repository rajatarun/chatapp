var passport = require('passport'),
	localStrategy = require('passport-local').Strategy,
	mongodb = require('mongodb').MongoClient;
module.exports = function () {
	passport.use(new localStrategy({
		usernameField: 'userName',
		passwordField: 'password'
	},function(username,password,done){
		var url = require('../config/mongodb').url;
		mongodb.connect(url,function(err,db){
			var collection = db.collection('users');
			collection.findOne({
				name:username
			},function(err,results){
				console.log(results);
				if(results.password === password){
				var user = results;
				done(null,user);}
				else{
					done(null,false,{message:'Badpassword'});
				}
			});
		});
	}));
};