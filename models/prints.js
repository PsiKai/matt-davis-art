const mongoose = require('mongoose');

var printSchema = new mongoose.Schema({
    title: String,
    img: String,
    type: String,
    // {
    //     data: Buffer,
    //     contentType: String
    // },
    stock: Object
})

module.exports = new mongoose.model('Print', printSchema);