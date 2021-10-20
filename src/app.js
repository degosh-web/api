const express = require("express");
const session = require('express-session');
const passport = require('passport');
const DiscordStrategy = require('./routes/dashboard/discord');
const MongoStore = require('connect-mongo');
const db = require('./database/database');
const app = express();
const path = require('path');
const port = 3000;

app.set('views', path.resolve('./views'));
app.set('view engine', 'ejs');
app.set('trust proxy', true);

//Routes
const extension = require('./routes/productsAuth/extension');
const shelter = require("./routes/productsAuth/shelter");
const authRoute = require('./routes/dashboard/auth');
const dashMainRoute = require('./routes/dashboard/dash-main');

db.then(() => console.log('Connected to MongoDB.')).catch(err => console.log(err));

//Initializations
app.use(session({
	secret: 'random secret',
	cookie: {
		maxAge: 60000 * 60 * 24
	},
	saveUninitialized: false,
	resave: false,
	name: 'discord-oauth2',
	store: MongoStore.create({
		mongoUrl: 'mongodb://admin:2QomK_bX@degosh.com:27017'
	})
}));

app.use(passport.initialize());
app.use(passport.session());

//Middleware
app.use('/auth', authRoute);
app.use('/dash', dashMainRoute);

app.use(express.static('./public'));
app.use('/', extension);
app.use('/', shelter);

app.get('/', (req, res) => {
	res.send(toString(req));
});

app.listen(port, () => {
	console.log(`API gateway listening at http://localhost:${port}`);
});