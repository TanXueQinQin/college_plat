<template>
  <el-dialog
    title="提示"
    :visible.sync="isShow"
    width="30%"
    :before-close="handleClose"
    :append-to-body="true"
  >
    <el-form
      ref="form"
      label-width="100px"
      :rules="rules"
      class="demo-ruleForm"
      :model="form"
    >
      <el-form-item label="原密码" prop="password">
        <el-input v-model="form.password"></el-input>
      </el-form-item>
      <el-form-item label="新密码" prop="newPassword">
        <el-input v-model="form.newPassword"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm('form')"
          >确认</el-button
        >
        <el-button @click="handleClose">取消</el-button>
      </el-form-item>
    </el-form>
  </el-dialog>
</template>
<script>
import {updateUserPw} from '@/api/systemUserList'
export default {
  props: {
    isShowDialog: {
      type: Boolean,
      default: false,
    },
    userInfo: {
      type: Object,
      default: () => {},
    },
  },
  watch: {
    isShowDialog(val) {
      this.isShow = val;
    },
  },
  data() {
    return {
      isShow: false,
      form: {},
      rules: {
        password: [
          { required: true, message: "请输入原密码", trigger: "blur" },
        ],
          newPassword: [
          { required: true, message: "请输入新密码", trigger: "blur" },
        ],
      },
    };
  },
  created() {
  
  },
  methods: {
    handleClose() {
      this.isShow = false;
      this.resetForm()
      this.$emit("update:isShowDialog", false);
    },
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
         updateUserPw(this.form).then(res =>{
          if(res.code == 0){
            this.$message.success('操作成功')
             this.handleClose()
          }else{
            this.$message.error(res.msg)
          }
         })
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    resetForm() {
        Object.keys(this.form).forEach((v) => {
        this.form[v] = "";
      });
    },
  },
};
</script>