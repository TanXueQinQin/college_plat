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
        <el-table-column prop="code" label="机构代码" width="120">
        </el-table-column>
        <el-table-column prop="typeText" label="机构类型" width="120">
        </el-table-column>
        <el-table-column prop="nickName" label="机构信息" width="180">
          <template slot-scope="{ row }">
            <img
              v-if="row.businessLicense"
              class="avtar"
              :src="row.businessLicense"
            />
            <span>{{ row.agencyName }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="businessScope" label="业务范围" width="180">
        </el-table-column>
        <el-table-column prop="serviceProduct" label="服务产品" width="180">
        </el-table-column>
        <el-table-column
          prop="legalRepresentative"
          label="法定代表人"
          width="180"
        >
        </el-table-column>
        <el-table-column prop="phone" label="联系电话" width="180">
        </el-table-column>
        <el-table-column prop="remark" label="公司地址" width="180">
          <template slot-scope="{ row }">
            {{ row.provinceName }}{{ row.cityName }}{{ row.districtname
            }}
          </template>
        </el-table-column>
        <el-table-column
          prop="statusText"
          label="状态"
          width="100"
        ></el-table-column>
        <el-table-column fixed="right" label="操作" width="180">
          <template slot-scope="{ row }">
            <el-button @click="goDetail(row.id)" type="text" size="medium"
              >详情</el-button
            >
            <el-button @click="goAdd(row.id)" type="text" size="medium"
              >编辑</el-button
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
import { getcgagencyList } from "@/api/serviceOrgan";
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
      menuNum: "2", //1 需求管理   2 机构列表   3  企业管理
    };
  },
  created() {
    this.getTableData();
  },
  methods: {
    getTableData() {
      this.loading = true;
      getcgagencyList(
        qs.stringify(Object.assign({}, this.pages, this.query))
      ).then((res) => {
        if (res.code === 0) {
          res.page.list.forEach((item) => {
            this.getText(item.type, this.gencyTypeList, "typeText", item);
            this.getText(item.status, this.statusList, "statusText", item);
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
    goAdd(id) {
      this.$router.push({ path: "/addOrganization", query: { id } });
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