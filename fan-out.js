const fs = require('fs-extra')
const sqlite3 = require('sqlite3').verbose()
const zlib = require('zlib')

const fan_out = function(mbtiles, dir) {
  const db = new sqlite3.Database(mbtiles, sqlite3.OPEN_READONLY, err => {
    if(err) {
      console.error(err)
      return
    }
  })
  let z, x, y, data, path
  db.each("SELECT * FROM tiles", (err, r) => {
    if(err) {
      console.error(err)
      return
    }
    z = r.zoom_level
    x = r.tile_column
    y = (1 << z) - r.tile_row - 1
    zlib.unzip(r.tile_data, (err, buf) => {
      if(err) {
        console.error(err)
	return
      }
      path = `${dir}/${z}/${x}`
      fs.mkdirsSync(path)
      path = `${path}/${y}.mvt`
      fs.writeFileSync(path, buf)
      console.log(`writing ${path}`)
    })
  })
  db.close
}

if(process.argv.length == 4) {
  fan_out(process.argv[2], process.argv[3])
} else {
  console.log("usage: node fan-out {tiles.mbtiles} {tiles}")
}
