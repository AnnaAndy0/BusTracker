
mapboxgl.accessToken = "pk.eyJ1IjoiYW5uYWFuZHkwIiwiYSI6ImNrb2xwNGlqczAxOW0ybm12NjBkMnVuY2QifQ.AWKZ4MSBRXtHXTl7y5vYpQ";
let markArray = [];

function moveMarkers(locations) {
  for(let i = 0; i < markArray.length; i++){
    markArray[i].setLngLat(locations[i]);
  }
}
async function markers() {
    let locations = await getBusLocations();
    let i = 0;
    locations.forEach(() => {
      let markerEl = document.createElement("div");
      markerEl.id = `marker${i}`;
      markerEl.className = "marker";
      let markersDiv = document.getElementById("markers");
      markersDiv.appendChild(markerEl);
      let marker = new mapboxgl.Marker(markerEl)
          .setLngLat(locations[i])
          .addTo(map);
        markArray.push(marker);
        i++;
        console.log(markerEl);
    });
      }
  markers();
  
  function checkForNewBuses(locations) {
    if(markArray.length !== locations.length){
      location.reload;
      } else {
      return;
    }
  }

async function run(){
    const locations = await getBusLocations();
  checkForNewBuses(locations);
  moveMarkers(locations);
    setTimeout(run, 15000);
}

async function getBusLocations(){
  const url = 'https://api-v3.mbta.com/vehicles?filter[route]=1&include=trip';
    const response = await fetch(url);
    const json     = await response.json();
    const data = await json.data;
    let currentLocations = [];
    await data.forEach((item) => {
      currentLocations.push([item.attributes.longitude, item.attributes.latitude]);
    });
    return currentLocations;
}


window.onload = (event) => {
  run();
};

geojson.features.forEach(function(marker) {

    
    var el = document.createElement('div');
    el.className = 'marker';
  

    new mapboxgl.Marker(el)
      .setLngLat(marker.geometry.coordinates)
      .addTo(map);
  });