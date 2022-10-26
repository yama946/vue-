export default {
    state:{
        isCollapse:false,//定义菜单展开还是收起，要交互的两个模块从这里获取数据
        tabsList:[
            //默认数据，首页数据
            {
                path: "/",
                name: "home",
                label: "首页",
                icon: "s-home",
                url: "Home/Home",
            },
        ],//面包屑数据存放
    },
    //mutations方法中state参数是固定写法，获取state变量的数据
    mutations: { 
        //修改菜单展开收起的方法
        collapseMenu(state){
            state.isCollapse=!state.isCollapse;
        },
        //修改面包屑数据
        //state：表示当前对象中的state数据，固定写法，获取现有存储的状态数据
        //val：表示触发改变时，传递过来的数据
        selectMenu(state,val){
            console.log(val,'val');
            //判断添加的数据是否为首页
            if(val.name !== 'home'){
                //数组中查询是否符合条件的项，符合返回索引，没有返回-1
                const index = state.tabsList.findIndex(item => item.name === val.name);
                //如果不存在
                if(index === -1){
                    //向state中添加数据
                    state.tabsList.push(val);
                }
            }
        },
        // 删除指定的tag数据
        closeTag(state,item){
            console.log(item,'item');
            //获取要删除的标签在store数据中的索引index
            const index = state.tabsList.findIndex(val => val.name === item.name);
            //从数组中删除数据
            state.tabsList.splice(index,1);
        }
    }
}