const WebpackBar = require('webpackbar')

module.exports = {
    devServer: {
        port: 9091,
        open: true,
        //Network设置
        host: "localhost",
        https: false,
        //开发环境代理配置
        proxy: {
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

    configureWebpack: () => {
      if (process.env.NODE_ENV === 'production') {
        // 生产环境配置
      } else {
        // 开发环境配置
      }
      return {
        plugins: [
          new WebpackBar({
            name: 'antd-admin',
            color: 'skyblue'
          })
        ]
      }
    }
}