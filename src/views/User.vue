<template>
<div class="manage">
    <el-dialog title="提示" :visible.sync="dialogVisible" width="50%" :before-close="handleClose">
        <!-- 用户的表单数据 -->
        <el-form :inline="true" :rules="rules" :label-position="labelPosition" ref="form" :model="form" label-width="80px">
            <el-form-item label="姓名" prop="name">
                <el-input placeholder="请输入姓名" v-model="form.name"></el-input>
            </el-form-item>
            <el-form-item label="年龄" prop="age">
                <el-input placeholder="请输入年龄" v-model="form.age"></el-input>
            </el-form-item>
            <el-form-item label="性别" prop="sex">
                <el-select v-model="form.sex" placeholder="请选择性别">
                    <!-- :value="1",添加：，数据回显表单不会回显数字 -->
                    <el-option label="男" :value="1"></el-option>
                    <el-option label="女" :value="0"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="出生日期" prop="birth">
                <el-date-picker type="date" placeholder="选择日期" value-format="yyyy-MM-dd" v-model="form.birth" style="width: 100%"></el-date-picker>
            </el-form-item>
            <el-form-item label="地址" prop="addr">
                <el-input placeholder="请输入地址" v-model="form.addr"></el-input>
            </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
            <el-button @click="cancle">取 消</el-button>
            <el-button type="primary" @click="submit">确 定</el-button>
        </span>
    </el-dialog>

    <div class="manage-header">
        <el-button type="primary" @click="handleAdd"><i class="el-icon-plus" style="margin-right：5px">新增</i></el-button>
        <!-- form搜索区域 -->
        <el-form :inline="true" ref="form" :model="userForm">
            <el-form-item>
                <el-input placeholder="请输入查询条件" v-model="userForm.name"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="onSubmit">查询</el-button>
            </el-form-item>
        </el-form>
    </div>
    <el-table stripe :data="tableData" height="90%" style="width: 100%">
        <el-table-column prop="name" label="姓名"> </el-table-column>
        <el-table-column label="性别">
            <template slot-scope="scope">
                <span style="margin-left: 10px">{{ scope.row.sex | sexFilter }}</span>
            </template>
        </el-table-column>
        <el-table-column prop="age" label="年龄"> </el-table-column>
        <el-table-column prop="birth" label="出生日期"> </el-table-column>
        <el-table-column prop="addr" label="地址"> </el-table-column>
        <el-table-column label="操作">
            <template slot-scope="scope">
                <el-button size="mini" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
                <el-button size="mini" type="danger" @click="handleDelete(scope.row)">删除</el-button>
            </template>
        </el-table-column>
    </el-table>
    <div class="pager">
        <el-pagination layout="sizes,prev, pager, next" :total="total" :page-size="pageData.limit" :page-sizes="[5, 10, 20, 30, 40]" @current-change="handlePage" @size-change="handleSizeChange">
        </el-pagination>
    </div>

</div>
</template>

<script>
//这里可以导入其他文件（比如：组件，工具 js，第三方插件 js，json文件，图片文件等等）
import { addUser, getUser, editUser, delUser } from "../api";

