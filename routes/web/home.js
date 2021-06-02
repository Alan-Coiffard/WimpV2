const User = require('../../models/users.js');

var express = require("express");
var passport = require('passport');
const bcrypt = require('bcrypt');


var router = express.Router();

//router.get() sert à faire une action en fonction de l'url
//exemple pour le premier
//L'url est "/" et on affiche dans les log quel page charge et ensuite on charge la page en utilisant res.render()
//il est aussi possible de mettre une fonction venant d'un autre Fichier
//il faut pour cela importer le fichier plus haut et ne pas oublier d'exporter la fonction dans l'autre fichier (ici User)

router.get("/", function(req, res){
  console.log("Page : accueil chargé");
  res.render("home/index");
});

router.get('/home', User.findType);

router.get('/flash', function(req, res){
  // Set a flash message by passing the key, followed by the value, to req.flash().
  req.flash('info', 'Flash is back!');
  console.log('info');
  res.redirect('/');
});

router.get("/test", function(req, res){
  console.log("profil page charged");
  res.render("test");
});

router.get("/connexion", function(req, res){
  console.log("connexion page charged");
  res.render("home/connexion");
});

router.get("/inscription", function(req, res){
  console.log("inscription page charged");
  res.render("home/inscription");
});

router.get("/deconnexion", function(req, res){
  let errors = []
  if (!req.session.id_client) {
    errors.push({ message: "Connectez-vous" });
  }
  if (errors.length > 0) {
    res.render("home/connexion", { errors });
  } else {
    req.session.destroy(function(err) {
      res.redirect('/');
    })
  }
});

router.get('/find', User.findAll);
router.get('/findHome', User.findHome);

router.get("/profil", function(req, res){
  console.log("profil page charged");
  res.render("profil");
});

//router.post fait la même chose que .get() mais pour les appel de post sur la page web indiqué.
router.post('/inscription', User.signup);
router.post('/connexion', User.signin);
router.post('/modifierProfil', User.modifyProfil);

router.post('/ajoutAnimal', User.ajoutAnimal);
router.get('/supprimerAnimal', User.supprimerAnimal);

router.get('/entreModif', User.entreModif);
router.post('/modifierAnimal', User.modifierAnimal);


// router.post('/supprimerAnimal', function(req, res){
//   //res.render('_partial/profil/supprimer/_supprimer_Animal');
//   JSAlert.alert("This is an alert.");
//
// });
//showAlert(error.message);

router.post('/ajoutCollier', User.ajoutCollier);
router.get('/supprimerCollier', User.supprimerCollier);

//module.export comme son nom l'indique exporte les donné ce qui les rend accessible sur d'autre page
module.exports = router;
