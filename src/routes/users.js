const router = require("express").Router();
const { User } = require("../models/user");
const { randomText } = require("../services/randomText");
const { mongooseError } = require("../services/mongooseError");
const { sendMail, confirmHtml } = require("../services/nodeMailer");

/**
 * user landing page router
 */
router.get("/", (req, res, next) => {
    res.render("users/userLanding", { title: "Sign In & Sign Up Page" });
});

/**
 * signup router
 */
router.get("/signup", (req, res, next) => {
    res.render("users/signUp", { title: "Sign Up Page" });
});

/**
 * post signup router
 */
router.post("/signup", (req, res, next) =>{
    // check email: exist or not
    // if exist redirect to login route otherwise OK

    const newUser = new User({
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        username: req.body.username,
        password: req.body.password,
        token: randomText()
    });
  
    newUser.save(function(err, user){
      if(err){
           const error = mongooseError(err);
           next(error);
           return;
      }
      
      const mailObject ={
          to: user.username,
          subject: "Sending Email using Node.js",
          html: confirmHtml(user.username, user.token)
      };
      
      /**
       * sendMail function to send email address confirmation
       * @param mailObject
       * @callback { return error }
       */
      sendMail(mailObject, function(err){
         if(err){
             const error = mongooseError(err);
             next(error);
             return;
         }
      });

      req.flash('success_msg', 'Account successfully created! Please <a href="#" class="alert-link">confirm</a> your email address!');
      res.redirect("/u/signup");
    });
      
});

/**
 * sign-in router
 */
router.get("/signin", (req, res, next) => {
    res.render("users/signIn", { title: "Sign In Page" });
});

/**
 * post sign-in router
 */
router.post("/signin", (req, res, next) => {
    // check email: exist or not 
    // check isActive: true or not
    // check password: matched or not

   User.findOne({ username: req.body.username, isActive: true }, function(err, user){
       if(err){
           const error = mongooseError(err);
           next(error);
           return;
       }
       
       if(user === null){
           res.send('user not found');
           return;
       }else if( user && user.authenticate(req.body.password)){
           res.send('successfullu login');
       }else{
           res.send('password is wrong!')
       }
       
   })
});

/**
 * user dashboard router
 */
router.get("/dashboard", (req, res, next) => {
    //res.send("dashboard");
    res.render("users/dashboard", { title: "User Dashboard" })
});

/**
 * Password reset form
 */
router.get("/reset", (req, res, next) => {
    res.render("users/forgotPassword", { title: "Reset Your Password" });
});

/**
 * receive confirm email response
 */
router.get("/confirm/:email/:token", (req, res, next) => {
    // check email: exist or not
    // check token is valid or not
    // check particular user's isActive field is false otherwise token in unvalid
    User.findOne({ username: req.params.email, token: req.params.token, isActive: false}, function(err, user){
        if(err){
            const error = mongooseError(err);
            next(error);
            return;
        }
        if(user === null){
            res.send('this email address is already confirmed! Please login');
        }else{
            res.send('this email address is confirm please login!');
        }
    });
    
});

/**
 * confirmation email form
 */
router.get("/confirm", (req, res, next) => {
   res.render("users/confirmEmail", { title: "Confirm Your Email" });
});

/**
 * sign out router
 */
router.get("/signout", (req, res, next) => {
     res.send("signout");
});









module.exports = router;