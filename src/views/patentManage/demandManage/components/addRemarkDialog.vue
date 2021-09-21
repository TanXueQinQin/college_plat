<template>
  <el-dialog
    title="添加备注"
    :visible.sync="isShow"
    width="30%"
    class="add_remark"
    :before-close="handleClose"
  >
    <el-form ref="form" :model="form" label-width="80px">
      <el-form-item label="备注 :">
        <el-input type="textarea" v-model="form.remark"></el-input>
      </el-form-item>
    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button @click="handleClose()">取 消</el-button>
      <el-button type="primary" @click="save()">确 定</el-button>
    </span>
  </el-dialog>
</template>
<script>
import { addRemark } from "@/api/demandManage";
import { addCompanyRemark } from "@/api/companyManage";
import { addServiceOrganRemark } from "@/api/serviceOrgan";

import qs from "qs";
export default {
  props: ["isShowAddRemarkDialog", "id", "menuNum"],
  data() {
    return {
      isShow: false,
      form: {},
    };
  },
  watch: {
    isShowAddRemarkDialog(val) {
      this.isShow = val;
    },
  },
  methods: {
    save() {
      if (!this.form.remark) {
        this.$message.warning("请填写备注~");
        return;
      }
      if (this.menuNum === "1") {
        this.addRemarks();
      } else if (this.menuNum === "2") {
        this.addServiceOrganRemarks();
      } else if (this.menuNum === "3") {
        this.addCompanyRemarks(0);
      }
    },
    addRemarks() {
      addRemark(
        qs.stringify(Object.assign({}, { id: this.id }, this.form))
      ).then((res) => {
        if (res.code == 0) {
          this.$message.success("操作成功");
          this.$emit("update");
          this.handleClose();
        }
      });
    },
    addCompanyRemarks() {
      addCompanyRemark(
        qs.stringify(Object.assign({}, { id: this.id }, this.form))
      ).then((res) => {
        if (res.code == 0) {
          this.$message.success("操作成功");
          this.$emit("update");
          this.handleClose();
        }
      });
    },
    addServiceOrganRemarks() {
      addServiceOrganRemark(
        qs.stringify(Object.assign({}, { id: this.id }, this.form))
      ).then((res) => {
        if (res.code == 0) {
          this.$message.success("操作成功");
          this.$emit("update");
          this.handleClose();
        }
      });
    },
    handleClose() {
      this.isShow = false;
      this.$emit("update:isShowAddRemarkDialog", false);
    },
  },
};
</script>
