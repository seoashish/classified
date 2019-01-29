const router = require("express").Router();
const passport = require("passport");
const { User } = require("../models/user");
const { randomText } = require("../services/randomText");
const { mongooseError } = require("../services/mongooseError");
const { sendMail, confirmHtml, resetHtml } = require("../services/nodeMailer");
const { userAuth } = require("../middlewares/authRequest");
const { signupValidator, resetValidator, forgotValidator, validationResult, matchedData } = require("../middlewares/validator");

/**
 * user landing page router
 */
router.get("/", (req, res, next) => {
    // if user log-in doesn't access this route redirect to root
     res.render("users/userLanding", { title: "Sign In & Sign Up Page" });
    
    
});

/**
 * signup router
 */
router.get("/signup", (req, res, next) => {
    // if user log-in doesn't access this route
    res.render("users/signUp", { title: "Sign Up Page" });
});

/**
 * post signup router
 */
router.post("/signup", signupValidator, (req, res, next) =>{
    // check email: exist or not
    // if exist redirect to login route otherwise OK
    const errors = validationResult(req);
    const user = matchedData(req);
    if (!errors.isEmpty()) {
        return res.render("users/signUp", { title: "Sign Up Page", errors: errors.mapped(), users: user });
    }

    // validation success then create and save user
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
          subject: "Email Confirmation Message",
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

      req.flash('success_msg', 'Account successfully created! Please <b>confirm</b> your email address!');
      res.redirect("/u/signup");
    });
      
});

/**
 * sign-in router
 */
router.get("/signin", (req, res, next) => {
    // if user log-in doesn't access this route
    res.render("users/signIn", { title: "Sign In Page" });
});

/**
 * post sign-in router
 * check email: exist or not
 * check isActive: true or not
 * check password: matched or not
 */
router.post("/signin", passport.authenticate( 'local', {
         successRedirect: "/u/dashboard",
         successFlash: "You are successfully log-in.",
         failureRedirect: "/u/signin",
         failureFlash: true
}));

/**
 * user dashboard router
 */
router.get("/dashboard", userAuth, (req, res, next) => {
    // if user log-out doesn't access this route
    //res.send("dashboard");
    res.render("users/dashboard", { title: "User Dashboard" })
});

/**
 * Password reset form
 */
router.get("/reset/:email/:token", (req, res, next) => {
    // if user log-in doesn't access this route
    if(req.params.email && req.params.token){
        const email = req.params.email;
        res.render("users/resetPassword", { title: "Reset Your Password", email: email });
    }
});

/**
 * post reset route
 */
router.post("/reset", resetValidator, (req, res, next) => {
    // reset the password
    // redirect signin
    const errors = validationResult(req);
    const user = matchedData(req);
    if (!errors.isEmpty()) {
        return res.render("users/resetPassword", { title: "Reset Your password", errors: errors.mapped(), users: user });
    }

    User.findOne({ username: req.body.username, passReset: true }, function(err, user){
        if(err){
            const error = mongooseError(err);
            next(error);
            return;
        }
        
        if(user){
            user.password = req.body.newpassword;
            user.passReset = false;
            user.save(function(err){
                if(err){
                    const error = mongooseError(err);
                    next(error);
                    return;
                }
                req.flash('success_msg', 'Password is successfully reset.');
                res.redirect("/u/signin");   
            });
        }else{
            res.redirect("/u/signin");
        }
    });
});

/**
 * forgot password form
 */
router.get("/forgot", (req, res, next) => {
    res.render("users/forgotPassword", { title: "Forgot password" });
});

/**
 * post confirm route forgot password
 * data receive from forgotPassword.twig
 */
router.post("/forgot", forgotValidator, (req, res, next) => {
    // check email isActive
    const errors = validationResult(req);
    const user = matchedData(req);
    if (!errors.isEmpty()) {
        return res.render("users/forgotPassword", { title: "Forgot password", errors: errors.mapped(), users: user });
    } 

    // passReset: true && send mail
    User.findOne({ username: req.body.username }, function(err, user){
        if(err){
            const error = mongooseError(err);
            next(error);
            return;
        }

        if(user){
           user.passReset = true;
           user.save(function(err){
             if(err){
                const error = mongooseError(err);
                next(error);
                return;
             }

            const mailObject ={
                to: user.username,
                subject: "Password Reset Message",
                html: resetHtml(user.username, user.token)
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
            
            req.flash('success_msg', 'Password reset instruction send in email address.');
            res.redirect("/u/forgot");   
           });
        }else{
            res.render("users/forgotPassword", { title: "Forgot password" });
        }
    });
});

/**
 * receive confirm email response
 */
router.get("/confirm/:email/:token", (req, res, next) => {
    // if user log-in doesn't access this route
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
            req.flash('error_msg', 'This email address is not register. Please sign-up!');
            res.redirect("/u/signup");
        }else{
            user.isActive = true;
            user.save(function(err){
            if(err){
                const error = mongooseError(err);
                next(error);
                return;
            } 
            req.flash('success_msg', 'This email address is activated. Please sign-in!');
            res.redirect("/u/signin");
            });
        }
    });
    
});

/**
 * confirmation email form
 */
router.get("/confirm", (req, res, next) => {
    // if user log-in doesn't access this route
   res.render("users/confirmEmail", { title: "Confirm Your Email" });
});

/**
 * sign out router
 */
router.get("/signout", (req, res, next) => {
     req.logout();
     res.redirect("/");
});









module.exports = router;