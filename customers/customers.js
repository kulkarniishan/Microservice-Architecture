require("dotenv").config();
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const customer = require('./customer');

app.use(express.json());
const port = process.env.PORT || 5500;

//connect
mongoose.connect(process.env.MONGO_URL, () => {
    console.log("Our customerservice database is connected!");
});

app.get('/', (req, res) => {
    res.send('This is our main endpoint');
});

//create customers
app.post('/customer', (req, res) => {
    console.log(req.body);

    const newCustomer = new customer(req.body);

    newCustomer.save()
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

app.get('/customers', (req, res) => {
    customer.find()
        .then((customers) => {
            res.status(200).json(customers)
        })
        .catch((error) => {
            res.status(500).json(error)
        })
});

app.get('/customer/:id', (req, res) => {
    const id = req.params.id;
    customer.findById(id)
        .then((customer) => {
            if (customer)
                res.status(200).json(customer);
            else
                res.status(404);
        })
        .catch((error) => {
            res.status(500).json(error)
        })
});

app.delete('/customer/:id', (req, res) => {
    customer.findOneAndRemove(req.params.id)
    .then((customer) => {
        res.status(200).json({
            message:"customer Deleted successfully!",
            status:200
        });
    })
    .catch((error) => {
        res.status(500).json(error)
    })
});


app.listen(port, () => {
    console.log(`Server started on port ${port}`);
});