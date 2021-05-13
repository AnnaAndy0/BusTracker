const busStops = [
    [-78.820153, 42.954389],
    [-78.838361, 42.939819],
    [-78.856843, 42.922399],
    [-78.862471, 42.917108],
    [-78.865903, 42.911669],
    [-78.867832, 42.904448],
    [-78.883011, 42.880909],
  ];
  
  mapboxgl.accessToken =
  'pk.eyJ1IjoiYW5uYWFuZHkwIiwiYSI6ImNrb241dHduZTExbHIyd283cW00ZWtncXoifQ.E-OPRe5wUBpYd1TTG_xJWg';
  
  
    let map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/mapbox/streets-v11',
    center: [-78.862471, 42.917108],
    zoom: 12,
  });
  
  let marker = new mapboxgl.Marker().setLngLat([-78.820153, 42.954389]).addTo(map);
  
  var geojson = {
      type: 'FeatureCollection',
      features: [{
        type: 'Feature',
        geometry: {
          type: 'Point',
          coordinates: [-78.820153, 42.954389]
        },
        properties: {
          title: 'Mapbox',
          description: 'University at Buffalo'
        }
      },
      {
        type: 'Feature',
        geometry: {
          type: 'Point',
          coordinates: [-78.883011, 42.880909]
        },
        properties: {
          title: 'Mapbox',
          description: 'Downtown Buffalo'
        }
      }]
    };
  
  geojson.features.forEach(function(marker) {
  
      var el = document.createElement('div');
      el.className = 'marker';
    
      new mapboxgl.Marker(el)
        .setLngLat(marker.geometry.coordinates)
        .addTo(map);
    });
  
  let counter = 0;
  function move() {
    setTimeout(() => {
      if (counter >= busStops.length) return;
      marker.setLngLat(busStops[counter]);
      counter++;
      move();
    }, 720000);
  }
  
  
  if (typeof module !== 'undefined') {
    module.exports = { move, counter, marker, busStops };
  }
  
