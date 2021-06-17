var express = require("express");

var router = express.Router();

// TODO: add in error and info

router.use(function(req, res, next){
  //console.log('Dans index : ', req.session.colliers);
  //console.log('Dans index -> res.locals.user : ', req.session);
  if (req.session.validate) {
    console.log("Validate", req.session.validate);
    res.locals.validate = req.session.validate
    req.session.validate = undefined
  }
  if (req.session.error) {
    res.locals.error = req.session.error
    req.session.error = undefined
  }
  if (req.session.message) {
    res.locals.message = req.session.message
    req.session.message = undefined
  }
  if (req.session.link) {
    res.locals.link = req.session.link
    req.session.link = undefined
  }
  console.log(req.session);
  res.locals.user = req.session;
  next();
});

router.use("/", require("./home"));

router.use("/api/animal", require("./home"));

router.use("/home", require("./home"));

router.use("/inscription", require("./home"));

router.use("/connexion", require("./home"));

router.use("/deconnexion", require("./home"));

router.use("/find", require("./home"));

router.use("/findHome", require("./home"));

router.use("/findType", require("./home"));

router.use("/profil", require("./home"));

router.use("/modifierProfil", require("./home"));

router.use("/ajoutAnimal", require("./home"));

router.use("/modifierAnimal", require("./home"));
router.use("/entreModif", require("./home"));

router.use("/supprimerAnimal", require("./home"));

router.use("/ajoutCollier", require("./home"));

router.use("/supprimerCollier", require("./home"));

router.use("/flash", require("./home"));

router.use("/test", require("./home"));

router.use("*", require("./home"));

module.exports = router;
