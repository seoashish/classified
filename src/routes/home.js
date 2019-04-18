const router = require("express").Router();

router.get("/", (req, res, next) => {
      res.render("showads", { title: "Jharkhand Classified | Classified Ads In Jharkhand | Classified Jharkhand" });
});

module.exports = router;