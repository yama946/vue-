<template>
<el-row>
    <!-- 左侧部分 -->
    <el-col :span="8" style="padding-right: 10px">
        <el-card class="box-card">
            <div class="user">
                <img src="../assets/images/user.png" alt="">
                <div class="userinfo">
                    <p class="name">Admin</p>
                    <p class="access">超级管理员</p>
                </div>
            </div>
            <div class="login-info">
                <p>上次登陆的时间：<span>2019/12/03</span></p>
                <p>上次登陆的地点：<span>河南</span></p>
            </div>
        </el-card>
        <!-- 行内设置，卡片之间的间隔 -->
        <el-card style="margin-top: 20px;height:460px">
            <el-table :data="tableData" style="width: 100%">
                <!-- 传统写法 -->
                <!-- <el-table-column prop="name" label="品牌" >
                </el-table-column>
                <el-table-column prop="todayBuy" label="日销量" >
                </el-table-column>
                <el-table-column prop="monthBuy" label="月销量">
                </el-table-column>
                <el-table-column prop="totalBuy" label="总销量">
                </el-table-column> -->
                <!-- 使用vue循环，进行优化，动态生成 -->
                <el-table-column v-for="(value, name) in tableLabel" :key="name" :prop="name" :label="value">
                </el-table-column>
            </el-table>
        </el-card>
    </el-col>
    <!-- 右侧部分，将页面宽度看成24个栅格，16个栅格为2/3 -->
    <el-col :span="16" style="padding-left: 10px">
        <div class="num">
            <el-card v-for="item in countData" :key="item.name" :body-style="{ display: 'flex', padding: 0 }">
                <i class="icon" :class="`el-icon-${item.icon}`" v-bind:style="{ background: item.color }"></i>
                <div class="detail">
                    <p class="price">￥{{item.value}}</p>
                    <p class="desc">{{item.name}}</p>
                </div>
            </el-card>
        </div>
        <el-card style="height: 280px">
            <!-- 折线图区域 -->
        </el-card>
        <!-- 当前div作为一个容器 -->
        <div class="graph">
            <el-card style="height: 260px"></el-card>
            <el-card style="height: 260px"></el-card>
        </div>
    </el-col>
</el-row>
</template>

<script>
//这里可以导入其他文件（比如：组件，工具 js，第三方插件 js，json文件，图片文件等等）
//例如：import 《组件名称》 from '《组件路径》';

//通过解构的方式，获取getData请求接口返回的对象
import { getData } from '../api/index'

export default {
    //import 引入的组件需要注入到对象中才能使用
    components: {},
    //生命周期 - 挂载完成（可以访问 DOM 元素）
    mounted() {
        //使用请求接口获取返回的结果数据
        // getData().then((data)=>{
        //     //由于数据结构层级较深，我们可以使用解构较少层级
        //     console.log(data);
        // })
        getData().then(({ data }) => {
            const { tableData } = data.data;
            console.log(tableData);
            this.tableData = tableData;
        })
    },
    data() {
        //这里存放数据
        return {
            //定义表格数据
            tableData: [{
                    name: 'oppo',
                    todayBuy: 100,
                    monthBuy: 300,
                    totalBuy: 800
                },
                {
                    name: 'vivo',
                    todayBuy: 100,
                    monthBuy: 300,
                    totalBuy: 800
                },
                {
                    name: '苹果',
                    todayBuy: 100,
                    monthBuy: 300,
                    totalBuy: 800
                },
                {
                    name: '小米',
                    todayBuy: 100,
                    monthBuy: 300,
                    totalBuy: 800
                },
                {
                    name: '三星',
                    todayBuy: 100,
                    monthBuy: 300,
                    totalBuy: 800
                },
                {
                    name: '魅族',
                    todayBuy: 100,
                    monthBuy: 300,
                    totalBuy: 800
                }
            ],
            tableLabel: {
                name: '课程',
                todayBuy: '今日购买',
                monthBuy: '本月购买',
                totalBuy: '总购买',
            },
            countData: [{
                    name: "今日支付订单",
                    value: 1234,
                    icon: "success",
                    color: "#2ec7c9",
                },
                {
                    name: "今日收藏订单",
                    value: 210,
                    icon: "star-on",
                    color: "#ffb980",
                },
                {
                    name: "今日未支付订单",
                    value: 1234,
                    icon: "s-goods",
                    color: "#5ab1ef",
                },
                {
                    name: "本月支付订单",
                    value: 1234,
                    icon: "success",
                    color: "#2ec7c9",
                },
                {
                    name: "本月收藏订单",
                    value: 210,
                    icon: "star-on",
                    color: "#ffb980",
                },
                {
                    name: "本月未支付订单",
                    value: 1234,
                    icon: "s-goods",
                    color: "#5ab1ef",
                },
            ]
        };
    },
    //计算属性 类似于 data 概念
    computed: {

    },
    //监控 data 中的数据变化
    watch: {},
    //方法集合
    methods: {

    },
    //生命周期 - 创建完成（可以访问当前 this 实例）
    created() {

    },
    beforeCreate() {}, //生命周期 - 创建之前
    beforeMount() {}, //生命周期 - 挂载之前
    beforeUpdate() {}, //生命周期 - 更新之前
    updated() {}, //生命周期 - 更新之后
    beforeDestroy() {}, //生命周期 - 销毁之前
    destroyed() {}, //生命周期 - 销毁完成
    activated() {}, //如果页面有 keep-alive 缓存功能，这个函数会触发
}
</script>

<style lang="less" scoped>
.user {
    //添加下划线
    padding-bottom: 20px;
    margin-bottom: 20px;
    border-bottom: 1px solid #ccc;
    //样式
    display: flex;
    align-items: center;

    img {
        margin-right: 40px;
        width: 150px;
        height: 150px;
        border-radius: 50%;
    }

    .userinfo {
        .name {
            font-size: 32px;
            margin-bottom: 10px;
        }

        .access {
            color: #999999;
        }
    }
}

.login-info {
    p {
        line-height: 28px;
        font-size: 14px;
        color: #999999;

        span {
            color: #666666;
            margin-left: 60px;
        }
    }
}

.num {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;

    .icon {
        width: 80px;
        height: 80px;
        font-size: 30px;
        text-align: center;
        line-height: 80px;
        color: #fff;
    }

    .detail {
        margin-left: 15px;
        display: flex;
        flex-direction: column;
        justify-content: center;

        .price {
            font-size: 30px;
            margin-bottom: 10px;
            line-height: 30px;
            height: 30px;
        }

        .desc {
            font-size: 14px;
            color: #999;
            text-align: center;
        }
    }

    // 这个选择器是页面自动生成的，当前页面没有定义该class属性
    .el-card {
        width: 32%;
        margin-bottom: 20px;
    }
}

// 饼状图与柱状图容器布局
.graph {
    margin-top: 18px;
    display: flex;
    justify-content: space-between;
    // 这里的el-card属性也是页面自动生成的，当前也页面并没有定义
    .el-card{
        width: 48%;
    }
}
</style>
