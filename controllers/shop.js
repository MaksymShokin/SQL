const Product = require('../models/product');
const Cart = require('../models/cart');

exports.getProducts = (req, res, next) => {
  Product.findAll()
  .then(products => {
    res.render('shop/product-list', {
      products: products,
      title: 'Shop',
      path: '/products'
    });
  })
  .catch(err => console.log(err));
};

exports.getProductDetails = (req, res, next) => {
  const productId = req.params.productId;

  Product.getById(productId)
  .then(([product]) => {
    res.render('shop/product-detail', {
      title: product[0].title,
      path: '/products',
      product: product[0]
    });
  })
  .catch(err => console.log(err))
};

exports.getCart = (req, res, next) => {
  Cart.getCart(cart => {
    Product.fetchAll(products => {
      let cartProducts = [];
      for (product of products) {
        const cardProductData = cart.products.find(prod => prod.id === product.id)
        if (cardProductData) {
          cartProducts.push({productData: product, qty: cardProductData.qty});
        }
      }
      res.render('shop/cart', {
        title: 'Cart',
        path: '/cart',
        products: cartProducts
      });
    })
  })

};

exports.postCart = (req, res, next) => {
  const productId = req.body.productId;

  Product.getById(productId, (product) => {
    Cart.addProduct(productId, product.price);
  })
  console.log(productId)
  res.redirect('/cart')
};

exports.getOrders = (req, res, next) => {
  res.render('shop/orders', {
    title: 'Orders',
    path: '/orders'
  });
};

exports.postCartDeleteItem = (req, res, next) => {
  const productId = req.body.productId;

  Product.getById(productId, (product) => {
    Cart.deleteProduct(productId, product.price);
  })
  
  res.redirect('/cart')
}

exports.getCheckout = (req, res, next) => {
  res.render('shop/checkout', {
    title: 'Checkout',
    path: '/checkout'
  });
};

exports.getIndex = (req, res, next) => {
  Product.findAll()
  .then(product => {
    res.render('shop/index', {
      title: 'Main page',
      products: product,
      path: '/'
    });
  })
  .catch(err => console.log(err))
};
