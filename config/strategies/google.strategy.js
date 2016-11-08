
var passport = require('passport'),
	GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
	
module.exports = function(){	

	passport.use(new GoogleStrategy({
		clientID: '608708050096-d6dokb370jkaguc5vgcaigmp060grkrt.apps.googleusercontent.com',
		clientSecret: 'G3mTns-ncojrZkh0hQOnbXIk',
		callbackURL: 'http://localhost:3000/auth/google/callback'},
		function(req, accessToken, refreshToken, profile, done){
			console.log(accessToken);
			console.log(refreshToken);
			profile.accessToken = accessToken;
            profile.refreshToken = refreshToken;
			done(null,profile);
		})
	);
}