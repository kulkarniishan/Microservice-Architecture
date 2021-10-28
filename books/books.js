const express = require('express');
const app = express();
const mongoose = require('mongoose');

const port = process.env.PORT||5000;

mongoose.connect("mongodb+srv://ishanak1602:ishanak1602@bookservice.wuei5.mongodb.net/test",()=>{
    console.log("Our Bookservice database is connected!");
});

app.get('/', (req, res) => {
    res.send('This is our main endpoint');
});

app.listen(port, () => {
    console.log(`Server started on port ${port}`);
});