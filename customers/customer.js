const mongoose = require('mongoose');

const customerSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    age: {
        type: Number,
        require: true
    },
    address: {
        type: String,
        required: true
    }
})

const customer = new mongoose.model('customer', customerSchema);

module.exports = customer;