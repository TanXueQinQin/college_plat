import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

Vue.config.productionTip = false

import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
Vue.use(ElementUI);

import less from 'less'
Vue.use(less)


import * as echarts from 'echarts'
Vue.prototype.$echarts = echarts

import TEditor from '@/components/tinymce/index.vue'
Vue.component('TEditor', TEditor)

import './css/index.less'
import './css/iconfont/iconfont.css'
import Router from 'vue-router'
const routerPush = Router.prototype.push
Router.prototype.push = function push(location) {
  return routerPush.call(this, location).catch(error => error)
}



// router.beforeEach((to,from,next) => {
//   console.log(to);
//   if (to.fullPath !== '/') {
//     console.log(getToken());
//     console.log(from);
//   //   let token = getToken()
//   //   if(token){
//       next('/login')
//   //   }else{
//   //     next('/login')
//   //   }
//   // }else{
//   //   next('/login')
//   }
// })
new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')
