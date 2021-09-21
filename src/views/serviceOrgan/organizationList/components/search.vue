<template>
  <div class="search">
    <el-form ref="form" :model="form" label-width="90px">
      <el-row>
        <el-col :xl="6" :lg="8" :md="12">
          <el-form-item label="机构代码">
            <el-input
              v-model="form.code"
              placeholder="单行输入"
            ></el-input>
          </el-form-item>
        </el-col>
        <el-col :xl="6" :lg="8" :md="12">
          <el-form-item label="机构类型">
            <el-select v-model="form.type" placeholder="请选择">
              <el-option
                v-for="item in patentTypeList"
                :key="item.value"
                :label="item.key"
                :value="item.value"
              />
            </el-select>
          </el-form-item>
        </el-col>
         <el-col :xl="6" :lg="8" :md="12">
          <el-form-item label="机构名称">
            <el-input
              v-model="form.agencyName"
              placeholder="单行输入"
            ></el-input>
          </el-form-item>
        </el-col>
         <el-col :xl="6" :lg="8" :md="12">
          <el-form-item label="业务范围">
            <el-input
              v-model="form.businessScope"
              placeholder="单行输入"
            ></el-input>
          </el-form-item>
        </el-col>
         <el-col :xl="6" :lg="8" :md="12">
          <el-form-item label="服务产品">
            <el-input
              v-model="form.serviceProduct"
              placeholder="单行输入"
            ></el-input>
          </el-form-item>
        </el-col>
         <el-col :xl="6" :lg="8" :md="12">
          <el-form-item label="法定代表人">
            <el-input
              v-model="form.legalRepresentative"
              placeholder="单行输入"
            ></el-input>
          </el-form-item>
        </el-col>
         <el-col :xl="6" :lg="8" :md="12">
          <el-form-item label="联系电话">
            <el-input
              v-model="form.phone"
              placeholder="单行输入"
            ></el-input>
          </el-form-item>
        </el-col>
        <el-col :xl="6" :lg="8" :md="12">
          <el-form-item label="机构状态">
            <el-select v-model="form.status" placeholder="请选择">
              <el-option
                v-for="item in statusList"
                :key="item.value"
                :label="item.key"
                :value="item.value"
              />
            </el-select>
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
       if(key != 'status'){
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