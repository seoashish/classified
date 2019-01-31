const config = require("config");
const express = require("express");
const app = express();
const cookieParser = require("cookie-parser");
const session = require("express-session");
const passport = require("passport");
const flash = require("connect-flash");
const mongoose = require("mongoose");
const home = require("./routes/home");
const user = require("./routes/users");
const errorHandler = require("./middlewares/errorHandler");

/**
 * MongoDB connection established
 */
mongoose.connect(config.get('database'), { useCreateIndex: true, useNewUrlParser: true })
.then( () => console.log('Connected to MongoDB...'))
.catch(err => console.log("Could not connected to MongoDB..."));

/**
 * set twig as view engine
 */
app.set("view engine", "twig");

/**
 * body parse into json format
 */
app.use(express.json());

/**
 * post/get data parse into json format
 */
app.use(express.urlencoded({ extended: true }));

/**
 * serve public folder publicly
 */
app.use(express.static("public"));
app.use("/u", express.static("public"));      // file access for user route
/**
 * cookie-parser middleware
 */
app.use(cookieParser());

/**
 * express-session middleware
 */
app.use(session({
    secret: "dfsdfdggfkdhifdujdfksdfh",
    resave: false,
    saveUninitialized: false
}));

/**
 * passport init below session
 */
app.use(passport.initialize());
app.use(passport.session());
require("./services/passportconfig").configure(passport);

/**
 * Use connect-flash after cookie-parser and session
 */
app.use(flash());

/**
 * Global variable
 */
app.use(function(req, res, next){
  res.locals.success = req.flash('success');
  res.locals.success_msg = req.flash('success_msg');
  res.locals.error_msg = req.flash('error_msg');
  res.locals.error = req.flash('error');
  res.locals.user = req.user || null;
  next();
});

/**
 * routes middleware
 */
app.use("/", home);
app.use("/u", user);

/**
 * 404 route handler
 */
app.get('*', function(req, res){
  res.render("404page", { title: "404 Error" });
});

/**
 * error handling middleware
 */
app.use(errorHandler);



module.exports = app;