export default {
    //import 引入的组件需要注入到对象中才能使用
    components: {},
    data() {
        //这里存放数据
        return {
            dialogVisible: false,
            //表单标签对齐方式
            labelPosition: "right",
            // 定义用户表单数据对象
            form: {
                name: "", //姓名
                age: "", //年龄
                sex: "", //性别
                birth: "", //生日
                addr: "", //地址
            },
            //表单校验
            rules: {
                name: [
                    { required: true, message: "请输入姓名", trigger: "blur" },
                    { min: 2, max: 5, message: "长度在 3 到 5 个字符", trigger: "blur" },
                ],
                age: [
                    { required: true, message: "请输入年龄", trigger: "blur" },
                    { min: 1, max: 3, message: "数据非法,请重新填写", trigger: "blur" },
                ],
                sex: [{ required: true, message: "请选择性别", trigger: "blur" }],
                birth: [{ required: true, message: "请选择出生日期", trigger: "blur" }],
                addr: [{ required: true, message: "请输入地址", trigger: "blur" }],
            },
            // 表格数据，通过请求获取
            tableData: [],
            modalType: 0, //表示新增的弹窗，1表示编辑的弹窗
            total: 0, //当前的总条数
            pageData: {
                page: 1,
                limit: 5
            },
            //搜索参数
            userForm: {
                name: ''
            }
        };
    },
    //方法集合
    methods: {
        //打开新增弹窗
        handleAdd() {
            this.modalType = 0;
            this.dialogVisible = true;
        },
        //点击关闭按扭触发事件
        handleClose(done) {
            this.$confirm("确认关闭？")
                .then((_) => {
                    //清空表单数据
                    this.$refs.form.resetFields();
                    done();
                })
                .catch((_) => {});
        },
        //取消表单
        cancle() {
            //清空表单数据
            this.$refs.form.resetFields();
            //关闭弹窗
            this.dialogVisible = false;
        },
        //表单提交功能
        submit() {
            //校验表单是否验证成功
            //1.获取表单dom对象，并使用element ui 表单提供的方法
            this.$refs.form.validate((valid) => {
                //该回调函数可以传递两个参数:
                //第一个boolean类型表示是否校验成功
                //第二个Object类型封装那些校验不成功的字段
                console.log(valid, "valid");
                //2.校验成功触发，表单提交逻辑
                if (valid) {
                    //获取双向绑定的表单数据
                    console.log(this.form, "提交的表单数据");

                    //校验成功后处理数据逻辑
                    if (this.modalType === 0) {
                        addUser(this.form).then(() => {
                            //重新获取列表数据刷新数据
                            this.getList();
                        });
                    } else {
                        //编辑用户数据操作
                        editUser(this.form).then(() => {
                            //重新获取列表数据刷新数据
                            this.getList();
                        });
                    }
                    //清空表单数据
                    this.$refs.form.resetFields();
                    //关闭弹窗
                    this.dialogVisible = false;
                }
            });
        },
        //表格编辑操作
        handleEdit(index, row) {
            console.log(index, row);
            this.modalType = 1;
            this.dialogVisible = true;
            //数据回显表单
            //注意需要对当前行数据进行深拷贝，否则报错，深拷贝的方式使用JSON
            this.form = JSON.parse(JSON.stringify(row));
        },
        //表格删除操作
        handleDelete(row) {
            console.log(row.id, "获取请求删除数据");
            this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
                    confirmButtonText: "确定",
                    cancelButtonText: "取消",
                    type: "warning",
                })
                .then(() => {
                    delUser({ id: row.id }).then((data) => {
                        console.log(data, "删除成功返回数据");
                        this.$message({
                            type: "success",
                            message: "删除成功!",
                        });
                        this.getList();
                    });
                })
                .catch(() => {
                    this.$message({
                        type: "info",
                        message: "已取消删除",
                    });
                });
        },
        ////获取用户的列表数据
        getList() {
            getUser({ params: { ...this.userForm, ...this.pageData } }).then(({ data }) => {
                //打印用户列表数据
                console.log(data, "用户数据");
                this.tableData = data.list;
                this.total = data.count || 0;
            });
        },
        //选择页码的回调函数
        handlePage(val) {
            console.log(val, '当前页');
            //修改页数
            this.pageData.page = val;
            this.getList();
        },
        //更改页面记录数
        handleSizeChange(val) {
            console.log(val, '页面记录数');
            this.pageData.limit = val;
            this.getList();
        },
        //提交查询条件
        onSubmit() {
            this.getList();
        }
    },
    //用户数据页面打开即显示
    mounted() {
        this.getList();
    },
    //过滤器
    // filters 定义局部过滤器，只可以在当前vue 实例中使用
    filters: {
        sexFilter(sex) {
            return sex === 1 ? "男" : "女";
        },
    },
};
</script>

<style lang="less" scoped>
// element-ui自动生成的class选择器，为我自己添加的图标设置间隙，可以直接使用+与空格形式直接显示文本的
.el-icon-plus:before {
    margin-right: 5px;
}

.manage {
    height: 90%;

    // .common-table {
    //     position: relative;
    //     height: calc(100%-62px);
    // .pager{
    //     position: absolute;
    //     bottom: 0;
    //     right: 20px;
    // }
    // }

    .manage-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
    }

    .pager {
        position: absolute;
        bottom: 0;
        right: 20px;
    }
}
</style>
