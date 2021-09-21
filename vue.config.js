const path = require('path')
// 打印打包代码时间

function resolve(dir) {
  return path.join(__dirname, dir)
}

const url = process.env.VUE_APP_BASE_API
// If your port is set to 80,
// use administrator privileges to execute the command line.
// For example, Mac: sudo npm run
// You can change the port by the following methods:
// port = 9528 npm run dev OR npm run dev --port = 9528
// const port = process.env.port || process.env.npm_config_port || 9528 // dev port

// All configuration item explanations can be find in https://cli.vuejs.org/config/
module.exports = {
  /**
   * You will need to set publicPath if you plan to deploy your site under a sub path,
   * for example GitHub Pages. If you plan to deploy your site to https://foo.github.io/bar/,
   * then publicPath should be set to "/bar/".
   * In most cases please use '/' !!!
   * Detail: https://cli.vuejs.org/config/#publicpath
   */
  publicPath: '/',
  outputDir: 'dist',
  assetsDir: 'static',
  lintOnSave: process.env.NODE_ENV === 'development',
  productionSourceMap: false,
  // devServer: {
  //   port: port,
  //   open: false,
  //   proxy: {
  //     '/api': {
  //       // target: url,
  //       target: 'https://college.lioverseas.com',
  //       changeOrigin: true,
  //       https: false,
  //       secure: false,
  //       logLevel: 'debug',
  //       ws: true,
  //       pathRewrite: {
  //         '^/api': ''
  //       }
  //     }
  //   }
  // },
devServer: {
    port: 8088,
    open: false,
    proxy: {
      '/proxy': {
        target: url,
        changeOrigin: true,
        https: true,
        secure: false,
        logLevel: 'debug',
        ws: true,
        pathRewrite: {
          '^/proxy': ''
        }
      }
    }
  },


}
