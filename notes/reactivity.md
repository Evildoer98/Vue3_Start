# Vue 响应原理（reactivity）
1. getter/setter
    Object.defineProperty
```javascript
    var obj = {}
    obj.defineProperty(obj, prop, desc)
    /**
     * desc: 可选属性包括：
     *  enumerable: boolean （数据/存储描述符）定义该属性能否被for...in，Object.keys 等遍历出来
     * configurable: boolean (数据/存储描述符) 定义描述符是否可以改变，能否从对象上被删除
     * value: any (数据描述符) 该属性对应的值
     * writeable: boolean (数据描述符) 仅当 writeable 为 true 时，value 才能被改变
     * get: func (存储描述符) 访问该属性时，getter 方法会被执行，默认为 undefined
     * set: func (存储描述符) 当属性发生修改时回触发该方法，接受新的值作为唯一参数
     */
```

# Proxy
    在 @vue/reactivity中，Proxy 是整个调度的基石
    通过 Proxy 代理对象，才能够在 get、set 方法中完成后续的事情，eg：依赖收集、effect、track、trigger 等操作
    