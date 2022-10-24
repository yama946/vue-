<template>
    <el-container>
        <!-- <el-aside width="200px">  这里的200px导致，当点击缩放菜单时，无法占满 -->
        <el-aside width="auto">
            <!-- 映射侧边栏组件 -->
            <common-aside></common-aside>
        </el-aside>
        <el-container>
            <el-header>
                <!-- 映射使用头部组件 -->
                <common-header></common-header>
            </el-header>
            <el-main>
                <!-- 路由出口 -->
                <!-- 路由匹配到的组件将渲染在这里 -->
                <router-view></router-view>
            </el-main>
        </el-container>
    </el-container>
</template>

<script>
//这里可以导入其他文件（比如：组件，工具 js，第三方插件 js，json文件，图片文件等等）
//例如：import 《组件名称》 from '《组件路径》';
import CommonAside from '../components/CommonAside.vue'
import CommonHeader from '../components/CommonHeader.vue'

export default {
    //import 引入的组件需要注入到对象中才能使用
    components: {
        CommonAside,
        CommonHeader
    },
    props: {},
    data() {
        //这里存放数据
        return {

        };
    },
    //计算属性 类似于 data 概念
    computed: {},
    //监控 data 中的数据变化
    watch: {},
    //方法集合
    methods: {

    },
    //生命周期 - 创建完成（可以访问当前 this 实例）
    created() {

    },
    //生命周期 - 挂载完成（可以访问 DOM 元素）
    mounted() {

    },
    beforeCreate() {}, //生命周期 - 创建之前
    beforeMount() {}, //生命周期 - 挂载之前
    beforeUpdate() {}, //生命周期 - 更新之前
    updated() {}, //生命周期 - 更新之后
    beforeDestroy() {}, //生命周期 - 销毁之前
    destroyed() {}, //生命周期 - 销毁完成
    activated() {}, //如果页面有 keep-alive 缓存功能，这个函数会触发
}
</script>

<style lang="less" scoped>
// 请求头部组件左右空格，该选择器是自动生成的-------为什么在此处设置才生效？
.el-header{
    padding: 0;
}
</style>
