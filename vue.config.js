module.exports = {
    devServer: {
        port: 9091,
        open: true,
        host: "localhost", //Network设置
        https: false,
        proxy: {    //开发环境代理配置
            [process.env.VUE_APP_API_BASE_URL]: {
                target: process.env.VUE_APP_API_SERVICE_URL,
                changeOrigin: true,
                pathRewrite: {
                    ['^' + process.env.VUE_APP_API_BASE_URL]: '',
                }
            }
        }
    },
    lintOnSave: false,
    productionSourceMap: false, //打包不生成.map文件，加快打包速度
}