const express = require("express");
const app = express();

app.set("view engine", "twig");

app.get("/", (req, res) => {
     //res.send("Hello World!");
       res.render("home", { title: "Jharkhand Classified", message: "Hello there!" });
});


















module.exports = app;
