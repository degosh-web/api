const router = require('express').Router();

router.get('/', isAuthorized, (req, res) => {
	//res.send(200);
});

module.exports = router;

/* this allows us to protect routes by makigng sure that
 * user is attached to the req
*/
function isAuthorized(req, res, next) {
	if (req.user) {
		console.log('User is logged in');
		console.log(req.user);
		res.send(
			req.user)
		next();
	} else {
		console.log("User is not logged in");
		res.redirect('/');
	}
}