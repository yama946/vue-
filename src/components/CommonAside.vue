<template>
<el-menu default-active="1-4-1" class="el-menu-vertical-demo" @open="handleOpen" @close="handleClose" :collapse="isCollapse" background-color="#545c64" text-color="#fff" active-text-color="#ffd04b">
    <h3>{{ isCollapse ? '后台':'通用后台管理系统' }}</h3>
    <el-menu-item v-on:click="clickMenu(item)" v-for="item in noChildren" :key="item.name" :index="item.label">
        <i :class="`el-icon-${item.icon}`"></i>
        <span slot="title">{{item.label}}</span>
    </el-menu-item>

    <el-submenu v-for="item in hasChildren" :key="item.label" :index="item.label">
        <template slot="title">
            <i :class="`el-icon-${item.icon}`"></i>
            <span slot="title">{{ item.label }}</span>
        </template>
        <!-- 点击事件，添加到group标签位置不生效 -->
        <el-menu-item-group  v-for="subItem in item.children" :key="subItem.name">
            <el-menu-item v-on:click="clickMenu(subItem)" :index="subItem.path">{{ subItem.label }}</el-menu-item>
        </el-menu-item-group>
    </el-submenu>
</el-menu>
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
            // isCollapse: false,
            menuData: [{
                    path: "/",
                    name: "home",
                    label: "首页",
                    icon: "s-home",
                    url: "Home/Home",
                },
                {
                    path: "/mall",
                    name: "mall",
                    label: "商品管理",
                    icon: "video-play",
                    url: "MallManage/MallManage",
                },
                {
                    path: "/user",
                    name: "user",
                    label: "用户管理",
                    icon: "user",
                    url: "UserManage/UserManage",
                },
                {
                    label: "其他",
                    icon: "location",
                    children: [{
                            path: "/page1",
                            name: "page1",
                            label: "页面1",
                            icon: "setting",
                            url: "Other/PageOne",
                        },
                        {
                            path: "/page2",
                            name: "page2",
                            label: "页面2",
                            icon: "setting",
                            url: "Other/PageTwo",
                        },
                    ],
                },
            ],
        };
    },
    //计算属性 类似于 data 概念
    //这里，菜单可能会根据权限调用接口变化，因此我们使用计算属性，变化时重新执行方法
    computed: {
        //没有子菜单
        noChildren() {
            return this.menuData.filter((item) => !item.children);
        },
        //有子菜单
        hasChildren() {
            return this.menuData.filter((item) => item.children);
        },
        //从store中获取数据
        isCollapse () {
            return this.$store.state.tab.isCollapse;
        }
    },
    //方法集合
    methods: {
        handleOpen(key, keyPath) {
            console.log(key, keyPath);
        },
        handleClose(key, keyPath) {
            console.log(key, keyPath);
        },
        //点击菜单，跳转页面
        clickMenu(item) {
            //获取当前菜单的数据，（参数传递）
            console.log(item);
            //router挂载到vue中通过vue对象直接获取router
            //使用编程式导航进行跳转页面
            /**
             * 问题：路由重复挑战，导致控制台报错问题
             * 解决思路：
             *      路由跳转前，判断路由是否重复，重复不进行跳转
             *      当页面的路由与跳转的路由不一致才进行跳转
             */
            /**
             * $route与$router的区别
             * $route:表示当前页面的路由
             * $router:表示整个路由实例
             */
            if(this.$route.path !== item.path && !(this.$route.path==='/home' && item.path === '/')){
                console.log(this.$route.path);//输出是uri：/home
                this.$router.push(item.path);
            }
            //点击菜单，触发面包屑数据更改，通过mutation方法修改数据
            //其中第二个参数，就是传递的参数
            this.$store.commit('selectMenu',item);
        }
    },
};
</script>

<style lang="less" scoped>
/* 引入less，以及less-loader后，在style标签上添加lang属性表明为less，scope表明只作用在此style标签上，就可以使用less编写样式了 */
// scoped，表示当前样式只使用与当前模板
.el-menu-vertical-demo:not(.el-menu--collapse) {
    width: 200px;
    // min-height: 400px;
    min-height: 100vh;
}
// 这个el-menu属性值的来源是哪里，在哪里定义，而不是到浏览器控制台获取
.el-menu {
    // height: 100vh;
    height: 100%;
    h3 {
       color: #fff;
       text-align: center;
       line-height: 48px;
       font-size: 18px;
       font-weight: 400;
    }
}
</style>


<style lang="less" scoped>
    .el-menu {
        // 去除白边
        border-right: none;
    }
</style>
