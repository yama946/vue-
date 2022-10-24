<template>
<div class="header-container">
    <div class="l-content">
        <el-button @click="handleMenu" icon="el-icon-menu" size="mini"></el-button>
        <!-- 面包屑 -->
        <span class="text">首页</span>
    </div>
    <div class="r-content">
        <el-dropdown>
            <span class="el-dropdown-link">
                <img class="user"  src="../assets/images/user.png" alt="用户图片">
            </span>
            <el-dropdown-menu slot="dropdown">
                <el-dropdown-item>个人中心</el-dropdown-item>
                <el-dropdown-item>退出</el-dropdown-item>
            </el-dropdown-menu>
        </el-dropdown>
    </div>
</div>
</template>

<script>
//这里可以导入其他文件（比如：组件，工具 js，第三方插件 js，json文件，图片文件等等）
//例如：import 《组件名称》 from '《组件路径》';

export default {
    //import 引入的组件需要注入到对象中才能使用
    components: {},
    props: {},
    data() {
        //这里存放数据
        return {

        };
    },
    //方法集合
    methods: {
        //修改store中，菜单的状态
        handleMenu(){
            this.$store.commit('collapseMenu');
        }
    },
    //计算属性 类似于 data 概念
    computed: {},
    //监控 data 中的数据变化
    watch: {},
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
.header-container {
    padding: 0 20px;
    background: #333;
    height: 60px;
    display: flex;
    justify-content: space-between;
    align-items: center;

    .text {
        color: #fff;
        font-size: 14px;
        margin-left: 14px;
    }

    .r-content{
        .user{
            width: 40px;
            height: 40px;
            border-radius: 50%;
        }
    }
}
</style>
