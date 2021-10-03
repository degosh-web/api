const express = require("express");
const app = express();
const path = require('path');
const port = 3000;

app.set('views', path.resolve('./views'));
app.set('view engine', 'ejs');
app.set('trust proxy', true);

const extension = require('./routes/productsAuth/extension');
const shelter = require("./routes/productsAuth/shelter");

app.use(express.static('./public'));
app.use('/', extension);
app.use('/', shelter);

app.listen(port, () => {
    console.log(`Dashboard listening at http://localhost:${port}`);
});