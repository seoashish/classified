const router = require("express").Router();
const District = require("../models/district_model");
const Category = require("../models/category_model");


/**
 * admin router
 */

router.get("/", (req, res, next) => {
      res.send("Admin");
});


/**
 * district router
 */


/**
 * category router
 */

 
module.exports = router;