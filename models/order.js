const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const orderSchema = new Schema({

    title: String,

    email: String,

    Phone: String,

    eventDate: String,

    pickupDate: String,

    flavour: String,

    quantity: Number,

    message: String

});

module.exports = mongoose.model('Order', orderSchema);