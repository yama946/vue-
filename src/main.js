import Vue from 'vue'
import App from './App.vue'
//引入element-ui
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import router from './router'
import store from './store/index'

import './api/mock'

Vue.config.productionTip = false
//安装element-ui，全局引入
Vue.use(ElementUI);

new Vue({
  router,//挂载router
  store,//挂载store，才能通过this获取实例
  render: h => h(App),
}).$mount('#app')
