const express = require("express");
const app = express();
const home = require("./routes/home");
const user = require("./routes/users");


app.set("view engine", "twig");

app.use("/", home);
app.use("/u", user);















module.exports = app;
