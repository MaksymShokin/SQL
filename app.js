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

app.use((req, res, next) => {
  User.findByPk(1)
    .then(user => {
      req.user = user;
      next()
    })
    .catch(err => console.log(err))
});

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
    return User.findByPk(1)
    
  })
  .then(user => {
    if (!user) {
      return User.create({ name: 'Max', email: 'test@test.com' })
    }
    return user
  })
  .then(result => {
    app.listen(3000);
  })
  .catch(err => console.log(err))


// templating engines
// npm install ejs pug express-handlebars
// npm install --save mysql2
// npm install --save sequelize
