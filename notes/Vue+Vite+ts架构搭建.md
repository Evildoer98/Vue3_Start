# 技术栈
编程语言：TypeScript 4.x + JavaScript
构建工具：Vite 2.x
前端框架：Vue 3.x
路由工具：Vue Router 4.x
状态管理：Vuex 4.x
UI 框架：Element Plus
CSS 预编译：Stylus / Sass / Less
HTTP 工具：Axios
Git Hook 工具：husky + lint-staged
代码规范：EditorConfig + Prettier + ESLint + Airbnb JavaScript Style Guide
提交规范：Commitizen + Commitlint
单元测试：vue-test-utils + jest + vue-jest + ts-jest
自动部署：GitHub Actions

# 使用 Vite 构建工具，需要 Node.js 版本 >= 12.0.0
    查看 Node.js 版本：node -v
    建议将 Node.js 升级到最新的稳定版本：nvm install stable

# 使用 Vite 快速初始化项目雏形
* 使用 npm 
    npm init @vitejs/app
* 使用 yarn
    yarn create @vitejs/app

1. 输入项目名称
2. 选择模版
3. 安装依赖 npm install
4. 启动项目 npm run dev

# 修改 Vite 配置文件
Vite 配置文件 vite.config.ts 位于根目录下，项目启动时会自动读取。

本项目先做一些简单配置，例如：设置 @ 指向 src 目录、 服务启动端口、打包路径、代理等。

# 规范目录结构
├── publish/
└── src/
    ├── assets/                    // 静态资源目录
    ├── common/                    // 通用类库目录
    ├── components/                // 公共组件目录
    ├── router/                    // 路由配置目录
    ├── store/                     // 状态管理目录
    ├── style/                     // 通用 CSS 目录
    ├── utils/                     // 工具函数目录
    ├── views/                     // 页面组件目录
    ├── App.vue
    ├── main.ts
    ├── shims-vue.d.ts
├── tests/                         // 单元测试目录
├── index.html
├── tsconfig.json                  // TypeScript 配置文件
├── vite.config.ts                 // Vite 配置文件
└── package.json

# 集成路由工具 Vue Router
1. 安装支持 Vue3 的路由工具 vue-router@4
    npm install vue-router@4 
2. 创建 src/router/index.ts 文件
    在 src 下创建 router 目录，然后在 router 目录里新建 index.ts 文件：
        └── src/
            ├── router/
                ├── index.ts  // 路由配置文件
    根据本项目路由配置的实际情况，你需要在 src 下创建 views 目录，用来存储页面组件。

    在 views 目录下创建 home.vue 、vuex.vue 、axios.vue。
3. 在 main.ts 文件中挂载路由配置

# 集成状态管理工具 Vuex
1. 安装支持 Vue3 的状态管理工具 vuex@next
    npm i vuex@next
2. 创建 src/store/index.ts 文件
    在 src 下创建 store 目录，然后在 store 目录里新建 index.ts 文件：
        └── src/
            ├── store/
                ├── index.ts  // store 配置文件
3. 在 main.ts 文件中挂载 Vuex 配置

# 集成 UI 框架 Element Plus
1. 安装支持 Vue3 的 UI 框架 Element Plus
    npm i element-plus
2. 在 main.ts 文件中挂载 Element Plus

# 集成 HTTP 工具 Axios
1. 安装 Axioa
    npm install axios
2. 配置 Axios
    为了使项目的目录结构合理且规范，我们在 src 下创建 utils 目录来存储我们常用的工具函数。
    Axios 作为 HTTP 工具，我们在 utils 目录下创建 axios.ts 作为 Axios 配置文件：
        └── src/
            ├── utils/
                ├── axios.ts  // Axios 配置文件
3. 使用 Axios
    在需要使用 Axios 文件里，引入 Axios 配置文件
    ```vue
        <template></template>
        <script lang="ts">
        import { defineComponent } from 'vue'
        import axios from '../utils/axios'

        export default defineComponent({
            setup() {
            axios
                .get('/users/XPoet')
                .then((res) => {
                console.log('res: ', res)
                })
                .catch((err) => {
                console.log('err: ', err)
                })
            }
        })
        </script>
    ```










