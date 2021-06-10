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
    request.session.gps = foundGPS;
    response.redirect('/home');
  })

}

const findGPS = (idAnimal, dateDebut, dateFin) => {
  return database.raw("SELECT * FROM gps WHERE id_Animal = ? AND date BETWEEN ? AND ?", [idAnimal, dateDebut, dateFin])
  .then((data) => {
    return data.rows
  });
}


module.exports = {
  afficherAnimal
}
