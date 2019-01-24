const express = require("express");
const app = express();
const cookieParser = require("cookie-parser");
const session = require("express-session");
const flash = require("connect-flash");
const home = require("./routes/home");
const user = require("./routes/users");


app.set("view engine", "twig");
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

/**
 * cookie-parser middleware
 */
app.use(cookieParser());

/**
 * express-session middleware
 */
app.use(session({
    secret: "my_secret_key",
    resave: true,
    saveUninitialized: true
}));

/**
 * Use connect-flash after cookie-parser and session
 */
app.use(flash());

/**
 * Global variable
 */
app.use(function(req, res, next){
  res.locals.success_msg = req.flash('success_msg');
  res.locals.error_msg = req.flash('error_msg');
  res.locals.error = req.flash('error');
  next();
});

/**
 * routes middleware
 */
app.use("/", home);
app.use("/u", user);















module.exports = app;
