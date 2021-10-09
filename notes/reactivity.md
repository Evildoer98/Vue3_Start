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
    简易的 Proxy，在其中 handleCallback 中写了 set、get 两个方法，又来拦截当前属性值变化的数据监听

    在对值进行赋值修改和打印的时候，分别触发了当前的 set 和 get 方法

# Reflect
    Reflect 并不是一个类，是一个内置的对象。不能直接实例化（new）使用，它的功能比较和 Proxy 的 handles 有点类似，在这一点的基础上又添加了很多 Object 方法

# 原理
@vue/reactivity 的依赖收集（track）和触发更新（trigger），以及副作用（effect）
## reactive 
reactive 是 vue3 中用于生成引用类型的 api
```javascript
    const user = reactive({
        name: 'Evildoer',
        age: 23,
        desc: '前端开发者'
    })
```
在内部，对传入的对象进行了一个 target 的只读判断，如果传入的 target 是一个只读代理的话，会直接返回掉。对于正常的 reactivity 的话则是返回了 createReactiveObject 的方法的值

## createReactiveObject
在 createReactiveObject 中，做的事情就是为 target 添加一个 proxy 代理。
核心：reactive 最终拿到的是一个 proxy 代理。
1. 首先先判断当前 target 的类型，如果不符合要求，直接抛出警告并且返回原来的值
```typescript
    if (!isObject(target)) {
        if (__DEV__) {
            console.warn(`value cannot be made reactive: ${String(target)}`)
        }
    }
```
2. 其次判断当前对象是否已经被代理且并不是只读的，那么本身就是一个代理对象，那么就没有必要去进行代理了，直接将其当作返回值返回，避免重复代码
```typescript
    if (target[ReactiveFlags.RAW] && !(isReadonly && target[ReactiveFlags.IS_REACTIVE])) {
        return target
    }
```
3. createReactiveObject 创建 target 的 proxy，并将其放到 Map 中记录
```typescript
    const proxy = new Proxy(
        target,
        targetType === TargetType.COLLECTION ? collectionHandlers: baseHandlers
    )
    proxyMap.set(target, proxy)
    return proxy
```
