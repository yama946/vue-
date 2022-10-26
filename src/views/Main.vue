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
        <!-- 映射tag标签组件 -->
        <common-tag></common-tag>
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
import CommonTag from '../components/CommonTag.vue'

export default {
    //import 引入的组件需要注入到对象中才能使用
    components: {
        CommonAside,
        CommonHeader,
        CommonTag
    },
    data() {
        //这里存放数据
        return {

        };
    }
}
</script>

<style lang="less" scoped>
// 请求头部组件左右空格，该选择器是自动生成的-------为什么在此处设置才生效？
.el-header {
    padding: 0;
}
</style>
