var passport = require('passport'),
	FacebookStrategy = require('passport-facebook').Strategy;
module.exports = function(){

	passport.use(new FacebookStrategy({
		clientID:'1628812677449425',
		clientSecret:'5875ff8eaf14b689dc09ea6efbfba0ab',
		callbackURL:'http://localhost:3000/auth/facebook/callback',
		passReqToCallback: true},
		function(req,accessToken,refreshToken,profile,done){
			 done(null,profile);
	}));
}