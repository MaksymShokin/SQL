const Product = require('../models/product');

exports.getProducts = (req, res, next) => {
  Product.fetchAll(products => {
    res.render('shop/product-list', {
      products: products,
      title: 'Shop', 
      path: '/products', 
      hasProducts: products.length > 0,
      productCSS: true,
      activeShop: true
    });
  });  
}

exports.getCart = (req, res, next) => {
  res.render('shop/cart', {
    title: 'Cart',
    path: '/cart'
  });
};

exports.getCheckout = (req, res, next) => {
  res.render('shop/checkout', {
    title: 'Checkout',
    path: '/checkout'
  });
};

exports.getProductDetails = (req, res, next) => {
  res.render('shop/product-detail', {
    title: 'Product detail',
    path: '/product-detail'
  });
};

exports.getIndex = (req, res, next) => {
  res.render('shop/index', {
    title: 'Main page',
    path: '/'
  });
};