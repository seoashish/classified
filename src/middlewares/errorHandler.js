
module.exports = function(err, req, res, next){
   // Log the exceptions
   res.status(500).send(err);
};