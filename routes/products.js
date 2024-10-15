const express = require('express');
const router = express.Router();
const catchAsync = require('../utils/catchAsync');
const ExpressError = require('../utils/ExpressError');
const Product = require('../models/product');
const { descriptors } = require('../cakes/cakeHelpers');


router.get('/', catchAsync(async (req, res) => {
    const products = await Product.find({});
    // console.log('Products fetched:', products);  Debugging line
    res.render('products/index', { descriptors, products });
}));

router.get('/contact', (req, res) => {
    res.render('products/contact');
});

router.post('/contact', catchAsync(async (req, res, next) => {
    req.flash('success', 'Inquiry successful!!');
    res.redirect('/products/contact')
}));

router.get('/order', (req, res) => {
    res.render('products/order');
});

router.post('/order', catchAsync(async (req, res, next) => {
    req.flash('success', 'Order successful!!');
    res.redirect('/products/order')
}));

router.get('/:id', catchAsync(async (req, res) => {
    const product = await Product.findById(req.params.id)
    res.render('products/show', { product });
}));

module.exports = router;