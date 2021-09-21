<template>
  <div class="search">
    <el-form ref="form" :model="form" label-width="90px">
      <el-row>
        <el-col :xl="6" :lg="8" :md="12">
          <el-form-item label="昵称">
            <el-input v-model="form.nickName" placeholder="单行输入"></el-input>
          </el-form-item>
        </el-col>
        <el-col :xl="6" :lg="8" :md="12">
          <el-form-item label="用户类型">
            <el-select v-model="form.role" placeholder="请选择">
              <el-option
                v-for="item in roleList"
                :key="item.value"
                :label="item.key"
                :value="item.value"
              />
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :xl="6" :lg="8" :md="12">
          <el-form-item label="所属学院">
            <el-input
              v-model="form.college"
              placeholder="单行输入"
            ></el-input>
          </el-form-item>
        </el-col>
        <el-col :xl="6" :lg="8" :md="12">
          <el-form-item label="所属企业">
            <el-input
              v-model="form.companyName"
              placeholder="单行输入"
            ></el-input>
          </el-form-item>
        </el-col>
        <el-col :xl="6" :lg="8" :md="12">
          <el-form-item label="手机号">
            <el-input
              v-model="form.mobile"
              placeholder="单行输入"
            ></el-input>
          </el-form-item>
        </el-col>
        <el-col :xl="6" :lg="8" :md="12">
          <el-form-item label="创建时间" placeholder="单行输入">
            <el-col :span="11">
              <el-date-picker
                placeholder="开始时间"
                v-model="form.startDate"
                type="datetime"
                value-format="yyyy-MM-dd hh:mm:ss"
                style="width: 100%"
              ></el-date-picker>
            </el-col>
            <el-col class="line" :span="2">-</el-col>
            <el-col :span="11">
              <el-date-picker
                placeholder="结束时间"
                type="datetime"
                v-model="form.endDate"
                value-format="yyyy-MM-dd hh:mm:ss"
                style="width: 100%"
              ></el-date-picker>
            </el-col>
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
import { mixin } from "@/mixins/patentStoreMixin";

export default {
  data() {
    return {
      form: {},
    };
  },
  mixins: [mixin],
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