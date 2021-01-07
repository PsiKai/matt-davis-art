const mongoose = require('mongoose');

var printSchema = new mongoose.Schema({
    title: String,
    img: 
    {
        data: Buffer,
        contentType: String
    },
    stock: Object
})

module.exports = new mongoose.model('Print', printSchema);