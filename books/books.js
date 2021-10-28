require("dotenv").config();
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const book = require('./book');

app.use(express.json());
const port = process.env.PORT || 5000;

//connect
mongoose.connect(process.env.MONGO_URL, () => {
    console.log("Our Bookservice database is connected!");
});

app.get('/', (req, res) => {
    res.send('This is our main endpoint');
});

//create books
app.post('/book', (req, res) => {
    console.log(req.body);

    const newBook = new book(req.body);

    newBook.save()
        .then((response) => {
            res.status(200).json({
                message:"Record added",
                statsu:200
            })
        })
        .catch((err) => {
            console.log(err);
            res.status(500).json({
                response: "An error occured",
                status: 500
            })
        })
});

app.listen(port, () => {
    console.log(`Server started on port ${port}`);
});