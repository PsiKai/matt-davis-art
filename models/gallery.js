const mongoose = require('mongoose');

var galleryImageSchema = new mongoose.Schema({
    title: String,
    medium: String,
    description: String,
    img: String,
    type: String,
    position: String

    // {
    //     data: Buffer,
    //     contentType: String
    // }
})

module.exports = new mongoose.model('Image', galleryImageSchema);
