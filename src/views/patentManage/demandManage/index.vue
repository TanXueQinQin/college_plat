<template>
  <div class="patent_store_box demand_box">
    <Search @search="getQuery"></Search>
    <div class="tab">
      <el-table
        :data="tableData"
        v-loading="loading"
        stripe
        style="width: 100%; margin-top: 40px"
      >
        <el-table-column type="index" label="序号"> </el-table-column>
        <el-table-column prop="nickName" label="用户信息" width="180">
          <template slot-scope="{ row }">
            <img v-if="row.wxAvatarUrl" class="avtar" :src="row.wxAvatarUrl" />
            <span>{{ row.nickName }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="roleText" label="用户类型" width="120">
        </el-table-column>
        <el-table-column prop="mobile" label="手机号" width="120">
        </el-table-column>
        <el-table-column prop="createDate" label="创建时间" width="180">
        </el-table-column>
        <el-table-column prop="patentName" label="专利名称" width="180">
        </el-table-column>
        <el-table-column label="专利类型" width="120">
          <template slot-scope="{ row }">
            {{ row.typeText }}
          </template>
        </el-table-column>
        <el-table-column prop="industrySector" label="行业领域" width="180">
        </el-table-column>
        <el-table-column label="法律状态" width="120">
          <template slot-scope="{ row }">
            {{ row.lawStatusText }}
          </template>
        </el-table-column>
        <el-table-column prop="remark" label="备注" width="180">
        </el-table-column>
        <el-table-column prop="status" label="状态" width="180">
          <template slot-scope="{ row }">
            <el-switch
              v-model="row.isStatus"
              active-color="#409eff"
              inactive-color="#ff4949"
            >
            </el-switch>
          </template>
        </el-table-column>
        <el-table-column fixed="right" label="操作" width="140">
          <template slot-scope="{ row }">
            <el-button @click="goDetail(row.id)" type="text" size="medium"
              >详情</el-button
            >
            <el-button type="text" size="medium" @click="addRemark(row.id)"
              >添加备注</el-button
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
      :menuNum="menuNum"
      :isShowAddRemarkDialog.sync="isShowAddRemarkDialog"
      @update="getTableData"
    />
  </div>
</template>
<script>
import Search from "./components/search";
import { getdemandList } from "@/api/demandManage";
import { mixin } from "@/mixins/patentStoreMixin";
import AddRemarkDialog from "./components/addRemarkDialog.vue";
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
      isShowAddRemarkDialog: false,
      loading: false,
      multipleSelection: [],
      id: "",
      menuNum: "1", //1 需求管理   2 机构列表   3  企业管理
    };
  },
  created() {
    this.getTableData();
  },
  methods: {
    getTableData() {
      this.loading = true;
      getdemandList(
        qs.stringify(Object.assign({}, this.pages, this.query))
      ).then((res) => {
        if (res.code === 0) {
          res.page.list.forEach((item) => {
            item.isStatus = item.status ? true : false;
            this.getText(
              item.patentType,
              this.patentTypeList,
              "typeText",
              item
            );
            this.getText(item.role, this.roleList, "roleText", item);
            this.getText(
              item.lawStatus,
              this.laywerList,
              "lawStatusText",
              item
            );
          });
          this.tableData = res.page.list;
          this.pages.totalCount = res.page.totalCount;
          this.pages.limit = res.page.pageSize;
          this.pages.page = res.page.currPage;
        }
      });
      this.loading = false;
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
    getQuery(query) {
      this.query = query;
      this.getTableData();
    },
    goDetail(id) {
      this.$router.push({
        path: "/demandManageView",
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