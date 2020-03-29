const mongoose = require('mongoose');

const ItemSchema = mongoose.Schema({
    imgUrl: String,
    titulo: String,
    descripcion: String,
    precio: Number,
    color: String
}, {
    timestamps: true
})

module.exports = mongoose.model('Item', ItemSchema);

