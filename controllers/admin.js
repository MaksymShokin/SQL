const Product = require('../models/product');

exports.getAddProduct = (req, res, next) => {
  res.render('admin/edit-product', {
    title: 'Add product',
    path: '/admin/add-product',
    editing: false
  });
};

exports.postAddProduct = (req, res, next) => {
  const title = req.body.title;
  const imageUrl = req.body.imageUrl;
  const price = req.body.price;
  const description = req.body.description;
  Product.create({
    title: title,
    imageUrl: imageUrl,
    price: price,
    description: description
  })
  .then(result => console.log(result))
  .catch(err => console.log(err))
};

exports.getEditProduct = (req, res, next) => {
  const isEditMode = req.query.edit;
  const productId = req.params.productId;

  Product.findByPk(productId)
    .then(product => {
      if (!product) {
        return res.redirect('/');
      }

      res.render('admin/edit-product', {
        title: 'Edit product',
        path: 'admin/edit-product',
        editing: isEditMode,
        product: product
      });
    })
    .catch(err => console.log(err))
};

exports.postEditProduct = (req, res, next) => {
  const prodId = req.body.productId;
  const updatedTitle = req.body.title;
  const updatedImageUrl = req.body.imageUrl;
  const updatedPrice = req.body.price;
  const updatedDescription = req.body.description;
  
  Product.findByPk(prodId)
    .then(product => {
      product.title = updatedTitle;
      product.imageUrl = updatedImageUrl;
      product.price = updatedPrice;
      product.description = updatedDescription;
      return product.save()
    })
    .then(() => console.log('Updated product'))
    .finally(() => res.redirect('/admin/products'))
    .catch(err => console.log(err))    
}

exports.postDeleteProduct = (req, res, next) => {
  const prodId = req.body.productId;

  Product.delete(prodId);
  res.redirect('/admin/products')
}

exports.getProducts = (req, res, next) => {
  Product.findAll()
  .then(products => {
    res.render('admin/products', {
      title: 'Products',
      products: products,
      path: '/admin/products',
      productCSS: true,
      formsCSS: true,
      activeAddProduct: true
    });
  })
  .catch(err => console.log(err))
};
