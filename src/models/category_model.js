const mongoose = require("mongoose");

const categorySchema = new mongoose.Schema({
    category:{
        type: String,
        required: true,
        lowercase: true,
        trim: true
    },
    sub_category:{
        type: [String],
        lowercase: true,
        trim: true
    }
});

const Category = mongoose.model("Category", categorySchema);
module.exports.Category = Category;