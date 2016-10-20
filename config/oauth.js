var OAuth = require('OAuth').OAuth2;
var google = require('googleapis');
var OAuth2 = google.auth.OAuth2;
var Google = function(){
	var key = '608708050096-d6dokb370jkaguc5vgcaigmp060grkrt.apps.googleusercontent.com';
	var secret = 'G3mTns-ncojrZkh0hQOnbXIk';
	var oauth = new OAuth2(key,secret,'http://localhost:3000/contacts');
	return {
		getContacts:getContacts = function(done){
		var uri = 'https://www.google.com/m8/feeds/contacts/default/full';
		oauth.get(uri,'AIzaSyCp9cWha5PWsxYNOIWcQ9WWNiq1LUBs4lY',function(err,results,res){
			results = results;
			console.log(results);
			done(results);
		})
	}
	}
}
module.exports = Google;