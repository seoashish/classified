const mongoose = require("mongoose");

const districtSchema = new mongoose.Schema({
    district:{
        type: String,
        required: true,
        lowercase: true,
        unique: true,
        trim: true
    },
    city:{
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


const District = mongoose.model("District", districtSchema);
module.exports.District = District;