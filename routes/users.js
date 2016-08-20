
/* GET users listing. */
var router = function(express){
var userRouter = express.Router();
userRouter.use(function(req,res,next){
	if(!req.user){
		res.redirerct('/');
	}
	next();
});
userRouter.get('/', function(req, res, next) {
	console.log(req.user);

  res.json(req.user);
});
return userRouter;
}

module.exports = router;
