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
      <el-form-item label="用户名" prop="username">
        <el-input v-model="form.username"></el-input>
      </el-form-item>
      <el-form-item   v-if="!isShowPw" label="密码" prop="password">
        <el-input v-model="form.password"></el-input>
      </el-form-item>
      <el-form-item   v-if="!isShowPw" label="确认密码" prop="surepassword">
        <el-input v-model="form.surepassword"></el-input>
      </el-form-item>
       <el-form-item   v-if="isShowPw" label="新密码">
        <el-input v-model="form.newpassword"></el-input>
      </el-form-item>
      <el-form-item   v-if="isShowPw" label="确认密码">
        <el-input v-model="form.newsurepassword"></el-input>
      </el-form-item>
      <el-form-item label="邮箱" prop="email">
        <el-input v-model="form.email"></el-input>
      </el-form-item>
      <el-form-item label="手机号" prop="mobile">
        <el-input v-model="form.mobile"></el-input>
      </el-form-item>
      <el-form-item label="状态" prop="status">
        <el-radio-group v-model="form.status">
          <el-radio label="0">禁用</el-radio>
          <el-radio label="1">正常</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm('form')">确定</el-button>
        <el-button @click="handleClose()">取消</el-button>
      </el-form-item>
    </el-form>
   
  </el-dialog>
</template>
<script>
import { addUser,updateUser } from "@/api/systemUserList";
export default {
  props: {
    isShowDialog: {
      type: Boolean,
      default: false,
    },
    selObj:{
      type:Object,
      default:()=>{}
    }
  },
  watch: {
    isShowDialog(val) {
      this.isShow = val;
      console.log(this.selObj);
      if(this.selObj && this.selObj.id){
        console.log(this.selObj);
        this.form = this.selObj
         this.form.status = `${this.form.status}`
         this.isShowPw = true
      }

    },
  },
  data() {
    return {
      isShow: false,
      isShowPw:false,
      form: {
      },
      rules: {
        username: [
          { required: true, message: "请输入用户名", trigger: "blur" },
        ],
        password: [{ required: true, message: "请输入密码", trigger: "blur" }],
        surepassword: [
          { required: true, message: "请输入确认密码", trigger: "blur" },
        ],
        email: [{ required: true, message: "请输入邮箱", trigger: "blur" }],
        mobile: [{ required: true, message: "请输入手机号", trigger: "blur" }],
      },
    };
  },
  methods: {
    handleClose() {
      this.isShow = false;
      this.isShowPw = false
      this.$emit("update:isShowDialog", false);
      this.$emit('update')
      this.resetForm()
    },
    submitForm(formName) {
    
      if((this.form.surepassword ||  this.form.password) && this.form.surepassword !== this.form.password){
        this.$message.error('两次密码输入不一致');
        return
      }
      this.$refs[formName].validate((valid) => {
        if (valid) {
          if(this.isShowPw){
            this.update()
          }else{
            this.add()
          }
        } else {
          return false;
        }
      });
    },
    add(){
      addUser(this.form).then((res) => {
            if(res.code == 0 ){
              this.$message.success('操作成功')
              this.handleClose()
            }
          });
    },
    update(){
        if((this.form.newpassword || this.form.newsurepassword) && this.form.newpassword != this.form.newsurepassword){
           this.$message.error('两次密码输入不一致');
            return
        }else if(this.form.newpassword && this.form.newsurepassword && this.form.newpassword == this.form.newsurepassword ){
          this.form.password = this.form.newpassword
        }
        updateUser(this.form).then((res) => {
            if(res.code == 0 ){
              this.$message.success('操作成功')
              this.handleClose()
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