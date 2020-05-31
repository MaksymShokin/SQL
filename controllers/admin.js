const Product = require('../models/product');

exports.getAddProduct = (req, res, next) => {
  res.render('admin/edit-product', {
    title: 'Add product',
    path: 'admin/add-product',
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

  Product.getById(productId, (product) => {
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
};

exports.postEditProduct = (req, res, next) => {
  const prodId = req.body.productId;
  const updatedTitle = req.body.title;
  const updatedImageUrl = req.body.imageUrl;
  const updatedPrice = req.body.price;
  const updatedDescription = req.body.description;
  const updatedProduct = new Product(prodId, updatedTitle, updatedImageUrl, updatedPrice, updatedDescription);

  updatedProduct.save();

  res.redirect('/admin/products')
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
      path: 'admin/products',
      productCSS: true,
      formsCSS: true,
      activeAddProduct: true
    });
  })
  .catch(err => console.log(err))
};
