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

  // Product.findAll({where: {id: productId}}); returns an array
  Product.findByPk(productId)
  .then(product => {
    res.render('shop/product-detail', {
      title: product.title,
      path: '/products',
      product: product
    });
  })
  .catch(err => console.log(err))
};

exports.getCart = (req, res, next) => {
  req.user.getCart()
    .then(cart => {
      return cart.getProducts()
      .then(products => {
        res.render('shop/cart', {
          title: 'Cart',
          path: '/cart',
          products: products
        });
      }).catch(err => console.log(err))
    })
    .catch(err => console.log(err))
  // Cart.getCart(cart => {
  //   Product.fetchAll(products => {
  //     let cartProducts = [];
  //     for (product of products) {
  //       const cardProductData = cart.products.find(prod => prod.id === product.id)
  //       if (cardProductData) {
  //         cartProducts.push({productData: product, qty: cardProductData.qty});
  //       }
  //     }
  //     res.render('shop/cart', {
  //       title: 'Cart',
  //       path: '/cart',
  //       products: cartProducts
  //     });
  //   })
  // })

};

exports.postCart = (req, res, next) => {
  const prodId = req.body.productId;
  let fetchedCart;
  let newQuantity = 1;
  req.user
    .getCart()
    .then(cart => {
      fetchedCart = cart;
      return cart.getProducts({ where: { id: prodId } });
    })
    .then(products => {
      let product;
      if (products.length > 0) {
        product = products[0];
      }

      if (product) {
        const oldQuantity = product.cartItem.quantity;
        newQuantity = oldQuantity + 1;
        return product;
      }
      return Product.findByPk(prodId);
    })
    .then(product => {
      return fetchedCart.addProduct(product, {
        through: { quantity: newQuantity }
      });
    })
    .then(() => {
      res.redirect('/cart');
    })
    .catch(err => console.log(err));
};

exports.getOrders = (req, res, next) => {
  res.render('shop/orders', {
    title: 'Orders',
    path: '/orders'
  });
};

exports.postCartDeleteItem = (req, res, next) => {
  const prodId = req.body.productId;
  req.user
    .getCart()
    .then(cart => {
      return cart.getProducts({ where: { id: prodId } });
    })
    .then(products => {
      const product = products[0];
      return product.cartItem.destroy();
    })
    .then(result => {
      res.redirect('/cart');
    })
    .catch(err => console.log(err));
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
