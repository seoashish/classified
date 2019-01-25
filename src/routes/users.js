const router = require("express").Router();
const { User } = require("../models/user");

router.get("/", (req, res) => {
    res.render("users/userLanding", { title: "SignIn & SignUp Page" });
});

router.get("/signup", (req, res) => {
    res.render("users/signUp", { title: "SignUp Page" });
});

router.post("/signup", (req, res) =>{

      // req.flash('success_msg', 'Account successfully created');
      // res.redirect("/u/signup");
});

router.get("/signin", (req, res) => {
    res.render("users/signIn", { title: "SignIn Page" });
});

router.get("/dashboard", (req, res) => {
    res.render("users/dashboard", { title: "User Dashboard" })
});

module.exports = router;