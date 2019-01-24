const express = require("express");
const app = express();

app.set("view engine", "twig");

app.get("/", (req, res) => {
     //res.send("Hello World!");
       res.render("home", { title: "Classified", message: "Hello there!" });
});

app.get("/user", (req, res) => {
      res.render("users/userLanding", { title: "SignIn & SignUp Page" });
});
















module.exports = app;
