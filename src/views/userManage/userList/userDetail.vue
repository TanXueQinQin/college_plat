<template>
  <div class="patent_store_box view_patent">
    <el-page-header @back="$router.go(-1)" content="详情页面"> </el-page-header>
    <el-form
      class="patent_view_form"
      ref="form"
      :model="form"
      label-width="140px"
    >
      <el-form-item label="ID :">
        <span v-text="form.id"></span>
      </el-form-item>
      <el-form-item label="名称 :">
        <span v-if="form.nickName" v-text="form.nickName"></span>
        <span v-else v-text="form.username"></span>
      </el-form-item>
      <el-form-item label="头像 :">
        <el-image
          v-if="form.wxAvatarUrl"
          style="width: 150px; height: 150px"
          :src="form.wxAvatarUrl"
          :preview-src-list="[form.wxAvatarUrl]"
        ></el-image>
      </el-form-item>
      <el-form-item label="用户类型">
        <span v-text="form.roleText"></span>
      </el-form-item>
      <el-form-item label="手机号 :">
        <span v-text="form.mobile"></span>
      </el-form-item>
      <el-form-item label="地址 :">
        <span
          >{{ form.provinceName }}{{ form.cityName }}{{ form.districtName
          }}{{ form.address }}</span
        >
      </el-form-item>
      <el-form-item v-if="form.role == 1" label="学院 :">
        <span v-text="form.college"></span>
      </el-form-item>
      <el-form-item v-if="form.role == 1" label="人事编码 :">
        <span v-text="form.personnelCode"></span>
      </el-form-item>
      <el-form-item v-if="form.role == 2" label="公司名称 :">
        <span v-text="form.companyName"></span>
      </el-form-item>
      <el-form-item v-if="form.role == 2" label="统一社会代码 :">
        <span v-text="form.uscc"></span>
      </el-form-item>
      <el-form-item v-if="form.role == 2" label="公司地址 :">
        <span
          >{{ form.companyProvinceName }}{{ form.companyCityName
          }}{{ form.companyDistrictName }}</span
        >
      </el-form-item>
      <el-form-item v-if="form.role == 2" label="营业执照 :">
        <el-image
          style="width: 150px; height: 150px"
          v-if="form.businessLicense"
          :src="form.businessLicense"
          :preview-src-list="[form.businessLicense]"
        ></el-image>
      </el-form-item>
      <el-form-item label="注册时间 :">
        <span v-text="form.createDate"></span>
      </el-form-item>
      <el-form-item label="最后登录时间 :">
        <span v-text="form.updateDate"></span>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
import { getUserpcData } from "@/api/userList";
import { mixin } from "@/mixins/patentStoreMixin";

export default {
  mixins: [mixin],
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
  },
  methods: {
    getPatentData() {
      getUserpcData(this.id).then((res) => {
        if (res.code === 0) {
          res.user.role = 3;
          this.form = res.user;
          this.getText(this.form.role, this.roleList, "roleText");
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