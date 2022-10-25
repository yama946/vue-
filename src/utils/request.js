import axios from 'axios';

//实例创建的所有参数配置可以在axios官网查看：https://www.axios-http.cn/docs/req_config
const http = axios.create({
    //通用地址请求前缀，表示后端接收前端请求的前缀，
    //思考（自己）：可以存在多个前端项目模块，每个模块后端对应不同的请求前缀来区分
    // baseURL: 'http://gulimall.com/api',
    baseURL: '/api',
    //请求超时时间，超时后自动终止请求，单位毫秒
    timeout:10000,
})
/**
 * 拦截器
 *      作用：
 *          可以对于请求前以及响应数据进行一些同一的操作，
 *          比如请求添加统一请求头，token数据等；比如响应数据根据后端响应状态码做出统一处理
 *      使用：
 *          拦截器必须是axios实例调用，该实例是我们要用的实例。
 *          如果是二次封装的axios实例，必须使用二次方装的axios实例进行调用。
 */

// 添加请求拦截器,config请求数据
http.interceptors.request.use(function (config) {
    // 在发送请求之前做些什么
    return config;
  }, function (error) {
    // 对请求错误做些什么
    return Promise.reject(error);
  });

// 添加响应拦截器,response响应数据
http.interceptors.response.use(function (response) {
    // 2xx 范围内的状态码都会触发该函数。
    // 对响应数据做点什么
    return response;
  }, function (error) {
    // 超出 2xx 范围的状态码都会触发该函数。
    // 对响应错误做点什么
    return Promise.reject(error);
  });


//将二次封装增强的axios实例堆外暴露，方便其他模块使用
export default http;


