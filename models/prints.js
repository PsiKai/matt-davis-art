const mongoose = require('mongoose');

var printSchema = mongoose.Schema({
    title: String,
    img: String,
    // {
    //     data: Buffer,
    //     contentType: String
    // },
    // stock: Object,
    original: Boolean,
    price: Number,
    dimensions: Object,
    position: String,
    soldOut: {
        type: Boolean,
        default: false
    },
    createdAt: {
        type: Date,
        default: () => Date.now(),
        immutable: true
    },
    deletedAt: {
        type: Date,
        default: null,
    }
})

module.exports = new mongoose.model('Print', printSchema);
