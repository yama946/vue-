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


/**
 * 解决页面刷新，导致空白页，路由异常
 * 原因：
 *    每次刷新都会初始化vue实例导致路由失效，同时刷新又不再走注册路由的mutation方法，路由无法重新注册。
 * 解决：
 *    在vue实例中重新调用mutation中的方法，重新注册路由
 */
new Vue({
  router,//挂载router
  store,//挂载store，才能通过this获取实例
  render: h => h(App),
  created(){
    store.commit('changeRouter',router);
  }
}).$mount('#app')
