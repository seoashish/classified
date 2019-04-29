const router = require("express").Router();
const fs = require("fs");
const { adminAuth } = require("../middlewares/authRequest");
const { mongooseError } = require("../services/mongooseError");
const { District } = require("../models/district_model");
const { Category } = require("../models/category_model");
const { Classified } = require("../models/classified_model");
const { User } = require("../models/user");
const { Inquery } = require("../models/inquery_model");

/**
 * admin router
 */

router.get("/", adminAuth, (req, res, next) => {
      res.render("admin/classified", { title: "Classified List | Edit Classified | Delete Classified"});
});


/**
 * classified router
 */
router.get("/classified", adminAuth, (req, res, next) =>{
      res.render("admin/classified", { title: "Classified List | Edit Classified | Delete Classified"});
});

router.post("/classified", adminAuth, (req, res, next) =>{
     // console.log(req.body);
/* create request variable assign req.body */      
let request = req.body;      

/* search string */
let searchStr = {};
if(request.search.value){
      let regex = RegExp(request.search.value, "i");
      searchStr = { $or:[{ "title": regex }, { "category": regex }, { "city": regex}] };
}else{
      searchStr = {};
}

/* sort request */      
let sortBy = {};
if(request.order[0].column == "1"){
      sortBy = { "title" : request.order[0].dir };
}else if(request.order[0].column == "2"){
      sortBy = { "category" : request.order[0].dir };
}else if(request.order[0].column == "3"){
      sortBy = { "city" : request.order[0].dir };
}else if(request.order[0].column == "4"){
      sortBy = { "status" : request.order[0].dir };
}else{
      sortBy = {};
}

            Classified.countDocuments({}, (err, totalcount) =>{
                  recordsTotal = totalcount;
                  Classified.countDocuments(searchStr, (err, filtercount) =>{
                      recordsFiltered = filtercount;
                      Classified.find(searchStr)
                        .select("title category city status image")
                        .sort(sortBy)
                        .skip(Number(request.start))
                        .limit(Number(request.length))
                        .exec((err, classified) =>{
                              if(err){
                                    const error = mongooseError(err);
                                    next(error);
                                    return;
                              }
                          let data = JSON.stringify({
                                "draw": Number(request.draw),
                                "recordsFiltered": recordsFiltered,
                                "recordsTotal": recordsTotal,
                                "data": classified
                          });

                          res.send(data);
                        });

                  });
            });      
});

router.post("/classified/one", adminAuth, (req, res, next) =>{
      Classified.findById(req.body.adsId)
      .select("title description website subcategory district -_id")
      .exec((err, ads) =>{
         if(err){
               const error = mongooseError(err);
               next(error);
               return;
         }
         res.json(ads);
      });
});

router.post("/classified/edit", adminAuth, (req, res, next)=>{
     //console.log(req.body)
     let updateClassified = { status: req.body.status };
      Classified.findByIdAndUpdate(req.body.adsId, updateClassified)
              .exec((err) =>{
                  if(err){
                        const error = mongooseError(err);
                        next(error);
                        return;
                  }
                  res.redirect("/a/classified");  
              });
});

router.post("/classified/delete", adminAuth, (req, res, next) =>{
// find classified, delete image from disk and delete classified
Classified.findById(req.body.adsId)
.exec((err, ads) =>{
  if(err){
      const error = mongooseError(err);
      next(error);
      return;
  }
  if(ads){
      // delete image
      fs.unlink(`./public/img/${ads.image}`, function(err){
          if(err){
              const error = mongooseError(err);
              next(error);
              return;
          }

          // delete classified
          Classified.deleteOne({ _id: req.body.adsId })
          .exec((err, data) =>{
              if(err){
                  const error = mongooseError(err);
                  next(error);
                  return;
              }
                 // res.send("Successfully record deleted.");
                 res.redirect('/a/classified');
          });
      });
  }
});  
});



/**
 * users router
 */
router.get("/users", adminAuth, (req, res, next) =>{
      res.render("admin/users", { title: "User List | Edit User | Delete User"});
});

