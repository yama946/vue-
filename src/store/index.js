import Vue from 'vue'
import Vuex from 'vuex'

import tab from './tab'

//全局注入，将Vuex组件进行全局注入
Vue.use(Vuex)

//创建Vuex的实例，也就是store

const store = new Vuex.Store({
    modules: {
        tab,
    }
})

export default store;