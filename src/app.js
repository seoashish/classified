const config = require("config");
const express = require("express");
const app = express();
const cookieParser = require("cookie-parser");
const session = require("express-session");
const MongoStore = require("connect-mongo")(session);
const passport = require("passport");
const flash = require("connect-flash");
const favicon = require("express-favicon");
const mongoose = require("mongoose");
const home = require("./routes/home");
const user = require("./routes/users");
const admin = require("./routes/admin");
const Api = require("./routes/api");
const errorHandler = require("./middlewares/errorHandler");

/**
 * MongoDB connection established
 */
mongoose.Promise = global.Promise;
mongoose.connect(config.get('database'), { useCreateIndex: true, useNewUrlParser: true })
.then( () => console.log('Connected to MongoDB...'))
.catch(err => console.log("Could not connected to MongoDB..."));

/**
 * set twig as view engine
 */
app.set("view engine", "twig");
app.set("twig options", { allow_async: true });

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
 * server favicon
 */
app.use(favicon(__dirname + '/logo01.png'));

/**
 * check application mode : development or production
 */
if(app.get('env') === 'development'){
    console.log('Application runing in Development Mode...');
    console.log('Database Url: ', config.get('database'));
}

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
    saveUninitialized: false,
    store: new MongoStore({
      mongooseConnection: mongoose.connection
    })
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
app.use("/a", admin);

/**
 * Data base API
 */
app.use("/api", Api);

/**
 * 404 route handler
 */
app.get('*', function(req, res){
  res.render("404page", { title: "404 Error | Jharkhand Classified" });
});

/**
 * error handling middleware
 */
app.use(errorHandler);



module.exports = app;
