'use strict';

var express = require('express');
var bodyParser= require('body-parser');
var options, app;
var watson = require('watson-developer-cloud');
var alchemy_language = watson.alchemy_language({
  api_key: '5eebfd52e3328db5a637a148cef169afb6ccb6ca'
});
var parameters = {
		 text: 'I love apples! I do not like bananas.',
		  targets: 'apples|bananas'
		};

		alchemy_language.sentiment(parameters, function (err, response) {
		  if (err)
		    console.log('error:', err);
		  else
		    console.log(JSON.stringify(response, null, 2));
		});
var cookieParser = require('cookie-parser');
var session = require('express-session');
var index = require('./routes/index')(express);
var authRouter = require('./routes/authRouter')(express);
var users = require('./routes/users')(express);
app = module.exports = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true })); 
app.use(cookieParser());
app.use(express.static(__dirname+'/src'));
app.use(session({secret:'chatapp'}));
require('./config/passport')(app);
app.use('/index',index);
app.use('/auth',authRouter);
app.use('/users',users);
// app.on('start', function () {
//     console.log('Application ready to serve requests.');
//     console.log('Environment: %s', app.kraken.get('env:env'));
// });
// app.use(function(req, res, next) {
//   var err = new Error('Not Found');
//   err.status = 404;
//   next(err);
// });

// error handlers

// // development error handler
// // will print stacktrace
// if (app.get('env') === 'development') {
//   app.use(function(err, req, res, next) {
//     res.status(err.status || 500);
//     res.send({
//       message: err.message,
//       error: err
//     });
//   });
// }

// // production error handler
// // no stacktraces leaked to user
// app.use(function(err, req, res, next) {
//   res.status(err.status || 500);
//   res.send({
//     message: err.message,
//     error: {}
//   });
// });