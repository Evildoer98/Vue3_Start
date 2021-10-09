console.log(process.env.TARGET, '---rollup');

// rollup 的配置
import path from 'path'

// 引入插件
import json from '@rollup/plugin-json'
import ts from 'rollup-plugin-typescript2'
import resolvePlugin from '@rollup/plugin-node-resolve'


// 根据环境变量中的 target 属性 获取对应模块中的 packages.json

// 1. 在当前目录下查找到 packages 文件夹
const packagesDir = path.resolve(__dirname, 'packages')

// 2. 找到要打包的对应的目标目录
const packageDir = path.resolve(packagesDir, process.env.TARGET)

// 封装出一个寻找对应包下的文件的方法
const resolve = p => path.resolve(packageDir, p)

// 3. 找到对应的包目录对应的 packages.json
const pkg = require(resolve('package.json'))

// 获取文件名
const name = path.basename(packageDir)

// 4. 对打包类型先做一个映射表，根据提供的 formats 来格式化需要打包的内容
// outputConfig 是根据对应的包的 package.json 的 buildOptions 配置的输出配置

const outputConfig  = {
    'esm-bundler': {
        file: resolve(`dist/${name}.esm-bundler.js`),
        format: 'es'
    },
    'cjs': {
        file: resolve(`dist/${name}.cjs.js`),
        format: 'cjs'
    },
    'global': {
        file: resolve(`dist/${name}.globar.js`),
        format: 'iife'  // 立即执行函数
    }
}

// 5. 对应包中的 package.json 的 buildOptions
const options = pkg.buildOptions

// 6. 创建出 rollup 配置
const createConfig = (format, output) => {
    output.name = options.name 
    // 看需求是否需要生成 sourcemap
    output.sourcemap = true
    // 生成 rollup 配置
    return {
        input: resolve(`src/index.ts`),   // 入口
        output,  // 出口
        plugins: [   // 插件    注意顺序
            json(),
            ts({
                tsconfig: path.resolve(__dirname, 'tsconfig.json')
            }),
            resolvePlugin()  // 解析第三方模版插件
        ]
    }
}

// 7. rollup 最终需要导出的配置
export default options.formats.map(format => createConfig(format, outputConfig[format]))

