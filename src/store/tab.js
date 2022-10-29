import Cookie from 'js-cookie';

export default {
    /**
     * vue中的store的数据是页面刷新后丢失。
     *  比如：（面包屑动态添加，以及动态菜单数据）这些通过mutation加载进来的动态数据，
     *          页面刷新后都会丢失，但是直接在其中静态存放不会丢失。
     * 
     *  为了让菜单正常消失，刷新后动态菜单数据不丢失（持久化数据），应该怎么办？
     * 解决方案：
     *       1.使用Cookie作为缓存，将数据保存到Cookie中
     *       2.也可以使用浏览器自带的local storage进行缓存
     */
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
        menu: [],//菜单数据
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
        },
        //设置menu数据
        setMenu(state,val){
            console.log(val,'设置menu数据');
            state.menu = val;
            //将数据缓存到Cookie中，注意：Cookie中保存的数据必须是字符串，需要将对象序列化保存
            Cookie.set('menu',JSON.stringify(val));
        },
        //动态注册路由
        changeRouter(state,router){
            console.log('注册动态路由');
            //判断缓存中是否有数据,没有说明没登陆
            if(!Cookie.get('menu')) {
                console.log('Cookie中数据不存在');
                return;
            }
            const menu = JSON.parse(Cookie.get('menu'));
            state.menu = menu;
            //组装动态路由的数据
            let menuArray = [];
            menu.forEach(item =>{
                //判断是否存在子组件
                if(item.children){
                    //存在子路由
                    item.children = item.children.map(item => {
                        item.component = () => import(`../views/${item.url}`);
                        return item;
                    })
                    menuArray.push(...item.children);
                }else{
                    //没有子路由
                    item.component = ()=>import(`../views/${item.url}`);
                    menuArray.push(item);
                }
            });
            console.log(menuArray,'组装后的动态路由');
            //路由的动态添加
            menuArray.forEach(item => {
                //添加路由
                router.addRoute('main',item);
            });
        }
    }
}