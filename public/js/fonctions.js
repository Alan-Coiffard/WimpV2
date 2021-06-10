// fonction permetant de paramêtrer le zoom de départ
function startZoom(r, t){
  var rayon = r;
  var compte = new Boolean("true");
  console.log('rayon: ', r, 'zoom: ', zoom, 'compte: ', compte);
   //Savoir si il a adéjà un compte avec le bouton "home" configurer
  if (compte=true) {
    zoom = rayon / 100;
  }
  else {
    zoom = 16;
  }
}

//fonction pour trier les distances entres les points groupes
// Si distance < à 100 mètres, faire fondre le point dans le tracé
// Sinon afficher un point classique
//cf: https://www.movable-type.co.uk/scripts/latlong.html
function distance(e){
  const r = 6371; // km  (mètres (e3))
  const φ1 = e.lat[0] * Math.PI/180; // φ, λ en radians
  const φ2 = e.lat[1] * Math.PI/180;
  const Δφ = (e.lat[1]-e.lat[0]) * Math.PI/180;
  const Δλ  = (e.lon[1]-e.lon[0]) * Math.PI/180;

  console.log("φ1:", φ1,", φ2:", φ2,", Δφ:", Δφ, "Δλ :", Δλ );

  const a = Math.sin(Δφ/2) * Math.sin(Δφ/2) +
            Math.cos(φ1) * Math.cos(φ2) *
            Math.sin(Δλ /2) * Math.sin(Δλ /2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));

  const d = r * c; // en km (en mètres)
  console.log("a:", a,", c:", c,", distance:", d);

}

function routage(x, y) {

}

//fonction donnant un nombre random entre un min et un max
function initCoord(min, max) {
  min = min;
  max = max;
  return Math.random() * (max - min) + min;
}

// Fonction d'initialisation de points (randoms) sur la carte
function initPoint(city) {
  for (let point = 0; point < 10; point++){

    // Pour la France et ses alentours:
    //Lat = initCoord(42, 51);
    //Lon = initCoord(-4, 8);

    // Pour la Bretagne et ses alentours:
    // Lat = initCoord(47.97, 48.5);
    // Lon = initCoord(-4, -1);
    // Alt = initCoord(-4, 20);

    // Pour Lannion et ses alentours:
    Lat = initCoord(48.7861, 48.7041);
    Lon = initCoord(-3.5499, -3.3877);
    Alt = initCoord(-4, 20);

    // Pour la vallé du Stanco et ses alentours:
    // Lat = initCoord(48.73565081538279, 48.73746224718652);//48.73746224718652, -3.450671274438872
    // Lon = initCoord(-3.4550969193093337, -3.450671274438872);
    // Alt = initCoord(-4, 20);

    var ville = new Object();
    ville.id = point;
    ville.lat = Lat;
    ville.lon = Lon;
    ville.alt = Alt;
    city.push(ville);
    if (ville.id > 0) {
      trie(ville);
    }
  }
}

//  openForm() {
//   document.getElementById("myForm").style.display = "block";
// }
//
//  closeForm() {
//   document.getElementById("myForm").style.display = "none";
// }

// exports.startZoom = startZoom;
// exports.trie = trie;
// exports.routage = routage;
// exports.initCoord = initCoord;
// exports.initPoint = initPoint;

//  select() => {
//   const text = 'SELECT * FROM animaux'
//   // callback
//   pool.query(text, (err, res) => {
//     if (err) {
//       console.log("coucou")
//     } else {
//       console.log("non")
//     }
//   })
//   return 0;
// }

//  SelectId() => {
//   const selectElement = document.getElementById('selectAnimaux');
//   selectElement.addEventListener('change', (event) => {
//     alert(event.target.value);
//   });
// }
