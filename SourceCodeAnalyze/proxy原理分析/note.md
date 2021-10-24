<!--
 * @Descripttion: 
 * @version: 
 * @Author: Evildoer98
 * @Date: 2021-10-24 12:58:22
 * @LastEditors: Evildoer98
 * @LastEditTime: 2021-10-24 13:22:40
-->


# 与 Vue2 的差异
* 本质上是基于 Proxy 和机遇 Object.defineProperty 之间的差异
1. eg: 
    ```vue
        <template>
            {{obj.c}}
        </template>

        <script>
            data: {
                obj: {a: 1}
            },
            mounted () {
                this.obj.c = 3
            } 
        </script>
    ```
    * 对 obj 上原本不存在的 c 属性进行了一个赋值，但是在 Vue2 中，这是不会触发视图的响应式更新的，因为 Object.defineProperty 必须对于确定的 key 值进行响应式的定义
    * 这就导致了在 data 初始化的时候没有 c 属性，那么后续对于 c 属性的赋值都不会触发 Object.defineProperty 中对于 set 的劫持
    * Vue2 中，这种只能用一个额外的 api Vue.set 

# Proxy
```js
    const raw = {}
    const data = new Proxy(raw, {
        get(target, key) {},
        set(target, key) {}
    })
```
* 在 Proxy 定义的时候并不用关心 key 值，只要定义了 get 方法，那么后续对于 data 上任何属性的访问，都会触发 get 到劫持，set 同样

# 实现 Proxy 
## 思路
1. 定义某个数据为 响应式数据，它会拥有收集访问它的函数 的能力
2. 定义观察函数，在这个函数内部去访问 响应式数据，访问到响应式数据的某个 key 的时候，会建立一个依赖关系 key -> reaction 观察函数
3. 检测到 响应式数据 的 key 的值更新的时候，会去重新执行一遍它所收集的所有 reaction 观察函数
```js
    // 响应式数据
    const counter = observable ({ num: 0})

    // 观察函数
    observe( () => console.log(counter.num))
```
* 用 observable 包裹的数据叫做响应式数据
* 在 observe 内部执行的函数叫 观察函数

### 定义时
* observable({ num: 0})，会让 {num: 0} 这个普遍的对象编程一个 proxy，而后续对于这个 proxy 所有的 get、set 等操作都会被内部拦截下来

### 访问时
1. observe 函数会先开启一个 开始观察 的开关，然后去执行 console.log(counter.num)，执行到 counter.num 的时候
2. 注册在 counter 这个 proxy 的 get 拦截到了对于 counter.num 的访问
3. 可以知道访问者是 () => console.log(counter.num) 这个函数
4. 那么这个函数作为 num 这个 key 值到观察函数收集在一个地方

### 修改时
* 下次对于 counter.num 修改的时候，会去找 num 这个 key 下所有的 观察函数，轮流执行一遍

# reactive 的实现（定义响应式数据）
```js
    // 需要定义响应式的原值
    export type Raw = object
    // 定义成响应式后的 proxy
    export type ReactiveProxy = object

    // 用来存储原始值和响应式 proxy 的映射
    export const proxyToRaw = new WeakMap<ReactiveProxy, Raw>()

    // 用来存储响应式 proxy 和 原始值的映射
    export const rawToProxy = new WeakMap<Raw, ReactiveProxy>()

    



```
