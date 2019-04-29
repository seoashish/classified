const userAuth = function(req, res, next){
   if(req.user){
       //console.log(req.user);
       next();
   }else{
       res.redirect("/u/signin");
   }
};

const adminAuth = function(req, res, next){
    //console.log(req.user);
    if(req.user && req.user.isAdmin){
        next();
    }else{
        res.redirect("/u/signin");
    }
};


exports.userAuth = userAuth;
exports.adminAuth = adminAuth;