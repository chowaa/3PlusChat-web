const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  lintOnSave:false,
  productionSourceMap:false,
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
        // prependData: `@import "@/assets/scss/index.scss";`
      }
    }
  },
  chainWebpack: config => {
		config.plugin('html').tap(args => {
			args[0].title = '3PlusChat'
			return args
		})
	},
})
