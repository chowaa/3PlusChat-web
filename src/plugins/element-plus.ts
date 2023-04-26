import { createApp } from 'vue'
import ElementPlus from 'element-plus'
import 'element-plus/theme-chalk/index.css'
import zhCn from 'element-plus/es/locale/lang/zh-cn' // 汉化 element-plus 组件
 // 这里的app是ElementPlus组件库
export default (app: ReturnType<typeof createApp>) => {
  app.use(ElementPlus, {
    locale: zhCn,
  })
}

