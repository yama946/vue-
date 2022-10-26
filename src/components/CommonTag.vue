<template>
  <div class="tabs">
    <el-tag
      v-for="(item, index) in tags"
      :key="item.path"
      :closable="item.name !== 'home'"
      :effect="$route.name === item.name ? 'dark' : 'plain'"
      @click="changeMenu(item)"
      @close="handleClose(item, index)"
      size="small"
    >
      {{ item.label }}
    </el-tag>
  </div>
</template>

<script>
// 引入vuex辅助函数，mapState用来操作store中的state，mapMutations用来操作store中的mutations

// 这种操作方式只作为一种演示，为了保证代码风格的一致性，生产环境下还是建议使用传统方式获取
import { mapState, mapMutations } from "vuex";
export default {
  name: "CommonTag",
  data() {
    //这里存放数据
    return {};
  },
  methods: {
    //使用辅助函数，传递一个数组就会获取到mutitions中所有方法，可以通过扩展运算符解构出来，就可以使用了
    //使用扩展运算符解构出的数据，可以通过this进行引用，表示是在当前vue组件对象中
    ...mapMutations(["closeTag"]),
    //点击tag跳转的功能，通过item获取参数数据
    changeMenu(item) {
      console.log(item);
      //编程路由实现跳转
      this.$router.push(item.name);
    },
    //点击删除tag标签
    handleClose(item, index) {
      //调用mutation中方法操作store数据
      this.closeTag(item);
      // const length = this.tags.length - 1;
      const length = this.tags.length;
      //删除标签后的跳转逻辑
      //1.点击非激活的tag，不跳转，因此需要进行判断
      //自己的实现，有些问题，无法向右跳转
      // if (this.$route.name == item.name) {
      //     const items = this.$store.state.tab.tabsList;
      //     this.changeMenu(items[length]);
      // }
      //如果删除的不是高亮标签
      if (this.$route.name !== item.name) {
        //不做任何操作
        return;
      }
      //表示删除的最后一项
      if (index == length) {
        this.$router.push({
          name: this.tags[index - 1].name,
        });
      } else {
        this.$router.push({
          name: this.tags[index].name,
        });
      }
    },
  },
  //计算属性
  computed: {
    // 传统方式获取state数据
    // tags() {
    //     return this.$store.state.tab.tabsList;
    // }
    ...mapState({
      tags: (state) => state.tab.tabsList,
    }),
  },
  mounted() {
    console.log;
  },
};
</script>

<style lang="less" scoped>
.tabs {
  padding: 20px;
  //element-ui自动生成的class属性
  .el-tag {
    margin-right: 15px;
    cursor: pointer;
  }
}
</style>