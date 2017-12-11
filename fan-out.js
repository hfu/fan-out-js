const fs = require('fs-extra')
const sqlite3 = require('sqlite3').verbose()
const zlib = require('zlib')

const run = function(mbtiles, dir) {
  console.log(mbtiles)
  const db = new sqlite3.Database(mbtiles, sqlite3.OPEN_READONLY, err => {
    if(err) {
      console.error(err)
      return
    }
  })
  db.each("SELECT * FROM tiles", (err, r) => {
    if(err) {
      console.error(err)
      return
    }
    console.log({
      z: r.zoom_level,
      x: r.tile_column,
      y: (1 << r.zoom_level) - r.tile_row - 1,
      zbuf: r.tile_data
    })
  })
  db.close
}
/*
    buf = zlib.unzip(r.tile_data, (err, buf) => {
      if(err) {
        console.error(err)
	return
      }
      return buf
    })
    path = `${dir}/${z}/${x}`
    fs.mkdirsSync(path)
    path = `${path}/${y}.mvt`
    fs.writeFile(path, buf)
    console.log(`writing ${path}`)
  })
*/

if(process.argv.length == 4) {
  run(process.argv[2], process.argv[3])
} else {
  console.log("usage: node fan-out {tiles.mbtiles} {tiles}")
}
