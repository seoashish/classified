const router = require("express").Router();

router.get("/", (req, res) => {
    //res.send("Hello World!");
      res.render("home", { title: "Classified", message: "Hello there!" });
});



module.exports = router;