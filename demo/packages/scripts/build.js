// 生产环境 打包所有
const fs = require('fs')

// 同步读取 packages 目录下的文件
const targets = fs.readdirSync('packages').filter (f => {
    // 过滤出需要打包的文件
    // 保留文件夹，剔除掉文件
    if (!fs.statSync(`packages/${f}`))
})

