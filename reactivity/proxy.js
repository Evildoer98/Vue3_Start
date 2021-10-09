const user = {
    name: 'Evildoer',
    age: 23,
    desc: '前端开发者'
}

const userProxy = new Proxy(user, {
    get(target, key) {
        console.log(`userProxy: 当前获取key为${key}`);
        if (target.hasOwnProperty(key)) {
            return target[key]
        }
        return {}
    },
    set(target, key, value) {
        console.log(`userProxy: 当前设置key为${key}, value为${value}`);
        let isWriteSuccess = false
        if (target.hasOwnProperty(key)) {
            target[key] = value
            isWriteSuccess = true
        }
        return isWriteSuccess
    }
})

console.log('myName', userProxy.name);
userProxy.age = 23

/**
 * userProxy: 当前获取key为name
 * proxy.js:26 myName Evildoer
 * proxy.js:9 userProxy: 当前获取key为age, value为23
 */