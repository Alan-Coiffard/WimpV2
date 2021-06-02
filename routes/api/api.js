const Api = require('../../models/api.js');

var express = require("express");
var passport = require('passport');
const bcrypt = require('bcrypt');


var router = express.Router();

router.post('/api/animal', Api.afficherAnimal);


module.exports = router;
