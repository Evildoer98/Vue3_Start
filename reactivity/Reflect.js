const user = {
    name: 'Evildoer',
    age: 23,
    desc: '前端开发者'
}

console.log('change age before', Reflect.get(user, 'age'));

const hasChange = Reflect.set(user, 'age', 24);
console.log('set user age is dome?', hasChange? 'yse': 'no');

console.log('change age after', Reflect.get(user, 'age'));

const hasDelete = Reflect.deleteProperty(user, 'age');

console.log('delete user age is done?', hasDelete? 'yes': 'none');

console.log('delete age after', Reflect.get(user, 'age'));


/**
 * change age before 23
 * Reflect.js:10 set user age is dome? yse
 * Reflect.js:12 change age after 24
 * Reflect.js:16 delete user age is done? yes
 * Reflect.js:18 delete age after undefined
 */

