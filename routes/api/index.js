var express = require("express");

var router = express.Router();

router.use(function(req, res, next){
  //console.log('Dans index : ', req.session.colliers);
  //console.log('Dans index -> res.locals.user : ', req.session);
  res.locals.user = req.session;
  next();
});

router.use("/api/animal", require("./api"));

module.exports = router;
