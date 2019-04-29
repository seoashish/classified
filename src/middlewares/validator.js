const { check, validationResult } = require('express-validator/check');
const { matchedData } = require('express-validator/filter');
const { User } = require("../models/user");
const { Classified } = require("../models/classified_model");

/**
 * post signup validation
 */
const signupValidator =[
  check('firstname').trim().isLength({ min: 5, max:30 }).withMessage('Firstname must be 5-30 character long.'),
  check('lastname').trim().isLength({ min: 5, max: 30 }).withMessage('Lastname must be 5-30 character long.'),
  check('username').trim().isEmail().withMessage('Please provide a valid email.')
                   .custom(value => {
                      return User.findOne({ username: value }).then(user => {
                          if(user){
                              return Promise.reject('Email is already in use provide another one.')
                          }
                      })
                   }),
  check('password').trim().isLength({ min: 8, max: 12 }).withMessage('Password must be 8-12 character long.'),
  check('rpassword').trim().custom((value, {req}) => {
      if(value !== req.body.password){
          throw new Error('Password confirmation is incorrect.');
      }else{
          return true;
      }
  })
];

/**
 * post reset validation
 */
const resetValidator =[
  check('username').custom(value => {
    return User.findOne({ username: value }).then(user => {
        if(!user){
            return Promise.reject('Email is not exist.')
        }
    })
  }),  
  check('newpassword').trim().isLength({ min: 8, max: 12 }).withMessage('Password must be 8-12 character long.'),
  check('rpassword').trim().custom((value, {req}) => {
      if(value !== req.body.newpassword){
          throw new Error('Password confirmation is incorrect.');
      }else{
          return true;
      }
  })
];

/**
 * post forgot validation for forgot password
 */
const forgotValidator =[
    check('username').custom(value => {
        return User.findOne({ username: value, isActive: true }).then(user => {
             if(!user){
                 return Promise.reject('Email address is not actived.') 
             }
        });
    })
];

/**
 *  post classified validation
 */
const classifiedValidator = [
    check('description').trim()
        .not().matches(/(escort|call.?girl)/i).withMessage('Description contain banned word.')
        .isLength({ min: 100, max: 500}).withMessage('Description must be at least 100 chars and max 500 chars long'),
    check('email').trim().isEmail().withMessage('Enter a valid email'),
    check('website').trim().custom((value) =>{
       let regex = /^((https?):\/\/)?(www.)?[a-z0-9]+\.[a-z]+(\/[a-zA-Z0-9#]+\/?)*$/i;
       if( value != ""){
           if(!regex.test(value)){
               return Promise.reject("Please enter a valid website.")
           }
       }
       return true;
    }),
    check('mobile').trim().isMobilePhone("en-IN").withMessage('Enter a valid mobile no.'),
    check('category').trim().isLength({ min: 3 }).withMessage('Please select a category'),
    check('subcategory').trim().isLength({ min: 3 }).withMessage('Please select a subcategory'),
    check('district').trim().isLength({ min: 3 }).withMessage('Please select a district'),
    check('city').trim().isLength({ min: 3 }).withMessage('Please select a city'), 
    check('userid').trim(),
    /* check unique title in a city  */
    check('title').trim()
        .not().matches(/(escort|call.?girl)/i).withMessage('Title contain banned word.')
        .isLength({min: 10, max: 80}).withMessage('Title must be at least 10 chars and max 80 chars long') 
        .custom((value, { req }) =>{
            let title = value.toLowerCase(); 
            let city = req.body.city.toLowerCase();
           return Classified.findOne({ title:title, city:city }).then(user =>{
               if(user){
                  // console.log(user);
                   return Promise.reject('Title already exist in this city');
               }
           });
        }),
];


const contactValidator =[
    check('name').trim(),
    check('email').trim().isEmail().withMessage('**Enter a valid email'),
    check('mobile').trim().custom((value) =>{
        let regex = /^[56789]\d{9}$/;
        if( value != ""){
            if(!regex.test(value)){
                return Promise.reject("**Please enter a valid mobile no.")
            }
        }
        return true;
     }),
    check('message').trim().isLength({ min: 10, max: 1000}).withMessage('**Message is too short or too long.'),
];

exports.signupValidator = signupValidator;
exports.resetValidator = resetValidator;
exports.forgotValidator = forgotValidator;
exports.classifiedValidator = classifiedValidator;
exports.contactValidator = contactValidator;
exports.validationResult = validationResult;
exports.matchedData = matchedData;