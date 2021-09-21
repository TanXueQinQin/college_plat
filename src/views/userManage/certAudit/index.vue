<template>
  <div class="patent_store_box demand_box">
    <Search @search="getQuery"></Search>
    <div class="tab">
      <el-table
        :data="tableData"
        v-loading="loading"
        stripe
        style="width: 100%"
      >
        <el-table-column type="index" label="序号"> </el-table-column>
        <el-table-column label="用户信息" width="180">
          <template slot-scope="{ row }">
            <img v-if="row.wxAvatarUrl" class="avtar" :src="row.wxAvatarUrl" />
            <span v-if="row.nickName">{{ row.nickName }}</span>
            <span v-else>{{ row.username }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="roleText" label="认证身份"> </el-table-column>
        <el-table-column prop="college" label="所属学院" width="180">
        </el-table-column>
        <el-table-column prop="companyName" label="所属企业"> </el-table-column>
        <el-table-column prop="mobile" label="手机号"> </el-table-column>
        <el-table-column prop="createDate" label="地址">
          <template slot-scope="{ row }">
            {{ row.companyProvinceName }}{{ row.companyCityName
            }}{{ row.companyDistrictName }}
          </template>
        </el-table-column>
        <el-table-column prop="createDate" label="创建时间"> </el-table-column>
        <el-table-column fixed="right" label="操作" width="180">
          <template slot-scope="{ row }">
            <el-button @click="goDetail(row)" type="text" size="medium"
              >详情</el-button
            >
            <el-button
              type="text"
              size="medium"
              @click="cartAudit(1, row.id)"
              v-if="row.certification == 3"
              >通过</el-button
            >
            <el-button
              type="text"
              size="medium"
              @click="cartAudit(2, row.id)"
              v-if="row.certification == 3"
              >驳回</el-button
            >
            <el-button type="text" size="medium" @click="del(row.id)">删除</el-button>
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
import { getCertificationList, addCompanyInfoData } from "@/api/certAudit";
import {dels} from "@/api/certAudit";
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
      id: "",
      menuNum: "3", //1 需求管理   2 机构列表   3  企业管理
    };
  },
  created() {
    this.getTableData();
  },
  methods: {
    getTableData() {
      this.loading = true;
      getCertificationList(
        qs.stringify(Object.assign({}, this.pages, this.query))
      ).then((res) => {
        if (res.code === 0) {
          res.page.list.forEach((item) => {
            this.getText(item.role, this.roleList, "roleText", item);
          });
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
    cartAudit(reviewStatus, id) {
      let text = reviewStatus == 1 ? "是否通过审核?" : "是否驳回审核";
      this.$confirm(text, "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          addCompanyInfoData(qs.stringify({ reviewStatus, userId: id })).then(
            (res) => {
              if (res.code == 0) {
                this.$message.success("操作成功");
                this.getTableData()
              } else {
                this.$message.error(res.msg);
              }
            }
          );
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
    goDetail(row) {
      this.$router.push({
        path: "/cartAuditDetail",
        query: {
          row: JSON.stringify(row),
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