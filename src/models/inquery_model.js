const mongoose = require("mongoose");

const inquerySchema = new mongoose.Schema({
    name: {
        type: String,
        trim: true
    },
    email: {
        type: String,
        lowercase: true,
        trim: true
    },
    mobile: {
        type: String,
        trim: true
    },
    message: {
        type: String,
        trim: true
    },
    createAt:{
        type: Date,
        default: Date.now
    }
});

const Inquery =  mongoose.model("Inquery", inquerySchema);
exports.Inquery = Inquery;