const express = require('express');
const router = express.Router();
const catchAsync = require('../utils/catchAsync');
const ExpressError = require('../utils/ExpressError');
const Product = require('../models/product');
const Order = require('../models/order');
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

    const order = new Order({
        title: req.body.name,
        email: req.body.email,
        Phone: req.body.phone,
        eventDate: req.body.eventDate,
        pickupDate: req.body.pickupDate,
        flavour: req.body.flavour,
        quantity: req.body.quantity,
        message: req.body.message
    });

    await order.save();

    req.flash('success', 'Order successful!!');

    res.redirect('/products/order');

}));

router.get('/:id', catchAsync(async (req, res) => {
    const product = await Product.findById(req.params.id)
    res.render('products/show', { product });
}));

module.exports = router;