const path = require('path');

const express = require('express');
const bodyParser = require('body-parser');

const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');
const noPageFoundController = require('./controllers/404');

const db = require('./helpers/database');

const app = express();


// template engine
app.set('view engine', 'ejs');

// views folder
app.set('views', 'views');

app.use(bodyParser.urlencoded({extended: false}));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/admin', adminRoutes);
app.use(shopRoutes);

app.use(noPageFoundController.get404);

app.listen(3000);

// templating engines
// npm install ejs pug express-handlebars
// npm install --save mysql2
