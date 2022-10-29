### 1、全局安装yarn
```
npm install -g yarn
```
### 2、为npm设置获取镜像安装包地址

>1.获取配置的镜像源地址
>
>命令：npm config get registry
>输出：https://registry.npm.taobao.org/
> 
> 2.设置npm镜像源地址
>npm config set registry https://registry.npm.taobao.org/

### 3、注意事项
>1.当前项目主要使用vue-cli 5版本，不使用vue-cli 4版本。

>2.可以直接使用vue create进行创建vue2项目，命令执行后会进行选择创建的vue项目版本。

>3.vue项目名不能使用驼峰命名的方式，只能使用短横线和小写。

### 4、element-ui的全局引入与按需引入的区别
> element-ui的全局引入和按需引入的区别，在于项目打包后包的大小。
> 测试：
> 1、我们使用yarn build或者npm build命令进行项目打包操作。webpack会对项目中文件进行打包操作生成dist文件夹。
> 2、dist文件夹中的内容，就是我们需要进行部署的文件
> 3、当element-ui使用按需引入与全部引入的方式进行引入，比较打包后dist文件夹大小，按需引入打包后大小要比全局引入打包后包小一倍。
> 4、对于一个项目，要保证良好的运行，需要体积小，占用空间少。因此在真实项目环境中我们建议使用按需引入的方式进行引入。
> 项目体积越大，请求耗时越高。

### 5、npm安装失败，异常信息：'@vue/vue-loader-v15@15.10.0' is not in the npm registry.

背景：

当前环境下，vue使用yarn作为包管理器，此时使用再使用npm进行安装包失败。

> 随后搜索当前博文：
> 博文中npm安装异常原因是npm的镜像源地址是外网，直接替换包管理器为cnpm，并设置淘宝镜像

>解决办法
> npm config get proxy

> npm config get https-proxy
> 如果返回值不为null，继续执行：(要确保两个返回值都是null才可以，否则就要执行下面的代码)

> npm config set proxy null

> npm config set https-proxy null

>2、执行：
npm config set registry http://registry.npmjs.org/

>然后执行下面的代码就可以安装cnpm了

>npm install -g cnpm --registry=https://registry.npm.taobao.org


#### 实际解决方案

直接执行命令：

npm install -g npm --registry=https://registry.npm.taobao.org

相当于更新npm版本，为最新的版本，执行后vue项目中同时可以使用yarn，npm进行包管理。

也有可能是重新设置了镜像地址才好的。


### 6、vue2对应vue-router3----->vue2对应vue-router4


### 7、添加less环境，npm install less@4.1.2 less-loader@5.0.0

less---->less环境
less-loader--->less解析器

### 8、axios请求工具类，时间的处理等，都可以进行二次封装成工具类进行使用

### 9、api文件夹，主要存放接口，

### 10、注意将element-ui中的html组件直接拿来，有些组件默认要使用一个容器进行包裹，否则报错，通常使用div，参照user.vue


### 菜单权限要解决的问题：
* 1.不同账号登陆，会有不同的菜单权限，根据请求返回菜单数据进行显示。
* 2.依照第一项，如果存在不同的菜单权限，就不能使用静态写死的路由，因为这样虽然显示的不同，还可以通过直接输入url访问不属于该用户的权限模块。因此需要动态加载路由：实现---->动态路由的使用
* 3.对于菜单的数据，后端获取，需要在不同页面之间共享。需要使用缓存进行实现不同页面之间的数据通信。（使用vuex中的store实现）。