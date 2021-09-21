<template>
  <div class="patent_store_box add_make_store">
    <el-form ref="form" class="add_patent" :model="form" label-width="80px">
      <el-form-item label="字典key">
        <el-input v-model="form.key" placeholder="单行输入"></el-input>
      </el-form-item>
      <el-form-item label="字典value">
        <el-input v-model="form.value" placeholder="单行输入"></el-input>
      </el-form-item>
      <el-form-item label="类型">
        <el-input v-model="form.type" placeholder="单行输入"></el-input>
      </el-form-item>
      <el-form-item label="描述">
        <el-input v-model="form.description" placeholder="单行输入"></el-input>
      </el-form-item>
      <el-form-item label="状态">
        <el-select v-model="form.status" placeholder="请选择">
          <el-option
            v-for="item in statusList"
            :key="item.value"
            :label="item.key"
            :value="item.value"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="备注">
        <el-input v-model="form.remark" placeholder="单行输入"></el-input>
      </el-form-item>
    </el-form>
    <el-button style="margin-left:80px" type="primary" @click="save()">保存</el-button>
    <el-button @click="$router.go(-1)">取消</el-button>
  </div>
</template>
<script>
import { addDiction, updateDiction } from "@/api/diction";
import { mixin } from "@/mixins/patentStoreMixin";

export default {
  mixins: [mixin],
  data() {
    return {
      form: {},
      currentObj: {},
      status: false,
    };
  },
  computed: {
    row() {
      return this.$route.query.row;
    },
  },
  created() {
    this.form = this.row && this.row.id ? this.row : {};
  },
  methods: {
    save() {
      if (this.row && this.row.id) {
        this.update();
      } else {
        this.add();
      }
    },
    add() {
      addDiction(this.form).then((res) => {
        if (res.code === 0) {
          this.$message.success("操作成功");
          this.$router.go(-1);
        } else {
          this.$message.error(res.msg);
        }
      });
    },
    update() {
      delete this.form.createBy;
      delete this.form.createDate;
      delete this.form.updateBy;
      delete this.form.updateDate;

      updateDiction(this.form).then((res) => {
        if (res.code === 0) {
          this.$message.success("操作成功");
          this.$router.go(-1);
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
