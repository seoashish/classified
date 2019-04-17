const router = require("express").Router();

router.get("/", (req, res, next) => {
      res.render("showads", { title: "Jharkhand Classified | Classified Ads In Jharkhand | Classified Jharkhand" });
});

router.get("/view-ad", (req, res, next) => {
      res.render("adview", { title: "Listing Page" });
});

module.exports = router;