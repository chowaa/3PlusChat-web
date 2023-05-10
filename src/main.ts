import { createApp } from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import ElementPlusPlugin from '@/plugins/element-plus'
import 'element-plus/dist/index.css'
import '@/assets/scss/index.scss'
import axios from 'axios'
import store from './store'

const app = createApp(App)

import * as ElementPlusIcons from '@element-plus/icons-vue'
for(const [key, component] of Object.entries(ElementPlusIcons)) {
  app.component(key, component)
}

app.config.globalProperties.$http = axios;
app.use(store).use(router).use(ElementPlusPlugin).mount('#app')
