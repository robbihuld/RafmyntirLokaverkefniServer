const geolib = require('geolib')

const totreasure = geolib.getCompassDirection({latitude: 64.0678681, longitude: -21.9339994},
  {latitude: 64.0678211, longitude: -21.9344043});

  console.log(totreasure)