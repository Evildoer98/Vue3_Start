import {Targaet } from './reactive'
const get = createGetter ()
const shallowGet = createGetter (true)
const set = createSetter ()
const shallowSet = createSetter(true)

// 1. 创建数据拦截
// reactive 对应的数据拦截
export const mutableHandlers = {
    get,
    set
}

export const shallowReactiveHandlers = {
    get: shallowGet,
    shallowSet
}

// 创建 get 的拦截方法
function createGetter(isShallow = false) {
    return function get (target, key, receiver) {
        // target 目标对象
        // key 被获取的属性名
        // receiver Proxy 或者继承 Proxy 的对象
        // 使用 Reflect （反射）进行取值
        const res = Reflect.get(target, key, receiver)
        // 如果是浅代理，这不对下一层进行代理
        if (isShallow) return res
        // 如果取得是一个对象，则对该对象进行代理
        // vue2 是一开始就递归，vue3 取值是进行代理，一种懒代理模式
        if (isObject(res)) return reactive(res)
            return res
    }
}

function createSetter(isShallow = false ) {
    return function set (target, key, value, receiver) {
        const result = Reflect.set(target, key, value,receiver)
        return result
    }
}