<template>
  <div class="search">
    <el-form ref="form" :model="form" label-width="90px">
      <el-row>
        <el-col :xl="6" :lg="8" :md="12">
          <el-form-item label="类型">
            <el-input v-model="form.type" placeholder="单行输入"></el-input>
          </el-form-item>
        </el-col>
        <el-col :xl="6" :lg="8" :md="12">
          <el-form-item>
            <el-button type="primary" @click="search()">查询</el-button>
            <el-button @click="reset()">重置</el-button>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
  </div>
</template>
<script>
export default {
  data() {
    return {
      form: {},
    };
  },
  methods: {
    reset() {
      Object.keys(this.form).forEach((v) => {
        this.form[v] = "";
      });
    },
    // 搜索
    search() {
      const query = Object.assign({}, this.form);
      this.$emit("search", this.filterEmptyAttribute(query));
    },
    // 过滤空数据
    filterEmptyAttribute(data) {
      for (const key in data) {
        if (key != "status") {
          if (!data[key]) delete data[key];
        }
      }
      return data;
    },
  },
};
</script>
<style lang="less">
.search {
  padding: 20px 6px;
  .el-form {
    .el-form-item {
      display: inline-block;
      vertical-align: bottom;
    }
    .el-form-item__content {
      width: 310px;
    }
    .el-select {
      width: 100%;
    }
    .line.el-col {
      text-align: center;
    }
  }
}
</style>