router.post("/users", adminAuth, (req, res, next) =>{
  /* create request variable assign req.body */      
let request = req.body;      

/* search string */
let searchStr = {};
if(request.search.value){
      let regex = RegExp(request.search.value, "i");
      searchStr = { $or:[{ "firstname": regex }, { "username": regex }] };
}else{
      searchStr = {};
}

/* sort request */      
let sortBy = {};
if(request.order[0].column == "0"){
      sortBy = { "firstname" : request.order[0].dir };
}else if(request.order[0].column == "1"){
      sortBy = { "username" : request.order[0].dir };
}else if(request.order[0].column == "2"){
      sortBy = { "isAdmin" : request.order[0].dir };
}else if(request.order[0].column == "3"){
      sortBy = { "isActive" : request.order[0].dir };
}else{
      sortBy = {};
}

            User.countDocuments({}, (err, totalcount) =>{
                  recordsTotal = totalcount;
                  User.countDocuments(searchStr, (err, filtercount) =>{
                      recordsFiltered = filtercount;
                      User.find(searchStr)
                        .select("firstname username isAdmin isActive")
                        .sort(sortBy)
                        .skip(Number(request.start))
                        .limit(Number(request.length))
                        .exec((err, user) =>{
                              if(err){
                                    const error = mongooseError(err);
                                    next(error);
                                    return;
                              }
                          let data = JSON.stringify({
                                "draw": Number(request.draw),
                                "recordsFiltered": recordsFiltered,
                                "recordsTotal": recordsTotal,
                                "data": user
                          });

                          res.send(data);
                        });

                  });
            });          
});


router.post("/users/edit", adminAuth, (req, res, next)=>{
      //console.log(req.body)
      let updateUser = { isAdmin: req.body.isAdmin, isActive: req.body.isActive };
      User.findByIdAndUpdate(req.body.userId, updateUser)
               .exec((err) =>{
                   if(err){
                         const error = mongooseError(err);
                         next(error);
                         return;
                   }
                   res.redirect("/a/users");  
               });
});


router.post("/users/delete", adminAuth, (req, res, next) =>{
      console.log("user delete");
      User.findByIdAndDelete(req.body.userId)
          .exec((err) =>{
            if(err){
                  const error = mongooseError(err);
                  next(error);
                  return;
            }
            res.redirect("/a/users");
          });
});


/**
 * inquery router
 */
router.get("/inquery", adminAuth, (req, res, next) =>{
       res.render("admin/inquery", { title: "Inquery List | Reply Inquery | Delete Inquery"})
});

router.post("/inquery", adminAuth, (req, res, next) =>{
 /* create request variable assign req.body */      
 let request = req.body;      

 /* search string */
 let searchStr = {};
 if(request.search.value){
       let regex = RegExp(request.search.value, "i");
       searchStr = { $or:[{ "name": regex }, { "email": regex }] };
 }else{
       searchStr = {};
 }
 
 /* sort request */      
 let sortBy = {};
 if(request.order[0].column == "0"){
       sortBy = { "name" : request.order[0].dir };
 }else if(request.order[0].column == "1"){
       sortBy = { "email" : request.order[0].dir };
 }else{
       sortBy = {};
 }
 
             Inquery.countDocuments({}, (err, totalcount) =>{
                   recordsTotal = totalcount;
                   Inquery.countDocuments(searchStr, (err, filtercount) =>{
                       recordsFiltered = filtercount;
                       Inquery.find(searchStr)
                         .select("name email message mobile")
                         .sort(sortBy)
                         .skip(Number(request.start))
                         .limit(Number(request.length))
                         .exec((err, inquery) =>{
                               if(err){
                                     const error = mongooseError(err);
                                     next(error);
                                     return;
                               }
                           let data = JSON.stringify({
                                 "draw": Number(request.draw),
                                 "recordsFiltered": recordsFiltered,
                                 "recordsTotal": recordsTotal,
                                 "data": inquery
                           });
 
                           res.send(data);
                         });
 
                   });
             });     
});


router.post("/inquery/delete", adminAuth, (req, res, next) =>{
       Inquery.findByIdAndDelete(req.body.inqId)
              .exec((err) =>{
                  if(err){
                        const error = mongooseError(err);
                        next(error);
                        return;
                  }
                  res.redirect("/a/inquery");
              });
});



/**
 * district router
 */
