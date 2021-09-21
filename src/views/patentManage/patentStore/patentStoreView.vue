<template>
  <div class="patent_store_box view_patent">
    <el-page-header @back="$router.go(-1)" content="详情页面"> </el-page-header>
    <el-form
      class="patent_view_form"
      ref="form"
      :model="form"
      label-width="140px"
    >
      <el-form-item label="专利名称 :">
        <span v-text="form.patentName"></span>
      </el-form-item>
      <el-form-item label="预估价 :">
        <span v-text="form.estimatedPrice"></span>
      </el-form-item>
      <el-form-item label="图片 :">
        <el-image
          style="width: 150px; height: 150px"
          :src="form.img"
          :preview-src-list="[form.img]"
        ></el-image>
      </el-form-item>
      <el-form-item label="申请号">
        <span v-text="form.applyNo"></span>
      </el-form-item>
      <el-form-item label="申请日 :">
        <span v-text="form.applyDate"></span>
      </el-form-item>
      <el-form-item label="公开号 :">
        <span v-text="form.publicNo"></span>
      </el-form-item>
      <el-form-item label="公开日 :">
        <span v-text="form.publicDate"></span>
      </el-form-item>
      <el-form-item label="专利类型 :">
        <span v-text="form.typeText"></span>
      </el-form-item>
      <el-form-item label="法律状态 :">
        <span v-text="form.lawStatusText"></span>
      </el-form-item>
      <el-form-item label="发明人 :">
        <span v-text="form.inventor"></span>
      </el-form-item>
      <el-form-item label="申请人 :">
        <span v-text="form.applyPeople"></span>
      </el-form-item>
      <el-form-item label="专利权人 :">
        <span v-text="form.patentee"></span>
      </el-form-item>
      <el-form-item label="代理机构 :">
        <span v-text="form.agency"></span>
      </el-form-item>
      <el-form-item label="代理人 :">
        <span v-text="form.agencyPeople"></span>
      </el-form-item>
      <el-form-item label="专利维持 :">
        <span v-text="form.maintainStateText"></span>
      </el-form-item>
      <el-form-item label="摘要 :">
        <span v-html="details"></span>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
import { getPatent } from "@/api/patentStore";
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
      getPatent(this.id).then((res) => {
        if (res.code === 0) {
          this.details = Base64.decode(res.cgPatent.details);
          this.form = res.cgPatent;
          this.getText(this.form.lawStatus, this.laywerList, "lawStatusText");
          this.getText(this.form.type, this.patentTypeList, "typeText");
          this.getText(
            this.form.maintainState,
            this.patentStatusList,
            "maintainStateText"
          );
        }
      });
    },
    getText(ststus, arr, text) {
      arr.forEach((item) => {
        if (item.value == ststus) {
          this.$set(this.form, text, item.key);
        }
      });
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
</style>