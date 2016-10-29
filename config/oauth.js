var google = require('googleapis');
var https = require('https');
var OAuth2 = google.auth.OAuth2;
var SCOPES = ['https://www.googleapis.com/auth/contacts']
var key = '608708050096-d6dokb370jkaguc5vgcaigmp060grkrt.apps.googleusercontent.com';
var secret = 'G3mTns-ncojrZkh0hQOnbXIk';
var oauth = new OAuth2(key,secret,'http://localhost:3000/auth/contacts');
var Google = function(){
	return {
		authorize:authorize,
		getToken:getTokens
	}
	function authorize(){
		 return getNewToken(oauth);
	}
	function getNewToken(oauth2Client, callback) {
		var authUrl = oauth.generateAuthUrl({
		    access_type: 'offline',
		    scope: SCOPES
		  });
		return authUrl;
	}
	function getTokens(code,resObject){
		var token;
		oauth.getToken(code,function(err,token){
			tokens = token;	
			console.log(tokens);
			var contacts = '';
			https.get("https://www.google.com/m8/feeds/contacts/default/thin?alt=json&access_token="+tokens.access_token+ "&max-results=500&v=3.0",function(req,res){
				req.on('data',function(response){
					contacts += response;
				})
				req.on('end',function(){
					//console.log(JSON.parse(contacts));
					resObject.send(contacts);
				})
			});

			return tokens;
		})

	}
	}

module.exports = Google;