import Vue from 'vue'
import App from './App.vue'
//引入element-ui
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import router from './router'
import store from './store/index'
import Cookie from 'js-cookie'

import './api/mock'

Vue.config.productionTip = false
//安装element-ui，全局引入
Vue.use(ElementUI);

//添加全局前置导航守卫
router.beforeEach((to, from, next) => {
  //判断token是否存在，从cookie中获取
  const token = Cookie.get('token');
  //token不存在，说明当前用户未登陆，应该跳转到登录页
  if(!token && to.name !== 'login'){
    next({ name:'login' })
  }else if(token && to.name === 'login'){//token存在，用户已登陆，跳转到首页
    next({ name:'home' })
  }else{
    next();
  }
})

new Vue({
  router,//挂载router
  store,//挂载store，才能通过this获取实例
  render: h => h(App),
}).$mount('#app')
