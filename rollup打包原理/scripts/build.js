// 生产环境 打包所有
const fs = require('fs')
// 开启子进程进行打包，最终还是失去 rollup 来进行打包
const execa = require('execa')


// 同步读取 packages 目录下的文件
const targets = fs.readdirSync('packages').filter (f => {
    // 过滤出需要打包的文件
    // 保留文件夹，剔除掉文件
    if (!fs.statSync(`packages/${f}`)) {
        return false
    }
    return true
})

// 打包方法
const build = async (target) => {
    // 打包目标
    console.log(target);
    // 第一个参数是执行的命令 rollup，第二个是执行的参数
    // -c 表示采用某个配置文件
    // --environment 表示采用环境变量
    // TARGET 目标
    // stdio 子进程打包的信息共享给父进程
    await execa('rollup', ['-c', '--environement',, `TARGET:${target}`], {stdio: 'inherit'})
}

// 对多个目标打包的方法
const runParallel = (targets, iteratorFn) => {
    const res = []
    for (const item of targets) {
        const p = iteratorFn(item)
        res.push(p)
    }
    return Promise.all(res)
}

// 对目标目录依次进行打包，并行打包
runParallel(targets, build)

// runParallel(targets, build).then (() => {
//     console.log('所有的包已经打包完毕');
// })







