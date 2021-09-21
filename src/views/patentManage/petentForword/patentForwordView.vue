<template>
  <div class="patent_store_box view_patent">
    <el-page-header @back="$router.go(-1)" content="详情页面"> </el-page-header>
    <el-form
      class="patent_view_form"
      ref="form"
      :model="form"
      label-width="140px"
    >
      <el-row><span class="title">预约信息</span></el-row>
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
      <el-row><span class="title">专利信息</span></el-row>
      <el-row>
        <el-col :span="12">
          <el-form-item label="专利名称 :">
            <span v-if="form.cgPatent" v-text="form.cgPatent.patentName"></span>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="专利类型 :">
            <span v-text="form.typeText"></span>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="预估价 :">
            <span
              v-if="form.cgPatent"
              v-text="form.cgPatent.estimatedPrice"
            ></span>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="法律状态 :">
            <span v-text="form.lawStatusText"></span>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="申请号 :">
            <span v-if="form.cgPatent" v-text="form.cgPatent.applyNo"></span>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="发明人 :">
            <span v-if="form.cgPatent" v-text="form.cgPatent.inventor"></span>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="申请日 :">
            <span v-if="form.cgPatent" v-text="form.cgPatent.applyDate"></span>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="申请人 :">
            <span
              v-if="form.cgPatent"
              v-text="form.cgPatent.applyPeople"
            ></span>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="公开号 :">
            <span v-if="form.cgPatent" v-text="form.cgPatent.publicNo"></span>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="专利权人 :">
            <span v-if="form.cgPatent" v-text="form.cgPatent.patentee"></span>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="公开日 :">
            <span v-if="form.cgPatent" v-text="form.cgPatent.publicDate"></span>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="代理机构 :">
            <span v-if="form.cgPatent" v-text="form.cgPatent.agency"></span>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="代理人 :">
            <span
              v-if="form.cgPatent"
              v-text="form.cgPatent.agencyPeople"
            ></span>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="24">
          <el-form-item label="摘要 :">
            <span v-html="details"></span>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
  </div>
</template>
<script>
import { getPatentDetail } from "@/api/patentForword";
import { Base64 } from "js-base64";

export default {
  data() {
    return {
      form: {},
      details: "",
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
      console.log(this.laywerList);
      getPatentDetail(this.id).then((res) => {
        if (res.code === 0) {
          this.details =
            res.cgPatentAppointment.cgPatent &&
            res.cgPatentAppointment.cgPatent.details
              ? Base64.decode(res.cgPatentAppointment.cgPatent.details)
              : "";
          this.form = res.cgPatentAppointment;
          this.getText(this.form.role, this.roleList, "roleText");
          this.form.cgPatent &&
            this.getText(
              this.form.cgPatent.lawStatus,
              this.laywerList,
              "lawStatusText"
            );
          this.form.cgPatent &&
            this.getText(
              this.form.cgPatent.type,
              this.patentTypeList,
              "typeText"
            );
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