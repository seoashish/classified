const router = require("express").Router();

router.get("/", (req, res) => {
    res.render("users/userLanding", { title: "SignIn & SignUp Page" });
});

router.get("/signup", (req, res) => {
    res.render("users/signUp", { title: "SignUp Page" });
});

router.get("/signin", (req, res) => {
    res.render("users/signIn", { title: "SignIn Page" });
});


module.exports = router;