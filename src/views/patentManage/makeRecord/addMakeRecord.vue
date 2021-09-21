<template>
  <div class="patent_store_box add_make_store">
    <el-form ref="form" class="add_patent" :model="form" label-width="80px">
      <el-form-item label="用户名称">
        <el-input v-model="form.name" placeholder="单行输入"></el-input>
      </el-form-item>
      <el-form-item label="用户电话">
        <el-input v-model="form.phone" placeholder="单行输入"></el-input>
      </el-form-item>
      <el-form-item label="成交时间">
        <el-date-picker
          v-model="form.tradeDate"
          type="datetime"
          value-format="yyyy-MM-dd hh:mm:ss"
          placeholder="选择日期"
        >
        </el-date-picker>
      </el-form-item>
      <el-form-item label="状态">
        <el-switch
          v-model="status"
          active-color="#409eff"
          inactive-color="#ff4949"
        >
        </el-switch>
      </el-form-item>
      <el-form-item label="专利信息">
        <el-button type="primary" @click="openDialog()" plain
          >选择专利</el-button
        >
        <div class="show_patent" v-if="form.patentName">
          <span>已选专利 : </span>
          <span> {{ form.patentName }}</span>
        </div>
      </el-form-item>
    </el-form>
    <el-button style="margin-left:80px" type="primary" @click="save()">保存</el-button>
    <el-button @click="$router.go(-1)">取消</el-button>
    <SelPatentDialog
      @selObj="getSelObj"
      :isShowMakeRecordDialog.sync="isShowMakeRecordDialog"
    />
  </div>
</template>
<script>
import SelPatentDialog from "./components/selPatentDialog.vue";
import { addMakeRecord, getmakeRecord } from "@/api/makeRecore";
export default {
  components: { SelPatentDialog },
  data() {
    return {
      form: {},
      isShowMakeRecordDialog: false,
      currentObj: {},
      status: false,
    };
  },
  computed: {
    id() {
      return this.$route.query.id;
    },
  },
  created() {
    this.id && this.getMakeRecordData();
  },
  methods: {
    getSelObj(obj) {
      this.form.patentName = obj.patentName;
      this.form.patentId = obj.id;
    },
    getMakeRecordData() {
      getmakeRecord(this.id).then((res) => {
        if (res.code === 0) {
          this.status = res.cgClinch.status == 1 ? true : false;
          this.form = res.cgClinch;
          this.form.patentName = res.cgClinch.cgPatent.patentName;
        }
      });
    },
    save() {
      this.form.status = this.status ? 1 : 0;
      addMakeRecord(this.form).then((res) => {
        if (res.code === 0) {
          this.$message.success("操作成功");
          this.$router.go(-1);
        } else {
          this.$message.error(res.msg);
        }
      });
    },
    openDialog() {
      this.isShowMakeRecordDialog = true;
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
.add_make_store {
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
  .show_patent {
    line-height: 60px;
    color: #606266;
  }
}
</style>
