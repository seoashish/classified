const router = require("express").Router();
const { Classified } = require("../models/classified_model");
const { District } = require("../models/district_model");
const { Category } = require("../models/category_model");


/******************************************
 ************* Get Classified *************
 *****************************************/

router.post("/classified", function(req, res){
   let limit = parseInt(req.body.limit);
   let page = parseInt(req.body.page) < 1 ? 1 : parseInt(req.body.page);
   let query = {};
      query.category = req.body.category;
   //query.city = "";

   Classified.find(query).countDocuments(function(err, count){
        if(err){
            res.send(err);
            return;
        }

        Classified.find(query)
        .limit(limit) // limit
        .skip((page*limit) - limit) //(page*limit) - limit
        .select("title description email website mobile district category ")
        .sort({ createAt: -1})
        .exec((err, category) =>{
            if(err){
                res.send(err);
                return;
            }
            res.json({ data: category, totalRecord:count });
        });
   });

   // format {limit: limit, page: page, totalRecord: 1000}
});



/***************************************
 *************** Get District **********
 **************************************/

 router.get("/district", (req, res) =>{
    District.find()
            .select("name city -_id")
            .sort({ name: 1})
            .exec((err, district) =>{
              if(err){
                  res.send(err);
                  return;
              }
              res.send(district);
            });
 });

/***********************************************
 **************** Get Category ***************** 
***********************************************/
router.get("/category", (req, res) =>{
    Category.find()
            .select("category subcategory -_id")
            .sort({ category: 1 })
            .exec((err, category) =>{
              if(err){
                  res.send(err);
                  return;
              }
              res.send(category);
            });
 });


module.exports = router;