function MyProxy (target, handler) {

  let _target = deepClone(target)
  Object.keys(_target).forEach((key) => {
    Object.defineProperty(_target, key, {
      get () {
        return handler.get && handler.get(target,key)
      },
      set (newVal) {
        handler.set && handler.set(target, key, newVal)
      }
    })
  })
  return _target

  // 深拷贝
  function deepClone (org, tar) {
    var tar = tar || {}
    toStr = Object.prototype.toString
    arrType = '[object Array]'

    for (var key in org) {
      if (org.hasOwnProperty(key)) {
        if (typeof(org[key] === 'object' && org[key] !== null)) {
          // if (toStr.call(org[key]) === arrType) {
          //   tar[key] = []
          // } else {
          //   tar[key] = {}
          // }
          tar[key] = toStr.call(org[key] === arrType ? [] : {})
          deepClone(org[key], tar[key])
        } else {
          tar[key] = org[key]
        }
      }
    }
    return tar
  }
}


let target = {
  a: 1,
  b: 2
}


// let proxy = new MyProxy(target, {
//   get (target, prop) {
//     return 'GET:' + prop + ' = ' + target[prop]
//   },

//   set (target, prop, value) {
//     target[prop] = value
//     console.log('SET:' + prop + ' = ' + value);
//   }

// })

// console.log(proxy.a);

// proxy.b = 4
// console.log(proxy.b);


let proxy = new Proxy(target, {
  get (target, prop) {
    return 'GET:' + prop + ' = ' + target[prop]
  },

  set (target, prop, value) {
    target[prop] = value
    console.log('SET:' + prop + ' = ' + value);
  },
   
  has (target, prop) {
    console.log(target[prop]);
  }

})

console.log(proxy);
console.log('a' in proxy);


