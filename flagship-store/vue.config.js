const {defineConfig} = require('@vue/cli-service')
module.exports = defineConfig({
    transpileDependencies: true,
    lintOnSave:false,
    chainWebpack: config => {
        config.plugin('html').tap(args => {
            args[0].title = '旗舰店'
            return args
        })
    },

})
