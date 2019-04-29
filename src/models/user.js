const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const userSchema = new mongoose.Schema({
    firstname: { 
        type: String,
        required: true,
        minlength: 5,
        maxlength: 30,
        trim: true
    },
    lastname: { 
        type: String,
        required: true,
        minlength: 5,
        maxlength: 30,
        trim: true
    },
    username: {
        type: String,
        unique: true,
        required: true,
        maxlength: 255,
        trim: true
    },
    passwordHash: {
        type: String,
        required: true,
        set: value => bcrypt.hashSync(value, 10),
        alias: 'password'
    },
    token: {
        type: String,
        required: true
    },
    isAdmin:{
        type: Boolean,
        default: false
    },
    isActive:{
        type: Boolean,
        default: false
    },
    passReset: {
        type: Boolean,
        default: false
    },
    createAt:{
        type: Date,
        default: Date.now
    }
});

  /**
   * create a authenticate function to check password match or not
   * instance level function
   * @param {*} password 
   * return Boolean value
   */
userSchema.methods.authenticate = function(password){
      return bcrypt.compareSync(password, this.passwordHash);
};

/**
 * create a authenticate function 
 * 
 */
userSchema.statics.authenticate = function(username, password, done){
      this.findOne({ username: username }, function(err, user){
           if(err){
               done(err);
           }else{
               if(user === null){
                   done(null, user, { user: false });
               }else{
                   if(!user.isActive){
                    done(null, user, { user: true, notActive: true });
                   }else if(user && user.authenticate(password)){
                    done(null, user, { user: true, isMatch: true });
                   }else{
                    done(null, user, { user: true, isMatch: false });
                   }
                   
               }  

           }
              
           
           
           /* else{
               if(!user.isActive){
                   done(null, user, true);
               }else if(user && user.authenticate(password)){
                   done(null, user);
               }else{
                   done(null, false);
               }
           } */
           
      });
};

const User = mongoose.model("User", userSchema);

exports.User = User;
