import Vue from 'vue'
import App from './App.vue'
//引入element-ui
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import router from './router'

Vue.config.productionTip = false
//安装element-ui，全局引入
Vue.use(ElementUI);

new Vue({
  router,//注入router功能
  render: h => h(App),
}).$mount('#app')
