<template>
  <div class="patent_store_box demand_box">
    <Search @search="getQuery"></Search>
    <div class="btn">
      <el-button type="primary" plain @click="goAdd()">新增</el-button>
    </div>
    <div class="tab">
      <el-table
        :data="tableData"
        v-loading="loading"
        stripe
        style="width: 100%"
      >
        <el-table-column type="index" label="序号"> </el-table-column>
        <el-table-column prop="typeText" label="文章类型"> </el-table-column>
        <el-table-column prop="title" label="文章标题"> </el-table-column>
        <el-table-column prop="author" label="作者" width="180">
        </el-table-column>
        <el-table-column prop="createDate" label="发布时间"> </el-table-column>
        <el-table-column prop="status" label="状态">
          <template slot-scope="{ row }">
            <el-switch
              v-model="row.status"
              active-color="#409eff"
              inactive-color="#ff4949"
            >
            </el-switch>
          </template>
        </el-table-column>
        <el-table-column fixed="right" label="操作" width="120">
          <template slot-scope="{ row }">
            <el-button @click="goAdd(row.id)" type="text" size="medium"
              >编辑</el-button
            >
            <el-button type="text" size="medium" @click="delInfoData(row.id)"
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
    <AddRemarkDialog
      :id="id"
      :isShowAddRemarkDialog.sync="isShowAddRemarkDialog"
      @update="getTableData"
    />
  </div>
</template>
<script>
import Search from "./components/search";
import { getnewsList, delInfo } from "@/api/infoList";
import { mixin } from "@/mixins/patentStoreMixin";
import AddRemarkDialog from "../../patentManage/demandManage/components/addRemarkDialog.vue";
import qs from "qs";

export default {
  components: { Search, AddRemarkDialog },
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
      multipleSelection: [],
      id: "",
      isShowAddRemarkDialog: false,
    };
  },
  created() {
    this.getTableData();
  },
  methods: {
    getTableData() {
      this.loading = true;
      getnewsList(qs.stringify(Object.assign({}, this.pages, this.query))).then(
        (res) => {
          if (res.code === 0) {
            res.page.list.forEach((item) => {
              item.status = item.status == 1 ? true : false;
              this.getText(item.type, this.newsList, "typeText", item);
            });
            this.tableData = res.page.list;
            this.pages.totalCount = res.page.totalCount;
            this.pages.limit = res.page.pageSize;
            this.pages.page = res.page.currPage;
          }
        }
      );
      this.loading = false;
    },
    delInfoData(id) {
      this.$confirm("确认是否删除?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          delInfo([id]).then((res) => {
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
    addRemark(id) {
      this.id = id;
      this.isShowAddRemarkDialog = true;
    },
    getText(ststus, arr, text, obj) {
      arr.forEach((item) => {
        if (item.value == ststus) {
          this.$set(obj, text, item.key);
        }
      });
    },
    goAdd(id) {
      this.$router.push({ path: "/addInfo", query: { id } });
    },
    getQuery(query) {
      this.query = query;
      this.getTableData();
    },
    goDetail(id) {
      this.$router.push({
        path: "/organzationView",
        query: {
          id,
          gencyTypeList: JSON.stringify(this.gencyTypeList),
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
.demand_box {
  .tab {
    padding: 0 20px 20px 20px;
  }
  .pagezition {
    line-height: 64px;
    text-align: right;
  }
  .btn {
    padding: 12px 20px;
  }
  .avtar {
    width: 30px;
    height: 30px;
    vertical-align: middle;
    margin-right: 8px;
  }
}
</style>