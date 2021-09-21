<template>
  <div class="patent_store_box patent_box">
    <Search @search="getQuery"></Search>
    <div class="btn">
      <el-button type="primary" @click="openDialog()" plain>新增</el-button>
    </div>
    <div class="tab">
      <el-table
        :data="tableData"
        v-loading="loading"
        stripe
        style="width: 100%"
      >
        <el-table-column type="index" label="序号"> </el-table-column>
        <el-table-column prop="username" label="用户名" >
        </el-table-column>
        <el-table-column prop="email" label="邮箱" >
        </el-table-column>
        <el-table-column prop="mobile" label="手机号">
        </el-table-column>
        <el-table-column prop="status" label="状态">
          <template slot-scope="{ row }">
            {{ row.status == 1 ? "正常" : "禁用" }}
          </template>
        </el-table-column>
        <el-table-column fixed="right" label="操作">
          <template slot-scope="{ row }">
             <el-button type="text" size="medium" @click="openDialog(row)"
              >编辑</el-button
            >
            <el-button type="text" size="medium" @click="del(row.id)"
              >删除</el-button
            >
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div class="pagezition">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page.sync="pages.page"
        :page-size="pages.limit"
        layout="total, prev, pager, next"
        :total="pages.totalCount"
      >
      </el-pagination>
    </div>
    <AddUserDialog :selObj="selObj" @update="getTableData"  :isShowDialog.sync="isShowDialog"></AddUserDialog>

  </div>
</template>
<script>
import Search from "./components/search";
import { getSysUserList,dels } from "@/api/systemUserList";
import { mixin } from "@/mixins/patentStoreMixin";
import AddUserDialog from "../../systemManage/systemUserList/components/addUserDialog.vue";

import qs from "qs";
export default {
  components: { Search,AddUserDialog },
  mixins: [mixin],
  data() {
    return {
      tableData: [],
      query: {},
      pages: {
        totalCount: 0,
        limit: 10,
        page: 1,
      },
      loading: false,
      selObj:{},
      isShowDialog: false,


    };
  },
  created() {
    this.getTableData();
  },
  methods: {
       openDialog(row) {
      this.isShowDialog = true;
      this.selObj = row ? row : {}
    },
    getTableData() {
      this.loading = true;
      getSysUserList(
        qs.stringify(Object.assign({}, this.pages, this.query))
      ).then((res) => {
        console.log(this.laywerList);
        if (res.code === 0) {
          this.tableData = res.page.list;
          this.pages.totalCount = res.page.totalCount;
          this.pages.limit = res.page.pageSize;
          this.pages.page = res.page.currPage;
        }
      });
      this.loading = false;
    },
    getText(ststus, arr, text, obj) {
      arr.forEach((item) => {
        if (item.value == ststus) {
          this.$set(obj, text, item.key);
        }
      });
    },
    del(id) {
      this.$confirm("确认是否删除?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          dels([id]).then((res) => {
            if (res.code === 0) {
              this.$message.success("操作成功");
              this.getTableData();
            }
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
    },
    getQuery(query) {
      this.query = query;
      this.getTableData();
    },
   
    goAdd(row) {
      this.$router.push({ path: "/addDiction", query: { row } });
    },
    goDetail(id) {
      this.$router.push({
        path: "/patentStoreView",
        query: {
          id,
          laywerList: JSON.stringify(this.laywerList),
          patentTypeList: JSON.stringify(this.patentTypeList),
          patentStatusList: JSON.stringify(this.patentStatusList),
        },
      });
    },

    handleSizeChange() {
      this.pages.page = 1;
      this.getTableData(this.pages);
    },
    handleCurrentChange(e) {
      this.pages.page = e;
      this.getTableData(this.pages);
    },
  },
};
</script>
<style lang="less" scoped>
.patent_store_box {
  width: calc(100% - 234px);
  height: calc(100% - 112px);
  background: #fff;
  margin: 24px 0 24px 234px;
}
.patent_box {
  .tab {
    padding: 12px 20px 20px 20px;
  }
  .pagezition {
    line-height: 64px;
    text-align: right;
  }
  .btn {
    padding: 12px 20px;
  }
}
</style>