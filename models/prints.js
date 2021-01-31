const mongoose = require('mongoose');

var printSchema = new mongoose.Schema({
    title: String,
    img: String,
    type: String,
    // {
    //     data: Buffer,
    //     contentType: String
    // },
    // stock: Object,
    original: Boolean,
    price: Number,
    soldOut: Boolean
})

module.exports = new mongoose.model('Print', printSchema);