import http from '../utils/request'


//定义：请求首页的接口
export const getData = () => {
    //返回一个Promise对象
    return http.get('/home/getData')
}