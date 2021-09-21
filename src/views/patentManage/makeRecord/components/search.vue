<template>
  <div class="search">
    <el-form ref="form" :model="form" label-width="80px">
      <el-row>
          <el-col :xl="6" :lg="8" :md="12">
          <el-form-item label="昵称">
            <el-input
              v-model="form.name"
              placeholder="用户昵称/申请人姓名"
            ></el-input>
          </el-form-item>
        </el-col>
        <el-col :xl="6" :lg="8" :md="12">
          <el-form-item label="专利名称">
            <el-input
              v-model="form.patentName"
              placeholder="单行输入"
            ></el-input>
          </el-form-item>
        </el-col>
        <el-col :xl="6" :lg="8" :md="12">
          <el-form-item label="专利类型">
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
          <el-form-item label="申请号">
            <el-input v-model="form.applyNo" placeholder="单行输入"></el-input>
          </el-form-item>
        </el-col>
        <el-col :xl="6" :lg="8" :md="12">
          <el-form-item label="申请日" placeholder="单行输入">
            <el-col :span="11">
              <el-date-picker
                placeholder="开始时间"
                v-model="form.startApplyDate"
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
                v-model="form.endApplyDate"
                value-format="yyyy-MM-dd hh:mm:ss"
                style="width: 100%"
              ></el-date-picker>
            </el-col>
          </el-form-item>
        </el-col>
         <el-col :xl="6" :lg="8" :md="12">
          <el-form-item label="申请人">
            <el-input
              v-model="form.applyPeople"
              placeholder="单行输入"
            ></el-input>
          </el-form-item>
        </el-col>
        <el-col :xl="6" :lg="8" :md="12">
          <el-form-item label="公开日">
            <el-col :span="11">
              <el-date-picker
                placeholder="开始日期"
                type="datetime"
                value-format="yyyy-MM-dd hh:mm:ss"
                v-model="form.startPublicDate"
                style="width: 100%"
              ></el-date-picker>
            </el-col>
            <el-col class="line" :span="2">-</el-col>
            <el-col :span="11">
              <el-date-picker
                type="datetime"
                value-format="yyyy-MM-dd hh:mm:ss"
                placeholder="结束日期"
                v-model="form.endPublicDate"
                style="width: 100%"
              ></el-date-picker>
            </el-col>
          </el-form-item>
        </el-col>
        <el-col :xl="6" :lg="8" :md="12">
          <el-form-item label="发明人">
            <el-input v-model="form.inventor" placeholder="单行输入"></el-input>
          </el-form-item>
        </el-col>
        <el-col :xl="6" :lg="8" :md="12">
          <el-form-item label="成交时间">
            <el-col :span="11">
              <el-date-picker
                placeholder="开始日期"
                type="datetime"
                value-format="yyyy-MM-dd hh:mm:ss"
                v-model="form.startTradeDate"
                style="width: 100%"
              ></el-date-picker>
            </el-col>
            <el-col class="line" :span="2">-</el-col>
            <el-col :span="11">
              <el-date-picker
                type="datetime"
                value-format="yyyy-MM-dd hh:mm:ss"
                placeholder="结束日期"
                v-model="form.endTradeDate"
                style="width: 100%"
              ></el-date-picker>
            </el-col>
          </el-form-item>
        </el-col>
        <el-col :xl="6" :lg="8" :md="12">
          <el-form-item label="状态">
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
        if (!data[key]) delete data[key];
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