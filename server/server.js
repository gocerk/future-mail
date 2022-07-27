const express = require("express");
const app = express();
const QueueRouter = require("./src/routers/Queue");
const DbRouter = require('./src/routers/Db');
const cors = require('cors');
const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/mail', { useNewUrlParser: true }, (err) => {
    if(err) throw err;
    console.log('Connected to MongoDB');
});

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cors());

app.use('/queue', QueueRouter)
app.use('/addDb', DbRouter); // to get mongodb document id for the client

app.get('/', (req, res) => {
    res.redirect('/queue');
})

app.listen(process.env.PORT || 3001);