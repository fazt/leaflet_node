function onDocumentReady() {
  var socket = io.connect(window.location.href);

  var map = L.map('myMap', {
    center: [0, -23],
    zoom: 3
  });

  // var tiles = L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png?{foo}', {foo: 'bar'}).addTo(map);
  var tiles = L.tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png');
  // var tiles = L.tileLayer('http://a.tile.stamen.com/toner/{z}/{x}/{y}.png');

  // var marker = L.marker([50.5,30.5]);

  map.addLayer(tiles);
  // map.addLayer(marker);

  map.locate({
    enableHighAccuracy: false
  });

  map.on('locationfound',onLocationFound);
  function onLocationFound(position) {
    console.log(position);
    var myCoords = position.latlng;
    var marker = L.marker([myCoords.lat,myCoords.lng]);
    map.addLayer(marker);
    marker.bindPopup('Estas aqui');//.openPopup();
    socket.emit('coords:me',{latlng:myCoords});
  }
  map.on('locationerror',function(error) {
    console.log(error);
  });

  socket.on('coords:users',onReceiveData);
  function onReceiveData(data) {
    console.log(data);
    var marker = L.marker([data.lat,data.lng]);
    map.addLayer(marker);
  }
}

$(document).ready(onDocumentReady);
