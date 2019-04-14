const mongoose = require("mongoose");

const categorySchema = new mongoose.Schema({
    category:{
        type: String,
        required: true,
        lowercase: true,
        unique: true,
        trim: true
    },
    subcategory:{
        type: [String],
        set: (arr) => {
            let lower = [];

          /* lower case the value and trim both side */
            arr.forEach((element) => {
                lower.push(element.toLowerCase().trim());
            });

            return lower;
      }
    }
});

const Category = mongoose.model("Category", categorySchema);
module.exports.Category = Category;