/* GET home page. */
var indexRouter = function(express){
var router = express.Router();
router.route('/').get(function(req, res, next) {
	console.log('hello');
  res.send('index');
});
router.get('/contacts',function(req,res){
	console.log(req);
});
return router;
}

module.exports = indexRouter;