router.get("/district", adminAuth, (req, res, next) =>{
      District.find()
      .select("name")
      .sort({ name: 1 })
      .exec((err, district) =>{
            if(err){
                  const error = mongooseError(err);
                  next(error);
                  return;
            }
        res.render("admin/district", { title: "District List | Add District | Edit District | Delete District", districts: district });
      }); 
});

router.post("/district", adminAuth, (req, res, next) =>{
      District.findById(req.body.distId)
              .select("name city -_id")
              .exec((err, district) =>{
                  if(err){
                        const error = mongooseError(err);
                        next(error);
                        return;
                  }
                  res.json(district);
              });
});

router.post("/district/one", adminAuth, (req, res, next) =>{
      //console.log(req.body.query)
      District.findOne(req.body.query)
               .exec((err, district) =>{
                  if(err){
                        const error = mongooseError(err);
                        next(error);
                        return;
                  }
                  if(district){
                        //console.log(true)
                        res.json({ isExist : true });
                  }else{
                        //console.log(false)
                        res.json({ isExist: false });
                  }
               });
});

router.post("/district/add", adminAuth, (req, res, next) =>{
      console.log(req.body["a-district"])
      let newDistrict = new District({
          name: req.body["a-district"],
          city: req.body["a-city"]
      });
      
      newDistrict.save((err) =>{
        if(err){
              const error = mongooseError(err);
              next(error);
              return;
        }
        res.redirect("/a/district");
      });
});

router.post("/district/edit", adminAuth, (req, res, next) =>{
      
      let updateDistrict = { city: req.body["e-city"] };
      District.findByIdAndUpdate(req.body.distId, updateDistrict)
              .exec((err) =>{
                  if(err){
                        const error = mongooseError(err);
                        next(error);
                        return;
                  }
                  res.redirect("/a/district");  
              });
});

router.post("/district/delete", adminAuth, (req, res, next) =>{
      District.findByIdAndDelete(req.body.distId)
              .exec((err) =>{
                  if(err){
                        const error = mongooseError(err);
                        next(error);
                        return;
                  }
                  res.redirect("/a/district");
              });
});


/**
 * category router
 */
router.get("/category", adminAuth, (req, res, next) =>{
      Category.find()
            .select("category")
            .sort({ category: 1 })
            .exec((err, category) =>{
                  if(err){
                        const error = mongooseError(err);
                        next(error);
                        return;
                  }
              res.render("admin/category", { title: "Category List | Add Category | Edit Category | Delete Category", categories: category });
            }); 
});
router.post("/category", adminAuth, (req, res, next) =>{
      Category.findById(req.body.catId)
              .select("category subcategory -_id")
              .exec((err, category) =>{
                  if(err){
                        const error = mongooseError(err);
                        next(error);
                        return;
                  }
                  res.json(category);
              });
});

router.post("/category/one", adminAuth, (req, res, next) =>{
      //console.log(req.body.query)
      Category.findOne(req.body.query)
               .exec((err, category) =>{
                  if(err){
                        const error = mongooseError(err);
                        next(error);
                        return;
                  }
                  if(category){
                        //console.log(true)
                        res.json({ isExist : true });
                  }else{
                        //console.log(false)
                        res.json({ isExist: false });
                  }
               });
});
 
router.post("/category/add", adminAuth, (req, res, next) =>{
    let newCateogory = new Category({
        category: req.body.icategory.toLowerCase(),
        subcategory: req.body.isubcat
    });
    
    newCateogory.save((err) =>{
      if(err){
            const error = mongooseError(err);
            next(error);
            return;
      }
      res.redirect("/a/category");
    });
});

router.post("/category/edit", adminAuth, (req, res, next) =>{
      let updateCategoy = { subcategory: req.body.esubcat };
      Category.findByIdAndUpdate(req.body.catId, updateCategoy)
              .exec((err) =>{
                  if(err){
                        const error = mongooseError(err);
                        next(error);
                        return;
                  }
                  res.redirect("/a/category");  
              });
});

router.post("/category/delete", adminAuth, (req, res, next) =>{
      Category.findByIdAndDelete(req.body.catId)
              .exec((err) =>{
                  if(err){
                        const error = mongooseError(err);
                        next(error);
                        return;
                  }
                  res.redirect("/a/category");
              });
});

module.exports = router;