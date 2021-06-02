var express = require("express");

var router = express.Router();

// TODO: add in error and info

router.use(function(req, res, next){
  //console.log('Dans index : ', req.session.colliers);
  //console.log('Dans index -> res.locals.user : ', req.session);
  res.locals.user = req.session;
  next();
});

router.use("/", require("./home"));

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

router.use("/animal", require("./home"));

router.use("/supprimerAnimal", require("./home"));

router.use("/ajoutCollier", require("./home"));

router.use("/supprimerCollier", require("./home"));

router.use("/flash", require("./home"));

router.use("/test", require("./home"));

module.exports = router;