const environment     = process.env.NODE_ENV || 'development';    //définir l'environnement
console.log(environment);
const configuration   = require('../knexfile')[environment];      // extraire la base de données correcte avec les configurations d'environnement
const database        = require('knex')(configuration);

const afficherAnimal = (request, response) => {
  console.log("Entre dans afficher animal");
  const idSelect = request.body.listeAnimaux
  console.log(idSelect);
  request.session.idAnimalSelect = idSelect;

  let dateDebut = request.cookies.dateDebut;
  let dateFin = request.cookies.dateFin;

  findGPS(idSelect, dateDebut, dateFin)
  .then(foundGPS => {
    console.log(foundGPS);
    request.session.gps = foundGPS;
    response.redirect('/home');
  });
}


const findGPS = (idAnimal, dateDebut, dateFin) => {
  var formatDate = "%d/%m/%Y";
  return database.raw("SELECT *, to_char(date, 'dd-mm-YYYY - HH24:MM:SS') FROM gps WHERE id_Animal = ? AND date BETWEEN ? AND ?", [idAnimal, dateDebut, dateFin])
  .then((data) => {
    return data.rows
  });
}


module.exports = {
  afficherAnimal
}
