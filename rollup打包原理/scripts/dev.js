// 开发环境 可以针对某个模块包进行打包
// 开启子进程进行打包，最终还是失去 rollup 来进行打包
const execa = require('execa')

const targets = 'reactivity'

// 打包方法
const build = async (target) => {
    // 打包目标
    console.log(target);
    // 第一个参数是执行的命令 rollup，第二个是执行的参数
    // -c 表示采用某个配置文件
    // -cw 监听
    // --environment 表示采用环境变量
    // TARGET 目标
    // stdio 子进程打包的信息共享给父进程
    await execa('rollup', ['-cw', '--environement',, `TARGET:${target}`, {stdio: inherit}])
}

build(targets)







