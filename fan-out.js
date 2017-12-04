
const fan_out = function(mbtiles, dir) {
}

if(process.argv.length == 4) {
  fan_out(process.argv[2], process.argv[3])
} else {
  console.log("usage: node fan-out {tiles.mbtiles} {tiles}")
}
