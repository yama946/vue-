// 引入路由功能
import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home'
import User from '../views/User'
import Main from '../views/Main'
import Mall from '../views/Mall'
import PageOne from '../views/PageOne'
import PageTwo from '../views/PageTwo'
import Login from '../views/Login'

//安装路由功能
Vue.use(VueRouter)

//1.定义路由组件
//2.建立路由与组件之间的映射关系
//3.创建路由对象，并进行暴露
//4.将路由对象，交给Vue对象进行使用

const routes = [
    {
        //主路由
        path: '/',
        component: Main,
        name:'main',//用于动态添加路由，方便查找位置
        redirect: '/home',//重定向到首页
        children: [
            //主路由默认页面
            // { path: '/', component: Home },
            //子路由,$route获取的就是此处的配置
            //动态加载子路由数据时，需要进行注释下面数据
            // { path: 'home',name:'home', component: Home },//首页
            // { path: 'user',name:'user', component: User },//用户管理
            // { path: 'mall', name:'mall',component: Mall },//商城管理
            // { path: 'page1',name:'page1', component: PageOne },//页面1
            // { path: 'page2',name:'page2', component: PageTwo }//页面2
        ]
    },
    //权限校验
    {
        //登陆页
        path: '/login',
        name: 'login',
        component: Login,
    }

]
//第三步
const router = new VueRouter({
    routes
});

//第四步
export default router;