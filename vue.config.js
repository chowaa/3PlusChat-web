const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  lintOnSave:false,
  productionSourceMap:false,
  publicPath: './',
  outputDir: 'dist', // 输出文件目录
  assetsDir: 'static', // 放置静态资源
  css: { // css相关配置
    extract: true,
    sourceMap: false,
    loaderOptions: {
      // 启用 CSS modules for all css / pre-processor files.(预加载)
      css: {
        // modules: {
        //   auto: () => true
        // }
      },
      sass: {
        additionalData: `@import "~@/assets/scss/variables.scss";`
      }
    }
  },
  configureWebpack: {
    plugins: [
      // ["transform-remove-console", { "exclude": [ "error", "warn"] }]
    ],
  },
  chainWebpack: config => {
		config.plugin('html').tap(args => {
			args[0].title = '3PlusChat'
			return args
		})
	},
})
