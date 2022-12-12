const mongoose = require("mongoose");

const categorySchema = mongoose.Schema({
    name:{
        type: String,
        required:[true, 'Category named is required']
    },
    books:[{
        type: mongoose.Schema.Types.ObjectId,
        ref:'Book'
    }]
})

module.exports = mongoose.model('Category', categorySchema)