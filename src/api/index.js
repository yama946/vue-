import http from '../utils/request'


//定义：请求首页的接口
export const getData = () => {
    //返回一个Promise对象
    return http.get('/home/getData')
}

//定义：前端请求用户数据接口
//params是调用时，传递的请求参数
export const getUser = (params) => {
    //返回用户列表
    return http.get('/user/getUser',params);
}

//定义：新增用户的请求接口
export const addUser = (data)=>{
    return http.post('/user/add',data);
}

//定义：修改用户的请求接口
export const editUser = (data)=>{
    return http.post('/user/edit',data);
}

//定义：删除用户的请求接口
export const delUser = (data) =>{
    return http.post('/user/del',data);
}

//定义：批量删除用户的请求接口
export const batchUser = (data) =>{
    return http.post('/user/batch',data);
}