const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const orderSchema = new Schema({
    title: String,
    email: String,
    Phone: String,
    date: String,
    flavour: String,
    quantity: Number,
    message: String,
    orders: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Order'
        }
    ]
})

module.exports = mongoose.model('Order', orderSchema);