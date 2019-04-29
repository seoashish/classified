const { mongooseError } = require("./mongooseError");
const { Category } = require("../models/category_model");
const { District } = require("../models/district_model");

async function getCategory(){
    const category = await Category.find()
                                   .select("category subcategory");
    return category;
};


async function getDistrict(){
    const district = await District.find()
                                   .select("district city");
    return district;
};

let category = getCategory();
let district = getDistrict();

module.exports.category = category;
module.exports.district = district;
    