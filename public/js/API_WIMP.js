// On initialise la latitude et la longitude de l'habitation du client (centre de la carte)
// Au préalable séléctionné/donné par l'utilisateur, dans le cas contraire:
// Se positionner sur Paris.

var lat_home = 48.73056610085155;
var lon_home = -3.460834918664013;
var macarte = null;

//global.zoom = 12; // Etablit la profondeur du zoom sur lequel la map se charge
var zoom = 12;
// Nous initialisons un tableau city qui contiendra les "ville"
//list = nombre d'enregistrement fait par le GPS, sur la BDD, encore accessible
var list = 0;
let city = new Array(list);

function initPoint(city) {
  for (let point = 0; point < tabGPS.length; point++){
    var ville = new Object();
    ville.id = point;
    ville.lat = tabGPS[point].latitude;
    ville.lon = tabGPS[point].longitude;
    ville.alt = tabGPS[point].altitude;
    ville.date = tabGPS[point].date;
    city.push(ville);

  }
}

// Fonction d'initialisation de la carte
function initMap() {

   initPoint(city);
   // Créer l'objet "macarte" et l'insèrer dans l'élément HTML qui a l'ID "map"
   macarte = L.map('map').setView([lat_home, lon_home], zoom);
   markerClusters = L.markerClusterGroup(); // Nous initialisons les groupes de marqueurs
   // Leaflet ne récupère pas les cartes (tiles) sur un serveur par défaut. Nous devons lui préciser où nous souhaitons les récupérer. Ici, openstreetmap.fr
   L.tileLayer('https://{s}.tile.openstreetmap.fr/osmfr/{z}/{x}/{y}.png', {
       // Source des données
       attribution: 'données © OpenStreetMap/ODbL - rendu OSM France',
       minZoom: 1,
       maxZoom: 20
   }).addTo(macarte);

   var home_lat = 48.732675;
   var home_lon = -3.446217;

   var LeafIconHome = L.Icon.extend({
        options: {
           iconSize:     [20, 25],
           popupAnchor:  [-2, -3]
         }
    });

    var icon_home = new LeafIconHome({
        iconUrl: '/images/home.png'        // Icone "home"
    });

   if(animalDistance){
     console.log("Distance : ", animalDistance);
     var distance = animalDistance;
     //Création du périmêtre de la maison, autour du quel, la position du chien n'est pas pris en compte
     var home = L.circle([home_lat, home_lon], {
       color: 'red',
       fillColor: '#f03',
       fillOpacity: 0.5,
       //Radius = Rayon "Maison"
       radius: distance
    }).addTo(macarte).bindPopup("Maison");
   } else {
     var distance = 0;
     var d_marker = new L.marker([home_lat, home_lon], {icon: icon_home}).addTo(macarte).bindPopup("Maison");
   };

  console.log('home.radius: ', home._mRadius);
  console.log('xxxxxxxxxxx: ', zoom);

  startZoom(home._mRadius, zoom);

  //Création du boutton "afficher Menu"
  //     /!\ PAS FINI /!\
  var command = L.control({position: 'topright'});
  command.onAdd = function (macarte) {
    var div = L.DomUtil.create('div', 'command');
    div.innerHTML += '<button><img href="images/icon_plus.png" width="100px" /></button>';
    return div;
  };
  command.addTo(macarte);


  for (var i = 0; i < city.length-1; i++) {
    var latlngs = [[city[i].lat, city[i].lon],[city[i+1].lat, city[i+1].lon]];
    var polyline = L.polyline(latlngs, {color: '#C50022'}).addTo(macarte);

  //Création du tracé GPS qui suit les routes
    // L.Routing.control({
    //   waypoints:[
    //     //L.latLng(48.56036426785153, -3.1599197957359926),
    //     L.latLng(city[i].lat, city[i].lon),
    //     //L.latLng(48.51278434587372, -2.779401099923159)],
    //     L.latLng(city[i+1].lat, city[i+1].lon)],
    //      router: new L.Routing.OSRMv1({
    //        profile: 'route/v1/driving',         // /!\ IMPORTANT /!\ : Suffixe de serviceUrl
    //        serviceUrl: 'http://192.168.15.87:5000'  // Permet  http://localhost:5000
    //      }),
    //   // Class "animate" permet de régler (en CSS) certain détail de l'animation (vitesse d'exécution, temps avant exécution, coleur, etc...)
    //   lineOptions: {
    //     styles: [{className: 'animate'}]
    //   },
    //   draggableWaypoints: false,
    //   addWaypoints: false
    // }).addTo(macarte);
  }

   //test pour ajout dans tableau city
   for (ville in city) {
      // console.log(city[ville].lat);
      // console.log(city[ville].lon);
      // console.log(city[ville].alt);

     // Nous définissons la classe d'icône, à utiliser pour les marqueurs, leur taille affichée (iconSize), leur position (iconAnchor) et le décalage de leur ancrage (popupAnchor)
     var LeafIcon = L.Icon.extend({
          options: {
             //iconSize:     [25, 50],
             shadowSize:   [50, 64],
             iconAnchor:   [12, 40],
             shadowAnchor: [4, 62],
             popupAnchor:  [-3, -30]
          }
      });

      var LeafIconMin = L.Icon.extend({
           options: {
              iconSize:     [50, 64],
              popupAnchor:  [-2, -3]
            }
       });

      var incon = new LeafIcon({
          iconUrl: '/images/marker-icon.png'        // Icone bleu
      });
      var incon_Min = new LeafIconMin({
          iconUrl: '/images/marker-icon-invisible.png'        // Icone bleu invisible
      });
      var dicon = new LeafIcon({
          iconUrl: '/images/marker-icon-début.png'  // Icone vert du début
      });
      var ficon = new LeafIcon({
          iconUrl: '/images/marker-icon-fin.png'    // Icone rouge de fin
      });

      //   Début   \\
      if (ville == 0) {
        // console.log("Ville", city[ville].date, city[ville].lat);
        var d_marker = new L.marker([city[ville].lat, city[ville].lon, city[ville].alt], {icon: dicon}).addTo(macarte);//.bindPopup(`<b> ${ville} <b><br>Lattitude: ${city[ville].lat} <br>Longitude: ${city[ville].lon} <br>Altitude: ${city[ville].alt} MAMSL`);
        // Nous ajoutons la popup. A noter que son contenu (ici la variable ville) peut être du HTML
        d_marker.bindPopup(`<b>Coordonnées:</b> ${ville} <br><b>Date: </b>${city[ville].date} <br><b>Lattitude: </b>${city[ville].lat} <br><b>Longitude: </b>${city[ville].lon} <br><b>Altitude: </b>${city[ville].alt} MAMSL`);
      }
      //   Fin   \\
      if (ville == tabGPS.length-1) {
        var f_marker = new L.marker([city[ville].lat, city[ville].lon, city[ville].alt], {icon: ficon}).addTo(macarte);
        f_marker.bindPopup(`<b>Coordonnées:</b> ${ville} <br><b>Date: </b>${city[ville].date} <br><b>Lattitude: </b>${city[ville].lat} <br><b>Longitude: </b>${city[ville].lon} <br><b>Altitude: </b>${city[ville].alt} MAMSL`);
      }
      //   Centre   \\
      if (ville != 0 && ville != tabGPS.length-1) {
        if (true) {
          var marker_Min = new L.marker([city[ville].lat, city[ville].lon, city[ville].alt], {icon: incon_Min}).addTo(macarte);
          marker_Min.bindPopup(`<b>Coordonnées:</b> ${ville} <br><b>Date: </b>${city[ville].date} <br><b>Lattitude: </b>${city[ville].lat} <br><b>Longitude: </b>${city[ville].lon} <br><b>Altitude: </b>${city[ville].alt} MAMSL`);
        } else {
          var marker = new L.marker([city[ville].lat, city[ville].lon, city[ville].alt], {icon: incon}).addTo(macarte);
          marker.bindPopup(`<b>Coordonnées:</b> ${ville} <br><b>Date: </b>${city[ville].date} <br><b>Lattitude: </b>${city[ville].lat} <br><b>Longitude: </b>${city[ville].lon} <br><b>Altitude: </b>${city[ville].alt} MAMSL`);
        }
      }

      // console.log("ville :", ville);
      // console.log("tabGPS.length-1 :", tabGPS.length-1);
      // console.log("tabGPS.length :", tabGPS.length);

  }
   macarte.addLayer(markerClusters);
}
window.onload = function(){
// Fonction d'initialisation qui s'exécute lorsque le DOM est chargé

  initMap();
  console.log();
};
