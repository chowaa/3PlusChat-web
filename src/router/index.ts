// 路由文件
import { createRouter, createWebHashHistory } from "vue-router";

const routes = [
  {
    path: '/',
    name: 'Home',
    component: () => import('@/views/Home.vue')
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})


// router.beforeEach((to, from) => {
  // if(to.meta.requireAuth) {
  //     let token = localStorage.getItem('auth-system-token');
  //     let isLogin = localStorage.getItem('auth-system-login');
  //     if(!token||!isLogin){
  //         return {
  //             path: '/login'
  //         }
  //     }
  // }
// })

export default router;
