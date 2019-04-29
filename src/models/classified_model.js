const mongoose = require("mongoose");
const User = require("./user");

const classifiedSchema = new mongoose.Schema({
//title, description, email, website, mobile, user_id, category, location, tags, status

title: {
    type: String,
    unique: true,
    required: true,
    lowercase: true,
    trim: true
},
description: {
    type: String,
    required: true,
    trim: true
},
email:{
    type: String,
    lowercase: true,
    trim: true
},
website:{
    type: String,
    lowercase: true,
    trim: true
},
mobile:{
    type: String,
    required: true,
    trim: true
},
category:{
    type: String,
    required: true,
    lowercase: true,
    trim: true
},
subcategory:{
    type: String,
    required: true,
    lowercase: true,
    trim: true
},
district:{
    type: String,
    required: true,
    lowercase: true,
    trim: true
},
city:{
    type: String,
    required: true,
    lowercase: true,
    trim: true
},
user:{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
},
status:{
    type: String,
    enum: ["pending", "active", "banned"],
    default: "active"
},
image:{
    type: String,
    default: "default.jpg"
},
createAt:{
    type: Date,
    default: Date.now
}
});

const Classified = mongoose.model("Classified", classifiedSchema);
module.exports.Classified = Classified;