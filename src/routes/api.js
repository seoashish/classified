const router = require("express").Router();
router.post("/", function(req, res){
   let limit = parseInt(req.body.limit);
   let page = parseInt(req.body.page) < 1 ? 1 : parseInt(req.body.page);

    res.json({limit: limit, page: page, totalRecord: 1000});
});

module.exports = router;