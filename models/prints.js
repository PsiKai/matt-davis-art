const mongoose = require('mongoose');

var printSchema = new mongoose.Schema({
    title: String,
    img: 
    {
        data: Buffer,
        contentType: String
    },
    quantity: Object
})

module.exports = new mongoose.model('Print', printSchema);