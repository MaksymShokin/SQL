const path = require('path');

const express = require('express');
const bodyParser = require('body-parser');

const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');
const noPageFoundController = require('./controllers/404');

const sequelize = require('./helpers/database');
const Product = require('./models/product');
const User = require('./models/user');

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

Product.belongsTo(User, { constraints: true, onDelete: 'CASCADE' });
User.hasMany(Product)

sequelize
  // create new table
  // .sync({ force: true })
  .sync()
  .then(result => {
    app.listen(3000);
  })
  .catch(err => console.log(err))


// templating engines
// npm install ejs pug express-handlebars
// npm install --save mysql2
// npm install --save sequelize
