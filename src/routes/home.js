const router = require("express").Router();

router.get("/", (req, res) => {
      res.render("home", { title: "Classified", message: "Hello World!" });
});



module.exports = router;