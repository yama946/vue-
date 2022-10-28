import mockjs from 'mockjs'

import homeApi from './mockServerData/home'
import userApi from './mockServerData/user'
import permissionApi from './mockServerData/permission'

//引入mockjs

//之后还需要在main.js进行引入，才会生效:import './api/mock'

//定义Mock请求拦截，模拟后端，拦截前端请求返回随机数据


/**
 * Mock.mock( rurl?, rtype?, template|function( options ) )
 *  rurl：表示请求ip+port之后的路径，url也可以使用正则表达式，匹配路径的方式
 *  rtype: 请求类型，默认为get
 *  template|function( options )：请求处理函数或者模板
 */

//传统实现方法，不提去封装处理函数
// mockjs.mock('/api/home/getData',function(){
//     //拦截到请求后的处理逻辑
//     console.log('拦截到了----》获取首页数据请求');

//     //返回给拦截到请求的数据。也就是请求的响应数据
//     return 1;
// })


/**
 * 这里的function()处理请求函数，直接写会导致代码重复等问题，为了模块化可以重复利用。
 * 将处理函数逻辑进行提取到文件中，进行暴露对象，在此页面直接引用即可。
 */

 mockjs.mock('/api/home/getData',homeApi.getStatisticalData)

//用户列表数据
mockjs.mock('/api/user/add', 'post', userApi.createUser)
mockjs.mock('/api/user/edit', 'post', userApi.updateUser)
mockjs.mock('/api/user/del', 'post', userApi.deleteUser)
mockjs.mock('/api/user/batch', 'post', userApi.batchremove)
// mockjs.mock('/api/user/getUser', 'get', userApi.getUserList)
//正则表达式拦截请求
mockjs.mock(/api\/user\/getUser/, 'get', userApi.getUserList)
// 权限相关
mockjs.mock('/api/permission/getMenu/', 'post', permissionApi.getMenu)