const mongooseError = function(err){
    let errArray = [];
    for(field in err.errors){
      let obj = { "field name": field, "message": err.errors[field].message};
      errArray.push(obj)
    } 
    return errArray;
}

exports.mongooseError = mongooseError;