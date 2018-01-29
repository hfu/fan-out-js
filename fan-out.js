const fs = require('fs-extra')
const Database = require('better-sqlite3')
const zlib = require('zlib')

const report = function (c, count, path) {
  if (c === count || c % 1000 === 0) {
    console.log(`${c} of ${count} (${Math.round(c * 100.0 / count)}%) ${path}`)
  }
}
const run = function (mbtiles, dir) {
  const db = new Database(mbtiles, {readonly: true})
  const count = db.prepare('SELECT count(*) FROM tiles').get()['count(*)']
  let c = 0
  for (const r of db.prepare('SELECT * FROM tiles').iterate()) {
    const buf = zlib.unzipSync(r.tile_data)
    const z = r.zoom_level
    const x = r.tile_column
    const y = (1 << z) - r.tile_row - 1
    fs.mkdirsSync(`${dir}/${z}/${x}`)
    fs.writeFileSync(`${dir}/${z}/${x}/${y}.pbf`, buf)
    report(++c, count, `${dir}/${z}/${x}/${y}.pbf`)
  }
  db.close()
}

if (process.argv.length === 4) {
  run(process.argv[2], process.argv[3])
} else {
  console.log('usage: node fan-out {tiles.mbtiles} {tiles_dir}')
}
