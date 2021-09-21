<template>
  <div class="patent_store_box patent_box">
    <Search @search="getQuery"></Search>
    <div class="btn">
      <el-button type="primary" plain @click="goAdd()">新增</el-button>
      <el-button type="primary" plain @click="del()">批量删除</el-button>
    </div>
    <div class="tab">
      <el-table
        :data="tableData"
        v-loading="loading"
        stripe
        style="width: 100%"
        @selection-change="handleSelectionChange"
      >
        <el-table-column type="selection" width="55" />
        <el-table-column prop="id" label="id"> </el-table-column>
        <el-table-column prop="key" label="字典key" width="180">
        </el-table-column>
        <el-table-column
          prop="value"
          label="字典value"
          width="120"
        ></el-table-column>
        <el-table-column prop="type" label="类型" width="180">
        </el-table-column>
        <el-table-column prop="description" label="描述" width="180">
        </el-table-column>
        <el-table-column prop="status" label="状态" width="180">
          <template slot-scope="{ row }">
            {{ row.status == 1 ? "启用" : "禁用" }}
          </template>
        </el-table-column>
        <el-table-column prop="remark" label="备注" width="180">
        </el-table-column>
        <el-table-column prop="createBy" label="创建人"> </el-table-column>
        <el-table-column prop="createDate" label="创建时间" width="180">
        </el-table-column>
        <el-table-column prop="updateBy" label="更新人" width="180">
        </el-table-column>
        <el-table-column prop="updateDate" label="更新时间" width="180">
        </el-table-column>
        <el-table-column fixed="right" label="操作" width="120">
          <template slot-scope="{ row }">
            <el-button type="text" size="medium" @click="goAdd(row)"
              >编辑</el-button
            >
            <el-button type="text" size="medium" @click="delDictinoData(row.id)"
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
  </div>
</template>
<script>
import Search from "./components/search";
import { getSysdictList, delDiction } from "@/api/diction";
import { mixin } from "@/mixins/patentStoreMixin";

import qs from "qs";
export default {
  components: { Search },
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
    };
  },
  created() {
    this.getTableData();
  },
  methods: {
    getTableData() {
      this.loading = true;
      getSysdictList(
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
    delDictinoData(id, flag) {
      let data = [id];
      if (flag && flag == 2) {
        data = id;
      }
      this.$confirm("确认是否删除?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          delDiction(data).then((res) => {
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
    del() {
      if (this.multipleSelection.length === 0) {
        this.$message.warning("请选择删除项");
        return;
      }
      let ids = [];
      this.multipleSelection.forEach((item) => {
        ids.push(item.id);
      });
      this.delDictinoData(ids, 2);
    },
    handleSelectionChange(val) {
      this.multipleSelection = val;
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