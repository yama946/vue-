<template>
  <div id="app">
    <!-- 映射主路由 -->
    <router-view></router-view>
    <!-- <HelloWorld msg="Welcome to Your Vue.js App"/> -->
  </div>
</template>

<script>
// import HelloWorld from './components/HelloWorld.vue'

export default {
  name: 'App',

  // components: {
  //   HelloWorld
  // }
}
</script>

<style lang="less">
// 去除默认样式，应用到所有模板，并非仅仅当前模板吗
html,body,h3{
  margin: 0%;
  padding: 0%;
}


  
</style>
