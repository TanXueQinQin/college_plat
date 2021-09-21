<template>
  <div class="header">
    <div class="info_box">
      <div class="user_info">
        <img :src="userInfo.headImg" />
        <span>{{ userInfo.username }}</span>
      </div>
      <div class="user_option">
        <span @click="updatePw()">修改密码</span>
        <span @click="logout()">退出登录</span>
      </div>
    </div>
    <UpdateuserInfoDialog
      :isShowDialog.sync="isShowDialog"
      :userInfo="userInfo"
    ></UpdateuserInfoDialog>
  </div>
</template>
<script>
import { setToken } from "@/utils/auth";
import UpdateuserInfoDialog from "./updateuserInfoDialog";
import { geyUserInfo,logouts } from "@/api/user";

export default {
  components: { UpdateuserInfoDialog },
  data() {
    return {
      isShowDialog: false,
      userInfo: {},
    };
  },
  created() {
    this.getUserInfo();
  },
  methods: {
    updatePw() {
      this.isShowDialog = true;
    },
    getUserInfo() {
      geyUserInfo().then((res) => {
        if (res.code === 0) {
          this.userInfo = res.user;
        }
      });
    },
    logout(){
         this.$confirm("确认是否退出登录?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          logouts().then(res =>{
          if(res.code == 0 ){
             this.$store.commit("setToken", '');
              setToken('');
            this.$router.push('/login')
          }
        })
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
      
    }
  },
};
</script>
<style lang="less">
.header {
  height: 64px;
  background: #fff;
  z-index: 1;
  position: fixed;
  width: calc(100% - 210px);
  top: 0;
  right: 0;
  .info_box {
    position: absolute;
    right: 20px;
    &:hover {
      .user_option {
        display: block;
      }
    }
    .user_info {
      line-height: 64px;

      > img {
        width: 32px;
        height: 32px;
        border-radius: 50%;
        vertical-align: middle;
        margin-right: 8px;
      }
      > span {
        font-size: 16px;
      }
    }
    .user_option {
      &::before,
      &::after {
        content: "";
        width: 0;
        height: 0;
        position: absolute;
        top: -9px;
        left: 15px;
        border-left: 8px solid transparent;
        border-right: 8px solid transparent;
        border-bottom: 8px solid #e4e7ed;
      }

      &::after {
        border-left: 6px solid transparent;
        border-right: 7px solid transparent;
        border-bottom: 7px solid #fff;
        top: -7px;
        left: 17px;
      }
      position: absolute;
      top: 63px;
      padding: 10px 0;
      width: 86px;
      background: #fff;
      border: 1px solid #e4e7ed;
      border-radius: 4px;
      display: none;
      > span {
        cursor: pointer;
        padding: 0px 14px;
        display: block;
        line-height: 30px;
        font-size: 14px;
        color: #666;
        &:hover {
          background: #ecf5ff;
        }
      }
    }
  }
}
</style>