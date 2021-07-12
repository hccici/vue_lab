const path = require('path');//引入path模块
function resolve(dir) {
    return path.join(__dirname, dir)//path.join(__dirname)设置绝对路径
}
module.exports = {
    chainWebpack: (config) => {
        config.resolve.alias
            .set('@', resolve('src'))
            .set('@views', resolve('src/views'))
            .set('@components', resolve('src/components'))
        // set svg-sprite-loader 
        // 修改原来svg处理规则
        config.module
            .rule('svg')
            .exclude.add(resolve('src/icons'))
            .end()
        // 新增icons规则    
        config.module
            .rule('icons')
            .test(/\.svg$/)
            .include.add(resolve('src/icons'))
            .end()
            .use('svg-sprite-loader')
            .loader('svg-sprite-loader')
            .options({
                symbolId: 'icon-[name]'
            })
            .end()
    },
    devServer: {
        port: 9527,
    },
    pages: {
        index: 'src/main.js',
        other: 'src/othersPage/main.js'
    }
}