const express = require('express');

const shopContoroller = require('../controllers/shop')

const router = express.Router();

router.get('/', shopContoroller.getIndex);

router.get('/products', shopContoroller.getProducts);

router.get('/products/:productId', shopContoroller.getProductDetails)

router.get('/cart', shopContoroller.getCart);

router.post('/cart', shopContoroller.postCart);

router.post('/cart-delete-item', shopContoroller.postCartDeleteItem);

router.get('/orders', shopContoroller.getOrders);

router.post('/create-order', shopContoroller.postOrder);

module.exports = router