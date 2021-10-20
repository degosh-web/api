require('dotenv').config({ path: "../../.env" });
const { DB_LOGIN, DB_PASSWORD, DB_ADDRESS, DB_PORT } = process.env;
const databaseUrl = `mongodb://${DB_LOGIN}:${DB_PASSWORD}@${DB_ADDRESS}:${DB_PORT}/degosh`;
//const databaseUrl = `mongodb://${DB_LOGIN}:${DB_PASSWORD}@${DB_ADDRESS}/degosh`;

const mongoose = require('mongoose');

module.exports = mongoose.connect(databaseUrl,
    { useNewUrlParser: true }
);