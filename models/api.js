const environment     = process.env.NODE_ENV || 'development';    //définir l'environnement
console.log(environment);
const configuration   = require('../knexfile')[environment];      // extraire la base de données correcte avec les configurations d'environnement
const database        = require('knex')(configuration);

// const selectId = function(request, response){
//   console.log("Entre dans afficher animal");
//   const idSelect = request.body.listeAnimaux
//   console.log("idSelect : ", idSelect);
//   request.session.idSelect = idSelect;
//   _findAnimalById(idSelect)
//     .then(foundAnimals => {
//       animaux = foundAnimals.rows
//       console.log("animal : ", animaux);
//       return animaux
//     })
//     .then(() => {
//       request.session.animal = animaux;
//     })
//     .catch((err) => console.error(err))
//   response.redirect("/")
// }
//
// const _findAnimalById = (id_animal) => {
//   let request = database.raw("SELECT * FROM animaux WHERE id_animal = ?", [id_animal], (err, res) => {
//     //console.log(err ? err.stack : "test ",res.rows[0]) // Hello World!
//     database.end()
//   })
//   return request
// }

const afficherAnimal = (request, response) => {
  console.log("Entre dans afficher animal");
  const idSelect = request.body.listeAnimaux
  console.log(idSelect);
  request.session.idAnimalSelect = idSelect;

  findGPS(idSelect)
  .then(foundGPS => {
    request.session.gps = foundGPS;
    response.redirect('/home');
  })

}

const stockerGPS = (foundGPS) => {
  request.session.gps = data;
}

const findGPS = (idAnimal) => {
  return database.raw("SELECT * FROM gps WHERE id_Animal = ?", [idAnimal])
  .then((data) => {
    return data.rows
  });
}


module.exports = {
  afficherAnimal
}
