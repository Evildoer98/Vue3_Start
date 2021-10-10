import { isObject } from '@vue/shared'
// 数据响应
export function reactive (target) {
    // isObject 为 @vue/shared 里实现的方法
    // 1. 不是 object 类型就不做 Proxy 代理
    if (!isObject(target)) return target
    // 2. 使用 Proxy
    const proxy = new Proxy(target, {
        // target: 目标对象。key: 被获取的属性名。
        // receiver: Proxy 或者继续 Proxy 的对象
        get: function (target, key, receiver) {
            // 使用 Reflect (反射) 进行取值
            const res = Reflect.get(target, key, receiver)
            // 如果取得的是一个对象，则该对象进行代理
            // vue2 是一开始就递归，而 vue3 则是在取值时会进行代理，一种懒加载模式
            if (isObject(res)) return reactive(res)
            return res
        },
        set: function (target, key, value, receiver) {
            const result = Reflect.set(target, key, value, receiver)
            return result
        }
    })
    // 返回 proxy
    return proxy
}

// 第一层为数据响应
export function shallowReactive (target) {
    // 1. 不是 isObject 类型就不做 Proxy 代理
    if (!isObject(target)) return target

    // 2. 使用 Proxy
    const proxy = new Proxy（target, {
        // target: 目标对象
        // key: 被获取的属性名
        // receiver: Proxy 或者 继承 Proxy 的对象
        get: function (target, key, receiver) {
            // 使用 Reflect (反射) 进行取值
            const res = Reflect.get(target, key, receiver)
            return res
        },
        set: function (target, key, value, receiver) {
            const result = Reflect.set(target, key, value, receiver)
            return result
        }
    })
    return proxy
}

// 仅读数据
export function readonly() {

}

// 第一层仅读
export function shallowReadonly() {

}

// 柯里化
function createProxyHandler(target, baseHandlers) {
    // 1. 不是 object 类型就不做 Proxy 代理
    if (!isObject(target)) return target
    // 2. 数据拦截功能提取出来
    const proxy = new Proxy(target, baseHandlers)
    return proxy
}

// export {
//     reactive,
//     shallowReactive,
//     readonly,
//     shallowReadonly
// }