let products = [];

exports.getAddProduct = (req, res, next) => {
  res.render('add-product', {
    title: 'Add product hbs', 
    path: 'admin/add-product',
    productCSS: true,
    formsCSS: true,
    activeAddProduct: true
  });
}

exports.postAddProduct = (req, res, next) => {
  products.push({title: req.body.title})
  res.redirect('/');
}

exports.getProducts = (req, res, next) => {
  res.render('shop', {
    products: products,
    title: 'Shop', 
    path: '/', 
    hasProducts: products.length > 0,
    productCSS: true,
    activeShop: true
  });
}