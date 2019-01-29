const LocalStrategy = require("passport-local").Strategy;
const { User } = require("../models/user");

function configure(passport){
    const strategyFunc = function(username, password, done){
      User.authenticate(username, password, function(err, user, object){
           if(err){
               done(err);
           }else{
                if(object.user){
                    if(object.notActive){
                        //console.log("LocalStrategy- Email address is not activated.");
                        done(null, false, { message: "Email address is not activated." });
                    }else if(!object.isMatch){
                        //console.log("LocalStrategy- Password is not matched.");
                        let messageHtml = `Password is not matched. Forgot password <a href="/u/forgot" class="alert-link">click here!</a>`;
                        done(null, false, { message: messageHtml });
                    }else{
                        //console.log("LocalStrategy- Login successful.");
                        done(null, user);
                    }
                    
                }else{
                    //console.log("LocalStrategy- Email is not exist in database");
                    done(null, false, { message: "Email is not exist in database." });
                }
           }
           
      });
    };   

    passport.use(new LocalStrategy(strategyFunc));

    passport.serializeUser(function(user, done){
        done(null, user.id);
    });

    passport.deserializeUser(function(id, done){
       User.findById(id, function(err, user){
         done(err, user);
       });
    });
};


module.exports = {
    configure
};