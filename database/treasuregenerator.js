const random = require('random-location')

function generateTreasures(centerLong, centerLat, radius, numPoints){
 
   let points = []
  for(i=0; i<numPoints; i++){
    const u = Math.random()
    const v = Math.random()
  
    const r = radius/111300
  
    const w = r*Math.sqrt(u)
    const t = 2*Math.PI*v
    const x = w*Math.cos(t)
    const y = w*Math.sin(t)
  
    const x_ = x/Math.cos(y)
    points.push([centerLong + x_, centerLat + y])
    console.log(centerLong + x + ',' + (centerLat + y));
  }


}
generateTreasures(64.067813, -21.934031, 1000, 100)