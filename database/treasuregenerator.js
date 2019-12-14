const { query } = require('./db')
async function generateTreasures(centerLong, centerLat, radius, numPoints) {

  let points = []
  for (i = 0; i < numPoints; i++) {
    const u = Math.random()
    const v = Math.random()

    const r = radius / 111300

    const w = r * Math.sqrt(u)
    const t = 2 * Math.PI * v
    const x = w * Math.cos(t)
    const y = w * Math.sin(t)

    const x_ = x / Math.cos(y)
    points.push([centerLong + x, centerLat + y, 100])
    console.log(centerLong + x + ',' + (centerLat + y));
  }
  let values = ''
  let counter = 0
  points.forEach(point => {
    if (counter === points.length - 1) {
      values = values.concat(`(${point[0]}, ${point[1]}, ${point[2]})`)
    } else {
      values = values.concat(`(${point[0]}, ${point[1]}, ${point[2]}),`)
    }
    counter += 1
  });

  await query(`INSERT INTO treasures (longitude, latitude, amount) VALUES ${values}`)

}
module.exports = () => generateTreasures(64.131701, -21.888069, 10000, 5000)
//generateTreasures(64.067813, -21.934031, 40000, 100)