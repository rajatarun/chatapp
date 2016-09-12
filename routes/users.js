
/* GET users listing. */
var router = function(express){
var userRouter = express.Router();
userRouter.use(function(req,res,next){
	if(!req.user){
		res.redirect('/');
	}
	next();
});
userRouter.get('/', function(req, res, next) {
	res.redirect('/#users/'+req.user.name.givenName);
});
// userRouter.get('/:username',function(req,res){
// 	res.send(req.user);
// });
userRouter.get('/profile',function(req,res){
	res.send(req.user);
});
return userRouter;
}

module.exports = router;
