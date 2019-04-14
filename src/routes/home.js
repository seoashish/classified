const router = require("express").Router();

router.get("/", (req, res, next) => {
      res.render("showads", { title: "View Classifieds" });
});

router.get("/view-ad", (req, res, next) => {
      res.render("adview", { title: "Listing Page" });
});

module.exports = router;