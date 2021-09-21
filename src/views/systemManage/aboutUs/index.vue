<template>
  <div class="patent_store_box add_patent_store">
    <el-form ref="form" class="add_patent" :model="form" label-width="100px">
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
      <el-form-item label="电话">
        <el-input v-model="form.phone" placeholder="单行输入"></el-input>
      </el-form-item>
      <el-form-item label="手机">
        <el-input v-model="form.mobile" placeholder="单行输入"></el-input>
      </el-form-item>
      <el-form-item label="传真">
        <el-input v-model="form.fax" placeholder="单行输入"></el-input>
      </el-form-item>
      <el-form-item label="邮箱">
        <el-input v-model="form.email" placeholder="单行输入"></el-input>
      </el-form-item>
      <el-form-item label="关于我们" class="eidt">
        <el-input type="textarea"  :rows="4" v-model="form.description" />
        <!-- <TEditor ref="editor" v-model="details" /> -->
      </el-form-item>
    </el-form>
    <el-button style="margin-left:100px" type="primary" @click="save()">保存</el-button>
  </div>
</template>
<script>
import { addUserInfo, getAboutUs } from "@/api/aboutUs";
import { mixin } from "@/mixins/patentStoreMixin";

export default {
  mixins: [mixin],
  data() {
    return {
      form: {
        img: "",
        details: "",
      },
      details: "",
      fileList: [],
      dialogVisible: false,
      cateListProps: {
        value: "id", //匹配响应数据中的id
        label: "cname", //匹配响应数据中的name
        children: "children", //匹配响应数据中的children
        checkStrictly: true,
      },
      adressId: [],
    };
  },
  created() {
    this.getTableData();
  },
  mounted() {},
  methods: {
    getTableData() {
      getAboutUs().then((res) => {
        if (res.code === 0) {
          const { provinceNo, cityNo, districtNo } = res.cgAboutUs;
          const data = [Number(provinceNo), Number(cityNo), Number(districtNo)];
          data.forEach((item) => {
            if (item) {
              this.adressId.push(item);
            }
          });
          this.form = res.cgAboutUs;
        }
      });
    },
    handleChange(value) {
      if (value && value.length > 0) {
        this.form.provinceNo = value[0];
        this.form.cityNo = value[1];
        this.form.districtNo = value[2];
      }
    },
    save() {
      addUserInfo(this.form).then((res) => {
        if (res.code === 0) {
          this.$message.success("操作成功");
        } else {
          this.$message.error(res.msg);
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
.add_patent_store {
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
