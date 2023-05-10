import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import 'element-plus/dist/index.css';
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
import Router from './router/index.js'
import axios from 'axios'


const app = createApp(App)
app.config.globalProperties.$http = axios;
app.use(Router).mount('#app');

//全局注册Element Icon
Object.keys(ElementPlusIconsVue).forEach((key) => {
  app.component(key,ElementPlusIconsVue[key as keyof typeof ElementPlusIconsVue])
});