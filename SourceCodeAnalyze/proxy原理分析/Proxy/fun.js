let fn = function () {
  console.log('I,m a function');
}

fn.a = 123

let newFn = new Proxy(fn, {
  get (fn, prop) {
    return fn[prop] + ' this is a proxy return'
  }
})

console.log(newFn.a);