require('dotenv').config({ path: "../.env" });
const { CLIENT_ID, CLIENT_SECRET, CLIENT_REDIRECT } = process.env;
const DiscordStrategy = require('passport-discord').Strategy;
const passport = require('passport');
const dashboardUser = require('../../database/models/dashboardUser');

passport.serializeUser((user, done) => {
	console.log('Serializing user');
	//console.log(user);
	done(null, user.id);
});

passport.deserializeUser( async (id, done) => {
	console.log('Deserializing user');
	const user = await dashboardUser.findById(id);
	if (user) {
		done(null, user);
	}
});

passport.use(new DiscordStrategy({
	clientID: CLIENT_ID,
	clientSecret: CLIENT_SECRET,
	callbackURL: CLIENT_REDIRECT,
	scope: ['identify', 'guilds', 'email']
}, async (accessToken, refreshToken, profile, done) => {
	try {
		const user = await dashboardUser.findOne({ discordId: profile.id });
		if (user) {
			//console.log('User exists', user);
			done(null, user);// this serializes the user and attaches to 'req'
		} else {
			//console.log('User does not exist');
			const newUser = await dashboardUser.create({
				discordId: profile.id,
				username: profile.username,
				email: profile.email,
				avatar: profile.avatar,
				discriminator: profile.discriminator
			});
			const savedUser = await newUser.save();
			done(null, savedUser);// same here, but user gets created according to schema
		}
	} catch(err) {
		console.log(err);
		done(err, null);
	}
}));