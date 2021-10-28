const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
    customerID: {
        type: mongoose.SchemaTypes.ObjectId,
        required: true
    },
    bookID: {
        type: mongoose.SchemaTypes.ObjectId,
        required: true
    },
    initialDate: {
        type: Date,
        required: true
    },
    deliveryDate: {
        type: Date,
        required: true
    }

})

const order = new mongoose.model('order', orderSchema);

module.exports = order;