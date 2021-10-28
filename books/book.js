const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({
    title: {
        type: String,
        require: true
        },
    author: {
        type: String,
        require: true,
    },
    numberOfPages: {
        type: Number,
        require: false
        },
    publisher: {
        type: String,
        require: false
        }
});
const book = new mongoose.model("Book",bookSchema);

module.exports = book;