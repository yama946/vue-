<template>
<div class="manage">
    <div class="manage-header">
        <el-button type="primary" @click="dialogVisible = true"><i class="el-icon-plus" style="margin-right：5px">新增</i></el-button>
    </div>

    <el-dialog title="新增用户" :visible.sync="dialogVisible" width="50%" :before-close="handleClose">
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
                    <el-option label="男" value="1"></el-option>
                    <el-option label="女" value="0"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="出生日期" prop="birth">
                <el-date-picker type="date" placeholder="选择日期" v-model="form.birth" style="width: 100%;"></el-date-picker>
            </el-form-item>
            <el-form-item label="地址" prop="addr">
                <el-input placeholder="请输入地址" v-model="form.addr"></el-input>
            </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
            <el-button @click="dialogVisible = false">取 消</el-button>
            <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
        </span>
    </el-dialog>
</div>
</template>

<script>
//这里可以导入其他文件（比如：组件，工具 js，第三方插件 js，json文件，图片文件等等）
//例如：import 《组件名称》 from '《组件路径》';

export default {
    //import 引入的组件需要注入到对象中才能使用
    components: {},
    data() {
        //这里存放数据
        return {
            dialogVisible: false,
            //表单标签对齐方式
            labelPosition: 'right',
            // 定义用户表单数据对象
            form: {
                name: '', //姓名
                age: '', //年龄
                sex: '', //性别
                birth: '', //生日
                addr: '', //地址
            },
            //表单校验
            rules: {
                name: [
                    { required: true, message: '请输入姓名', trigger: 'blur' },
                    { min: 2, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
                ],
                age: [
                    { required: true, message: '请输入年龄', trigger: 'blur' },
                    { min: 1, max: 3, message: '数据非法,请重新填写', trigger: 'blur' }
                ],
                sex :[
                    { required: true, message: '请选择性别', trigger: 'blur' },
                ],
                birth: [
                    { required: true, message: '请选择出生日期', trigger: 'blur' },
                ],
                addr: [
                    { required: true, message: '请输入地址', trigger: 'blur' },
                ]
            }
        };
    },
    //方法集合
    methods: {
        handleClose(done) {
            this.$confirm("确认关闭？")
                .then((_) => {
                    done();
                })
                .catch((_) => {});
        },
    }
};
</script>

<style lang="less" scoped>
// element-ui自动生成的class选择器，为我自己添加的图标设置间隙，可以直接使用+与空格形式直接显示文本的
.el-icon-plus:before {
    margin-right: 5px;
}
</style>
