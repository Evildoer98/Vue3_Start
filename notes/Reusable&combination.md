# 可复用 & 组合

## 组合式 API

### 组合式 API 基础
1. setup 组件选项
  1. 新的 setup 选项在组件创建之前执行，一旦 props 被解析，就将作为组合式 API 的入口
  * WARNING: 
    1. 在 setup 中避免使用 this，因为它不会找不到组件实例
    2. setup 的调用发生在 data property、computed property 或 methods 被解析之前，所以它们无法在 setup 中被获取
  2. setup 选项是一个接收 props 和 context 的函数
  3. 将 setup 返回的所有内容都暴露给组件的其余部分（计算属性、方法、生命周期钩子等）以及组件的模版

  * eg: 
  ```vue
  <script lang='ts'>
  // useComponents.vue
    export default {
      components: { A, B},
      props: {
        user: {
          type: String,
          flag: true
        }
      },
      setup(props) {
        console.log(props) // {user: ''}
        return {}  // 这里返回的任何内容都可以用于组件的其余部分
      }
      // 组件的“其余部分”
    }
  </script>
  ```
  ```vue
  <script lang='ts'>
    export default {
      
    }
  </script>
  ```

### Setup
1. 参数
  * 使用 setup 函数时，它将接收两个参数
    1. props
    2. context
  1. Props:
    * setup 函数中的第一个参数时 props。setup 函数中的 props 是响应式的，当传入新的 prop 时，它将被更新
    ```vue
      <script>
        export default {
          props: {
            title: String,
          },
          setup(props) {
            console.log(props.title)
          }
        }
      </script>
    ```
    * WARNING: 因为 props 响应式，但是不能使用 ES6 解构，它会消除 prop 的响应性
    1. 如果需要 prop，可以在 setup 函数中使用 toRefs 函数来完成
      ```vue
        <script>
          import { toRefs } from 'vue'
          setup(props) {
            const { title } = toRefs(props)
            console.log(title.value)
          }
        </script>
      ```
