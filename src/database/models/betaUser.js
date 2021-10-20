const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
	discordId: { type: String, required: true },
	key: { type: String, required: true },
	IP: { type: String, required: true }
});

//conpile UserSchema to a User model
const betaUser = module.exports = mongoose.model('User', UserSchema, 'betakeys');