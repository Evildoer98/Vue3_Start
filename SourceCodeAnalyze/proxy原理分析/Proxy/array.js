/*
 * @Descripttion: 
 * @version: 
 * @Author: Evildoer98
 * @Date: 2021-10-28 22:52:29
 * @LastEditors: Evildoer98
 * @LastEditTime: 2021-10-28 22:52:29
 */

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

