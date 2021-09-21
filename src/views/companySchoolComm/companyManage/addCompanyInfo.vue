<template>
  <div class="patent_store_box add_organ">
    <el-form ref="form" class="add_patent" :model="form" label-width="160px">
      <el-form-item label="公司名称：">
        <el-input
          v-model="form.enterpriseName"
          placeholder="单行输入"
        ></el-input>
      </el-form-item>
      <el-form-item label="法定代表人：">
        <el-input
          v-model="form.legalRepresentative"
          placeholder="单行输入"
        ></el-input>
      </el-form-item>
      <el-form-item label="注册时间">
        <el-date-picker
          v-model="form.registrationTime"
          type="datetime"
          value-format="yyyy-MM-dd hh:mm:ss"
          placeholder="选择日期"
        >
        </el-date-picker>
      </el-form-item>
      <el-form-item label="图片：">
        <el-upload
          action="string"
          class="img_box"
          list-type="picture-card"
          :http-request="httpRequest"
          :on-remove="imgRemove"
          :show-file-list="true"
          :limit="1"
          :file-list="imgFileList"
        >
          <i class="el-icon-plus"></i>
        </el-upload>
        <el-dialog :visible.sync="dialogVisible">
          <img width="100%" :src="form.img" alt="" />
        </el-dialog>
      </el-form-item>
      <el-form-item label="联系电话">
        <el-input v-model="form.phone" placeholder="单行输入"></el-input>
      </el-form-item>
      <el-form-item class="sel_address" label="公司地址：">
        <div class="address_box">
          <el-cascader
            v-model="adressId"
            :options="adressList"
            @change="handleChange"
            :props="cateListProps"
          ></el-cascader>
        </div>
        <el-input
          v-model="form.address"
          placeholder="请输入详细地址"
        ></el-input>
      </el-form-item>
      <el-form-item label="邮箱：">
        <el-input v-model="form.email" placeholder="单行输入"></el-input>
      </el-form-item>
      <el-form-item label="简介">
        <el-input
          type="textarea"
          :rows="4"
          v-model="form.introduction"
          placeholder="请输入"
        ></el-input>
      </el-form-item>
      <el-form-item label="详情：" class="eidt">
        <TEditor ref="editor" v-model="details" />
      </el-form-item>
    </el-form>
    <el-button style="margin-left:160px" type="primary" @click="save()">保存</el-button>
    <el-button @click="$router.go(-1)">取消</el-button>
  </div>
</template>
<script>
import { addCompanyInfoData, getCompanyInfoData } from "@/api/companyManage";
import { Base64 } from "js-base64";
import { uploadImg } from "@/api/patentStore";
import { mixin } from "@/mixins/patentStoreMixin";

export default {
  data() {
    return {
      form: { status: 1 },
      currentObj: {},
      status: false,
      bisibessImg: "",
      dialogVisible: false,
      details: "",
      cateListProps: {
        value: "id", //匹配响应数据中的id
        label: "cname", //匹配响应数据中的name
        children: "children", //匹配响应数据中的children
        checkStrictly: true,
      },
      adressId: [],
      imgFileList: [],
    };
  },
  mixins: [mixin],
  computed: {
    id() {
      return this.$route.query.id;
    },
  },
  created() {
    this.id && this.getcgagencyData();
  },
  methods: {
    handleChange(value) {
      if (value && value.length > 0) {
        this.form.provinceNo = value[0];
        this.form.cityNo = value[1];
        this.form.districtNo = value[2];
      }
    },
    getcgagencyData() {
      getCompanyInfoData(this.id).then((res) => {
        if (res.code === 0) {
          this.details = Base64.decode(res.cgEnterpriseSchool.details);
          const { provinceNo, cityNo, districtNo } = res.cgEnterpriseSchool;
          const data = [Number(provinceNo), Number(cityNo), Number(districtNo)];
          if (res.cgEnterpriseSchool.img) {
            this.imgFileList = [{ url: res.cgEnterpriseSchool.img }];
            document.querySelector(".img_box .el-upload").style.display =
              "none";
          }
          this.form = res.cgEnterpriseSchool;
          data.forEach((item) => {
            if (item) {
              this.adressId.push(item);
            }
          });
        }
      });
    },
    save() {
      this.form.details = Base64.encode(this.details);
      addCompanyInfoData(this.form).then((res) => {
        if (res.code === 0) {
          this.$message.success("操作成功");
          this.$router.go(-1);
        } else {
          this.$message.error(res.msg);
        }
      });
    },
    httpRequest(params) {
      const formData = new FormData();
      formData.append("file", params.file);
      formData.append("flag", 1);

      uploadImg(formData)
        .then((res) => {
          if (res.code === 0) {
            document.querySelector(".img_box .el-upload").style.display =
              "none";
            this.form.img = res.url;
          }
        })
        .catch((e) => {
          console.log("e:", e);
          this.$message.error(e);
        });
    },
    imgRemove() {
      this.form.img = "";
      document.querySelector(".img_box .el-upload").style.display = "block";
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
.add_organ {
  padding: 24px;
  .add_patent {
    .el-form-item__content {
      width: 30%;
    }
    .eidt {
      .el-form-item__content {
        width: 70%;
      }
    }
  }
  .sel_address {
    .address_box {
      margin-bottom: 8px;
      .el-select {
        width: 30%;
        margin-right: 5%;
        &:last-child {
          margin-right: 0;
        }
      }
    }
  }
}
</style>
