const geolib = require('geolib')

const totreasure = geolib.getCompassDirection({latitude: 64.0678673, longitude: -21.9339845},
  {latitude: 64.0678602, longitude: -21.9339904});

  console.log(totreasure)