const mongoose = require('mongoose');

var galleryImageSchema = mongoose.Schema({
    title: String,
    medium: String,
    description: String,
    img: String,
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

module.exports = new mongoose.model('Image', galleryImageSchema);
