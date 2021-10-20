const router = require('express').Router();
const passport = require('passport');

router.get('/', passport.authenticate('discord'));
router.get('/redirect', passport.authenticate('discord', {
	failureRedirect: '/forbiden',
	successRedirect: '/dash'
}), (req, res) => {
	res.send(res.user);
});

module.exports = router;