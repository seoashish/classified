const router = require("express").Router();
const { Classified } = require("../models/classified_model");
const { District } = require("../models/district_model");
const { Category } = require("../models/category_model");


/******************************************
 ************* Get Classified *************
 *****************************************/
router.post("/", function(req, res){
   console.log(req.body);
   res.send("hello");
});

router.post("/classified", function(req, res){
   let limit = parseInt(req.body.limit);
   let page = parseInt(req.body.page) < 1 ? 1 : parseInt(req.body.page);
   let query = req.body.query;

let sort_by = { title: 1 };   
  if(req.body.sort != "" && req.body.sort == "title"){
      sort_by = { title: 1 };
  } 
  if(req.body.sort != "" && req.body.sort == "website"){
      sort_by = { website: 1 };
  }   
  if(req.body.sort != "" && req.body.sort == "date"){
      sort_by = { createAt: 1 };
  }   



    Classified.find(query).countDocuments(function(err, count){
        if(err){
            res.send(err);
            return;
        }

        Classified.find(query)
        .limit(limit) // limit
        .skip((page*limit) - limit) //(page*limit) - limit
        .select("image title description email website mobile city subcategory -_id")
        .sort(sort_by)
        .exec((err, classified) =>{
            if(err){
                res.send(err);
                return;
            }
            res.json({ totalRecord:count, data: classified });
        });
   }); 
 
   //res.json({ isEmpty: isEmpty(query), emt1: emt1, sort: sort_by });
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


/* function check object is empty or not */
function isEmpty(obj) {
    for(var key in obj) {
        if(obj.hasOwnProperty(key))
            return false;
    }
    return true;
};