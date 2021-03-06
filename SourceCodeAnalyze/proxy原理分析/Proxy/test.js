/*
 * @Descripttion: 
 * @version: 
 * @Author: Evildoer98
 * @Date: 2021-10-24 19:04:58
 * @LastEditors: Evildoer98
 * @LastEditTime: 2021-10-28 22:52:41
 */

/**
 * defineProperty  劫持数据 -> 给对象进行拓展 -> 属性进行设置
 * var obj = {}
 * 
 * defineProperty(obj, '属性名', {} )
 */


// Proxy ES6 构造函数
// function Proxy () {
    
// }

// let proxy = new Proxy(target, handler)
// target 目标对象  需要处理的对象
// handler 容器  装载无数可以处理对象属性的方法

// 自定义对象属性的获取、赋值、枚举、函数调用的等功能

var target = {
    a: 1,
    b: 2
}
let proxy = new Proxy(target, {
    get (target, prop) {
        console.log('this is property value ' + target[prop]);
        return 'this is property value' + target[prop]
    },
    set (target, prop, value) {
        target[prop] = value
        console.log(target[prop]);
    }
})

console.log(proxy.a);
console.log(target.a);
proxy.b = 3
console.log(proxy);
console.log(target);



