<template>
<el-form :status-icon="true" label-width="70px" :inline="true" class="login-container" :model="userForm" :rules="userRules" ref="login">
    <h3 class="login_title">系统登陆</h3>
    <el-form-item label="用户名" prop="username">
        <el-input v-model="userForm.username" placeholder="请输入账号"></el-input>
    </el-form-item>
    <el-form-item label="密码" prop="password">
        <el-input type="password" placeholder="请输入密码" v-model="userForm.password"></el-input>
    </el-form-item>
    <el-form-item>
        <el-button style="margin-left:108px;margin-top:10px" type="primary" @click="submitForm">登陆</el-button>
    </el-form-item>
</el-form>
</template>

<script>
//这里可以导入其他文件（比如：组件，工具 js，第三方插件 js，json文件，图片文件等等）
//例如：import 《组件名称》 from '《组件路径》';
import Mock from 'mockjs';
//引入cookie组件
import Cookie from 'js-cookie'

import { getMenu } from '../api'

export default {
    //import 引入的组件需要注入到对象中才能使用
    data() {
        //这里存放数据
        return {
            userForm: {
                username: '',
                password: ''
            },
            userRules: {
                username: [
                    { required: true, message: '请输入用户名', trigger: 'blur' },
                ],
                password: [
                    { required: true, message: '请输入密码', trigger: 'blur' },
                ]
            }
        };
    },
    //方法集合
    methods: {
        //登陆
        submitForm() {
            //1.后端返回token信息
            // const token = Mock.Random.guid();//模拟后端返回token信息
            /**
             * 访问模块需要验证是否存在token，我们需要将token放到固定位置，用于各个模块获取。
             * 实现方式：
             *      1.使用浏览器的local Storage进行存储；
             *      2.使用cookie进行存储，这里我们使用cookie，安装cookie插件：npm install js-cookie@3.0.1
             *          之后直接通过import引入模块使用即可。
             */
            //2.将token信息存入cookie，用于不同页面间的通信
            // Cookie.set('token',token);

            //1.检验表单，通过后进行提交请求
            this.$refs.login.validate((valid) => {
                if (valid) {
                    //校验通过
                    //2.使用mock模拟请求拦截，返回token，使用axios进行发送登陆请求
                    getMenu(this.userForm).then(({ data }) => {
                        if (data.code === 20000) {
                            console.log(data, '登陆请求返回数据');
                            const { token } = data.data;
                            //3.将token存入cookie
                            Cookie.set('token', token);

                            //获取菜单数据,存入store中
                            // data.data.menu;
                            //调用mutation中方法改变，store中state数据
                            this.$store.commit('setMenu',data.data.menu);

                            //动态注册路由，需要将路由实例传递进行操作
                            this.$store.commit('changeRouter',this.$router);


                            //4.此时token存在，跳转页面
                            this.$router.push('/home');
                            //消息提示
                            this.$message({
                                message: data.data.message,
                                type: 'success'
                            });
                        } else if (data.code === -999) {
                            console.log(data, '登陆请求返回数据');
                            const { message } = data.data;
                            this.$message.error(message);
                        } else {
                            console.log(data, '登陆请求返回数据');
                            this.$message.error('系统异常，请联系管理员');
                        }

                    })
                } else {
                    this.$message({
                        message: '用户或密码非法，请重新填写',
                        type: 'warning'
                    });
                }
            });
            /**
             * 点击登陆后，页面要进行跳转，或者直接输入路径访问，之前要进行验证token是否存在，验证通过才允许操作。
             * 这种功能使用vue中的导航守卫实现，在进行页面路由前进行验证信息。
             * 在main.js中定义一个全局的前置导航守卫。
             */
            // //3.此时token存在，跳转页面
            // this.$router.push('/home');

        }
    },
}
</script>

<style lang="less" scoped>
.login-container {
    width: 350px;
    border: 1px solid #eaeaea;
    margin: 130px auto;
    padding: 35px 35px 15px 35px;
    background-color: #fff;
    border-radius: 15px;
    box-shadow: 0 0 25px #cac6ca;
    box-sizing: border-box;

    .login_title {
        text-align: center;
        margin-bottom: 40px;
        color: #505458;
    }

    .el-input {
        width: 198px;
    }
}
</style>
