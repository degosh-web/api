const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
	discordId: { type: String, required: true },
	username: { type: String, required: true },
	email: { type: String, required: true },
	avatar: { type: String, required: true },
	discriminator: { type: String, required: true }
});

//conpile UserSchema to a User model
const dashboardUser = module.exports = mongoose.model('User', UserSchema);