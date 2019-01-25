const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const userSchema = new mongoose.Schema({
    name: { 
        type: String,
        required: true
    },
    username: {
        type: String,
        unique: true,
        required: true
    },
    passwordHash: {
        type: String,
        required: true
    }
});

/**
 * create virtual field instance level
 */
userSchema.virtual('password')
  .get(function(){ return null; })
  .set(function(value){
     const hash = bcrypt.hashSync(value, 10);
     this.passwordHash = hash;
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
               console.log("Error attempting to use statics authenticate function", err);
               done(err);
           }else if(user && user.authenticate(password)){
               console.log("This should be a successfull login.");
               done(null, user);
           }else{
               console.log("Probably got their password wrong.");
               done(null, false);
           }
      });
};

const User = mongoose.model("User", userSchema);

exports.User = User;