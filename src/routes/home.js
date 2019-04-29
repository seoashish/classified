const router = require("express").Router();
const { contactValidator, validationResult, matchedData } = require("../middlewares/validator");
const { Inquery } = require("../models/inquery_model");
const { mongooseError } = require("../services/mongooseError");

router.get("/", (req, res, next) => {
      res.render("showads", { title: "Jharkhand Classified | Classified Ads In Jharkhand | Classified Jharkhand" });
});

router.get("/contact", (req, res, next) =>{
     res.render("contact", { title: "Contact Us | Jharkhand Classified | Classified Ads In Jharkhand"});
});

router.post("/contact", contactValidator, (req, res, next) =>{
      const errors = validationResult(req);
      const dataMatch = matchedData(req);
      if (!errors.isEmpty()) {
          //console.log(errors.mapped());
          //console.log(dataMatch);
          return res.render("contact", { title: "Contact Us | Jharkhand Classified | Classified Ads In Jharkhand", errors: errors.mapped(), data: dataMatch });
      }

      let newInquery = new Inquery({
        name: req.body.name,
        email: req.body.email,
        mobile: req.body.mobile,
        message: req.body.message
      });

      newInquery.save((err) =>{
            if(err){
                  const error = mongooseError(err);
                  next(error);
                  return;
            }
            req.flash('success_msg', 'Message is send successfully.');
            res.redirect("/contact");
            
      });

});

module.exports = router;