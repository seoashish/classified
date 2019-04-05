const mongoose = require("mongoose");

const districtSchema = new mongoose.Schema({
    district:{
        type: String,
        required: true,
        lowercase: true,
        trim: true
    },
    city:{
        type: [String],
        lowercase: true,
        trim: true
    }
});


const District = mongoose.model("District", districtSchema);
module.exports.District = District;