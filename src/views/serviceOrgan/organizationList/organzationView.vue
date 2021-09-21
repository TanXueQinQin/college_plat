<template>
  <div class="patent_store_box view_organ">
    <el-page-header @back="$router.go(-1)" content="详情页面"> </el-page-header>
    <span class="titles">机构信息</span>
    <el-form
      class="patent_view_form"
      ref="form"
      :model="form"
      label-width="140px"
    >
      <el-form-item label="机构类型 :">
        <span v-text="form.typeText"></span>
      </el-form-item>
      <el-form-item label="机构代码 :">
        <span v-text="form.code"></span>
      </el-form-item>
      <el-form-item label="机构名称 :">
        <span v-text="form.agencyName"></span>
      </el-form-item>
      <el-form-item label="图片 :">
        <el-image
          style="width: 150px; height: 150px"
          :src="form.img"
          :preview-src-list="[form.img]"
        ></el-image>
      </el-form-item>
      <el-form-item label="统一社会信用代码">
        <span v-text="form.uscc"></span>
      </el-form-item>
      <el-form-item label="法定代表人 :">
        <span v-text="form.legalRepresentative"></span>
      </el-form-item>
      <el-form-item label="电话 :">
        <span v-text="form.phone"></span>
      </el-form-item>
      <el-form-item label="公司地址 :">
        <span
          >{{ form.provinceName }}{{ form.cityName }}{{ form.districtname
          }}{{ form.address }}</span
        >
      </el-form-item>
      <el-form-item label="营业执照 :">
        <el-image
          style="width: 150px; height: 150px"
          :src="form.businessLicense"
          :preview-src-list="[form.businessLicense]"
        ></el-image>
      </el-form-item>
      <el-form-item label="业务范围 :">
        <span v-text="form.businessScope"></span>
      </el-form-item>
      <el-form-item label="服务产品 :">
        <span v-text="form.serviceProduct"></span>
      </el-form-item>
      <el-form-item label="状态 :">
        <span>{{ form.status ? "启用" : "禁用" }}</span>
      </el-form-item>
      <el-form-item label="简介 :">
        <span v-text="form.introduction"></span>
      </el-form-item>
      <el-form-item label="详情 :">
        <span v-html="details"></span>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
import { getcgagency } from "@/api/serviceOrgan";
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
    gencyTypeList() {
      return JSON.parse(this.$route.query.gencyTypeList);
    },
  },
  methods: {
    getPatentData() {
      getcgagency(this.id).then((res) => {
        if (res.code === 0) {
          this.details = Base64.decode(res.cgAgency.details);
          this.form = res.cgAgency;
          this.getText(this.form.type, this.gencyTypeList, "typeText");
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
.view_organ {
  padding: 24px;
  .el-form-item__label {
    color: #000;
  }

  .titles {
    display: block;
    font-size: 18px;
    line-height: 38px;
    margin: 20px 0 10px 10px;
  }
}
</style>