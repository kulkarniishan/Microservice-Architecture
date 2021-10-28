require("dotenv").config();
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const order = require('./order');
const axios = require('axios');
app.use(express.json());
const port = process.env.PORT || 7777;

//connect
mongoose.connect(process.env.MONGO_URL, () => {
    console.log("Our orderservice database is connected!");
});

app.get('/', (req, res) => {
    res.send('This is our main endpoint');
});

//create orders
app.post('/order', (req, res) => {
    console.log(req.body);

    const newOrder = new order({
        customerID: mongoose.Types.ObjectId(req.body.customerID),
        bookID: mongoose.Types.ObjectId(req.body.bookID),
        initialDate: req.body.initialDate,
        deliveryDate: req.body.deliveryDate
    });

    newOrder.save()
        .then((response) => {
            res.status(200).json({
                message: "Record added",
                statsu: 200
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

app.get('/orders', (req, res) => {
    order.find()
        .then((orders) => {
            res.status(200).json(orders)
        })
        .catch((error) => {
            res.status(500).json(error)
        })
});

app.get('/order/:id', (req, res) => {
    const id = req.params.id;
    order.findById(id)
        .then((order) => {
            if (order) {
                axios.get("http://localhost:5500/customer/"+order.customerID)
                .then(response=>{
                    var orderObject = {
                        customerName: response.data.name,
                        bookTitle: ''
                    }

                    axios.get("http://localhost:5000/book/"+order.bookID)
                    .then(response => {
                        orderObject.bookTitle = response.data.title
                         res.json(orderObject);
                    })
                    .catch(error=>res.status(500))
                })
                .catch(error=>res.status(500))
            }
            else {
                res.status(404);
            }
        })
        .catch((error) => {
            res.status(500).json(error)
        })
});

app.delete('/order/:id', (req, res) => {
    order.findOneAndRemove(req.params.id)
        .then((order) => {
            res.status(200).json({
                message: "order Deleted successfully!",
                status: 200
            });
        })
        .catch((error) => {
            res.status(500).json(error)
        })
});


app.listen(port, () => {
    console.log(`Server started on port ${port}`);
});