const fs = require('fs-extra')
const sqlite3 = require('sqlite3')
const zlib = require('zlib')

const fan_out = function(mbtiles, dir) {
  const db = sqlite3.Database(mbtiles, sqlite3.OPEN_READONLY, (err, db) => {
    if(!err) {
      console.log(db)
    } else {
      console.error(err)
    }
  })
}

if(process.argv.length == 4) {
  fan_out(process.argv[2], process.argv[3])
} else {
  console.log("usage: node fan-out {tiles.mbtiles} {tiles}")
}
