let arr = [
  {name: '小明', age: 18},
  {name: '小红', age: 28},
  {name: '小青', age: 38},
  {name: '小橙', age: 48},
  {name: '小黄', age: 58},
  {name: '小绿', age: 68}
]

let persons = new Proxy (arr, {
  get (arr, prop) {
    return arr[prop]
  },

  set (arr, prop, value) {
    arr[prop] = value
  }
})

console.log(persons[0]);

persons[1] = {name: 'hello', age: 12}
console.log(persons);
console.log(persons[1]);
