const { defineConfig } = require('@vue/cli-service')

module.exports = defineConfig({
    transpileDependencies: true,
    lintOnSave: false,
    devServer: {
        proxy: {
          '^/google': {
            target: 'https://trends.google.co.kr',
            changeOrigin: true,
            pathRewrite: {
              '^/google': '/trends/trendingsearches/daily'
            }
          }
        }
      }
})