'use strict'
var express = require('express');
var router = express.Router();
var ProductController = require('../controllers/product');

var multipart= require('connect-multiparty');
var multipartMiddleware = multipart({uploadDir: './uploads'});


router.get('/product/:id',ProductController.getProduct);
router.get('/products/',ProductController.getProducts);
router.post('/save-product',ProductController.saveProduct);
router.put('/product/:id',ProductController.updateProduct);
router.delete('/product/:id',ProductController.deleteProduct);
router.post('/upload-image/:id',multipartMiddleware,ProductController.uploadImage);
router.get('/get-image/:image',ProductController.getImageFile);

module.exports = router;
