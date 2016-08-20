var passport = require('passport');

module.exports = function(app){
	console.log('passport initialized');
	app.use(passport.initialize());
	app.use(passport.session());

	passport.serializeUser(function(user,done){
		done(err,user);
	});
	passport.deserializeUser(function(user,done){
		//mongodb connection to get user
		done(err,user);
	});
	require('./strategies/local.strategy')();
};
