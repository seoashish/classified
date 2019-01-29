const router = require("express").Router();


router.get("/", (req, res, next) => {
      res.render("home", { title: "Classified", message: "Hello World!" });
});

router.get("/search/:city/:cat?/:subcat?", (req, res, next) => {
      res.render("showads", { title: "View Classifieds" });
});


module.exports = router;