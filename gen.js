
const gen = function*() {
  for(let i = 0; i < 10; i++) {
    while(Math.random() < 0.01) {

    }
    yield i
  }
}()

/*
let iter = gen()

let r = iter.next()
do {
  console.log(r)
  r = iter.next()
} while(!r.done)
*/

for(const i of gen) {
  console.log(i)
}
