export default {
    state:{
        isCollapse:false,//定义菜单展开还是收起，要交互的两个模块冲这里引入数据
    },
    mutations: { 
        //修改菜单展开收起的方法
        collapseMenu(state){
            state.isCollapse=!state.isCollapse;
        }
    }
}