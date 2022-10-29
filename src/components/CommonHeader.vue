<template>
<div class="header-container">
    <div class="l-content">
        <el-button @click="handleMenu" icon="el-icon-menu" size="mini"></el-button>
        <!-- 面包屑 -->
        <!-- <span class="text">首页</span> -->
        <el-breadcrumb separator="/">
            <el-breadcrumb-item v-for="item in tags" :key="item.path" :to="{ path: item.path }">
                {{ item.label }}
            </el-breadcrumb-item>
        </el-breadcrumb>
    </div>
    <div class="r-content">
        <el-dropdown @command="dropdownClick">
            <span class="el-dropdown-link">
                <img class="user" src="../assets/images/user.png" alt="用户图片">
            </span>
            <el-dropdown-menu slot="dropdown">
                <el-dropdown-item>个人中心</el-dropdown-item>
                <el-dropdown-item command="logout">退出</el-dropdown-item>
            </el-dropdown-menu>
        </el-dropdown>
    </div>
</div>
</template>

<script>
//这里可以导入其他文件（比如：组件，工具 js，第三方插件 js，json文件，图片文件等等）
//例如：import 《组件名称》 from '《组件路径》';
//使用vuex的辅助函数，从state中获取数据
import { mapState } from 'vuex';

import Cookie from 'js-cookie';

export default {
    //import 引入的组件需要注入到对象中才能使用
    data() {
        //这里存放数据
        return {

        };
    },
    //方法集合
    methods: {
        //修改store中，菜单的状态
        handleMenu() {
            this.$store.commit('collapseMenu');
        },
        //退出用户
        dropdownClick(command) {
            if (command === 'logout') {
                console.log('退出操作触发');
                //清除token数据，并跳转页面
                Cookie.remove('token');
                //清除Cookie中的动态菜单数据menu
                Cookie.remove('menu');

                //路由跳转
                this.$router.push('/login');
                //消息提示
                this.$message({
                    message: '成功退出',
                    type: 'success'
                });
            }

        }
    },
    //计算属性
    computed: {
        ...mapState({
            tags: state => state.tab.tabsList
        })
    },
    //通过扩展对象解构，就获得了tag
    mounted() {
        console.log(this.tags, 'tags');
    }
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

    .r-content {
        .user {
            width: 40px;
            height: 40px;
            border-radius: 50%;
        }
    }

    .l-content {
        display: flex;
        align-items: center;
        // element-ui自动生成的class属性选择器

        /deep/.el-breadcrumb__item {
            &:first-child {
                margin-left: 14px; //也可以使用该属性选择器.el-button--mini进行调整边距，或者直接使用行内元素设置
            }

            .el-breadcrumb__inner {

                font-weight: normal;

                //&表示并且，同时满足两个选择器
                &.is-link {
                    color: #fff;
                }
            }

            &:last-child {
                .el-breadcrumb__inner {
                    color: chocolate;
                }
            }

            .el-breadcrumb__separator {
                margin: 0 0;
            }
        }

    }
}
</style>
