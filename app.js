const express = require("express");
const bcrypt = require('bcrypt');
const passport = require("passport");
const flash = require("express-flash");
const session = require("express-session");
require("dotenv").config();

//const fs = require('./models/fonctions.js');


const path = require('path');


var bodyParser = require("body-parser");
var cookieParser = require('cookie-parser');


const app = express();

//Choisie le port sur lequel doit etre le serveur
app.set("port", process.env.PORT || 3000);

//Définie la route pour les views (toutes les page EJS)
app.set("views", path.join(__dirname, "views"));
app.set("node_modules", path.join(__dirname, 'node_modules'));

//Donne les infos pour faire fonctionner EJS
app.set("view engine", "ejs");

app.use(express.static('public'));
app.use(express.static('node_modules'));

app.use(bodyParser.urlencoded({extended:true}));
app.use(cookieParser());

//initialize les parametre des cookie
app.use(session({
  secret:"qsdqsdfq54sdffdqsdf684",
  resave:false,
  saveUninitialized:true,
  cookie: {
    maxAge: 999999999 //36000s de save
  }
}));

// var http = require('http');
//
// http.get({'host': 'api.ipify.org', 'port': 80, 'path': '/'}, function(resp) {
//   resp.on('data', function(ip) {
//     console.log("My public IP address is: " + ip);
//   });
// });

// var get_ip = require('ipware')().get_ip;
// app.use(function(req, res, next) {
//     var ip_info = get_ip(req);
//     console.log(ip_info);
//     // { clientIp: '127.0.0.1', clientIpRoutable: false }
//     next();
// });




app.use(passport.initialize());
app.use(passport.session());
app.use(flash());
// app.use((req, res, next) => {
//   res.json({message: 'Votre requête'});
//   next();
// })

//Defini la route que le serveur doit utiliser pour chercher les route pour les pages selon l'url
app.use("/", require("./routes/web"));
//app.use("/api", require("./routes/api"));

// const Api = require('models/users.js');
// app.post('/selectAnimal', Api.SelectId);

//Demmare le serveur sous le port recupéré avant.
app.listen(app.get('port'), function(){
  var os = require('os');
  //console.log(os.platform());
  //console.log(os.networkInterfaces().Ethernet);
  console.log("Server started");
});
