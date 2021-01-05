const mongoose = require('mongoose');

var galleryImageSchema = new mongoose.Schema({
    title: String,
    description: String,
    img: 
    {
        data: Buffer,
        contentType: String
    }
})

module.exports = new mongoose.model('Image', galleryImageSchema);