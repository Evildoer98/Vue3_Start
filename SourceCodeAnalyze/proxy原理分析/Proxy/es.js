/**
 * es 内置方法
 */

var obj = {a: 1, b: 2}

// 1. 获取原型 [[GetPrototypeOf]]
var proto = Object.getPrototypeOf(obj)
console.log(proto);
console.log(obj.__proto__);
console.log(Object.prototype);


// 2. 设置原型 [[SetPrototypeOf]]
Object.setPrototypeOf(obj, {c: 3, d: 4})
console.log(obj);
obj.__proto__ = {c: 3, d: 4}
console.log(obj);


// 3. 获取对象的可拓展性 [[IsExtensible]]
var extensible = Object.isExtensible(obj)
console.log(extensible);

Object.freeze(obj)  // 冻结对象
var newExtensible = Object.isExtensible(obj)
console.log(newExtensible);

Object.seal(obj)  // 封闭对象
obj.c = 3  // 不可修改的  
console.log(obj);  // {a: 1, b: 2}
delete obj.a // 不可删除的
console.log(obj); // {a: 1, b: 2}
obj.b = 3  // 可写的
console.log(obj); // {a: 1, b: 3}
for (var key in obj) {  // 可读的 （枚举）
  console.log(obj[key]);  // 1, 3
}


Object.freeze(obj) // 冻结对象
obj.c = 3  // 不可修改的  
console.log(obj);  // {a: 1, b: 2}
delete obj.a // 不可删除的
console.log(obj); // {a: 1, b: 2}
obj.b = 3  // 不可写的
console.log(obj); // {a: 1, b: 2}
for (var key in obj) {  // 可读的 （枚举）
  console.log(obj[key]);  // 1, 2
}


// 4. 获取自有属性 [[GetOwnProperty]]
Object.setPrototypeOf(obj, {c: 3, d: 4})
console.log(Object.getOwnPropertyNames(obj)); // 获取描述符  // ['a', 'b']


// 5. 禁止拓展对象 [[PreventExtensions]]
Object.preventExtensions(obj)  
obj.c = 3  // 禁止增加属性
console.log(obj);
delete obj.a   // 可删除属性
console.log(obj); // {b: 2}


// 6. 拦截对象操作 [[DefineOwnProperty]]
Object.defineProperty()


// 7. 判断是否自身属性 [[hasProperty]]
console.log(obj.hasOwnProperty('a'));


// 8. [[GET]]
console.log('a' in obj);
console.log(obj.a);


// 9. [[SET]]
obj.a = 3
obj['b'] = 4
console.log(obj);


// 10. [[Delete]]
delete obj.a
console.log(obj);


// 11. [[Enumerate]]
for (var k in obj) {
  console.log(obj[k]);
}


// 12. 获取键集合 [[OwnPropertyKeys]]
console.log(Object.keys(obj));
Object.setPrototypeOf(obj, {c: 3, d: 4})
console.log(Object.keys(obj)); // {a: 1, b: 2}


// 13. function
function test () {}  test()

function test () {}  test.call/apply    Object

obj.test = function () {}  obj.test()

function Test () {}  new Test()



