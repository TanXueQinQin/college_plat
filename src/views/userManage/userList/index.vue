<template>
  <div class="patent_store_box demand_box">
    <Search @search="getQuery"></Search>
    <div class="btn">
      <el-button type="primary" @click="download()" plain>批量导出</el-button>
    </div>
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
        <el-table-column prop="roleText" label="用户类型"> </el-table-column>
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
        <el-table-column fixed="right" label="操作" width="140">
          <template slot-scope="{ row }">
            <el-button @click="goDetail(row.id)" type="text" size="medium"
              >详情</el-button
            >
            <el-button type="text" size="medium">删除</el-button>
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
import { getUserList,exportDetails } from "@/api/userList";
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
    download () {
    var query = Object.assign(this.query)
    exportDetails(query).then(res=>{
      if(res){
         let blob = new Blob([res.data], {
          type: 'application/vnd.ms-excel' 
        })
        let link = document.createElement('a')
        link.href = window.URL.createObjectURL(blob)
        link.download = '用户列表数据导出.xls'
        var event = new MouseEvent('click')
        link.dispatchEvent(event)
      }
    })
   },
    getTableData() {
      this.loading = true;
      getUserList(qs.stringify(Object.assign({}, this.pages, this.query))).then(
        (res) => {
          if (res.code === 0) {
            res.page.list.forEach((item) => {
              this.getText(item.role, this.roleList, "roleText", item);
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
        path: "/userDetail",
        query: {
          id,
          roleList: JSON.stringify(this.roleList),
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