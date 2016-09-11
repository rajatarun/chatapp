/* GET home page. */
var indexRouter = function(express){
var router = express.Router();
router.route('/').get(function(req, res, next) {
	console.log('hello');
  res.send('index');
});
return router;
}

module.exports = indexRouter;
