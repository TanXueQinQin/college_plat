<template>
  <div class="patent_store_box view_patent">
    <el-page-header @back="$router.go(-1)" content="详情页面"> </el-page-header>
    <el-form
      class="patent_view_form"
      ref="form"
      :model="form"
      label-width="140px"
    >
      <el-row><span class="title">用户信息</span></el-row>
      <el-row>
        <el-col :span="12">
          <el-form-item label="用户信息 :">
            <span v-text="form.nickName"></span>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="用户类型 :">
            <span v-text="form.roleText"></span>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="联系电话 :">
            <span v-text="form.phone"></span>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="提交时间 :">
            <span v-text="form.createDate"></span>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row><span class="title">需求信息</span></el-row>
      <el-row>
        <el-col :span="24">
          <el-form-item label="专利名称 :">
            <span v-text="form.patentName"></span>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="专利类型 :">
            <span v-text="form.typeText"></span>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="法律状态 :">
            <span v-text="form.lawStatusText"></span>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="行业类型 :">
            <span v-text="form.industrySector"></span>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="资金预算 :">
            <span v-text="form.capitalBudget"></span>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="24">
          <el-form-item label="需求描述 :">
            <span v-text="form.description"></span>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
  </div>
</template>
<script>
import { getDemandDetail } from "@/api/demandManage";

export default {
  data() {
    return {
      form: {},
    };
  },
  created() {
    this.getPatentData();
  },
  computed: {
    id() {
      return this.$route.query.id;
    },
    laywerList() {
      return JSON.parse(this.$route.query.laywerList);
    },
    patentTypeList() {
      //专利类型
      return JSON.parse(this.$route.query.patentTypeList);
    },
    patentStatusList() {
      //专利维持
      return JSON.parse(this.$route.query.patentStatusList);
    },
  },
  methods: {
    getPatentData() {
      getDemandDetail(this.id).then((res) => {
        if (res.code === 0) {
          this.form = res.cgDemandRelease;
          this.getText(this.form.role, this.roleList, "roleText");
          this.getText(this.form.lawStatus, this.laywerList, "lawStatusText");
          this.getText(this.form.patentType, this.patentTypeList, "typeText");
        }
      });
    },
    getText(ststus, arr, text) {
      if (ststus) {
        arr.forEach((item) => {
          if (item.value == ststus) {
            this.$set(this.form, text, item.key);
          }
        });
      }
    },
  },
};
</script>
<style lang="less">
.patent_store_box {
  width: calc(100% - 234px);
  height: calc(100% - 112px);
  background: #fff;
  margin: 24px 0 24px 234px;
}
.view_patent {
  padding: 24px;
  .el-form-item__label {
    color: #000;
  }
  .patent_view_form {
    margin-top: 30px;
  }
}
.title {
  display: block;
  font-size: 18px;
  line-height: 38px;
  margin-bottom: 20px;
}
</style>