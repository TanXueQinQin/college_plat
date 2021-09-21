<template>
  <div class="patent_store_box patent_box">
    <Search @search="getQuery"></Search>
    <div class="btn">
      <el-button type="primary" plain @click="goAdd()">新增</el-button>
      <el-button type="primary" plain @click="download()">批量导出</el-button>
    </div>
    <div class="tab">
      <el-table
        :data="tableData"
        v-loading="loading"
        stripe
        style="width: 100%"
      >
        <el-table-column type="index" label="序号"> </el-table-column>
        <el-table-column prop="patentName" label="专利名称" width="180">
        </el-table-column>
        <el-table-column label="专利类型" width="120">
          <template slot-scope="{ row }">
            {{ row.typeText }}
          </template>
        </el-table-column>
        <el-table-column label="法律状态" width="120">
          <template slot-scope="{ row }">
            {{ row.lawStatusText }}
          </template>
        </el-table-column>
        <el-table-column prop="applyNo" label="申请号" width="180">
        </el-table-column>
        <el-table-column prop="applyDate" label="申请日" width="180">
        </el-table-column>
        <el-table-column prop="publicNo" label="公开号" width="180">
        </el-table-column>
        <el-table-column prop="publicDate" label="公开日" width="180">
        </el-table-column>
        <el-table-column prop="applyPeople" label="申请人"> </el-table-column>
        <el-table-column prop="inventor" label="发明人" width="180">
        </el-table-column>
        <el-table-column prop="agency" label="代理机构" width="180">
        </el-table-column>
        <el-table-column prop="agencyPeople" label="代理人" width="180">
        </el-table-column>
        <el-table-column prop="estimatedPrice" label="预估价">
        </el-table-column>
        <el-table-column prop="status" label="状态" width="120">
          <template slot-scope="{ row }">
            {{ row.statusText }}
          </template>
        </el-table-column>
        <el-table-column fixed="right" label="操作" width="150">
          <template slot-scope="{ row }">
            <el-button @click="goDetail(row.id)" type="text" size="medium"
              >详情</el-button
            >
            <el-button type="text" size="medium" @click="goAdd(row.id)"
              >编辑</el-button
            >
            <el-button type="text" size="medium" @click="delPatentData(row.id)"
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
import { getPatentList, delPatent,exportDetails } from "@/api/patentStore";
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
    download () {
    var query = Object.assign(this.query)
    exportDetails(query).then(res=>{
      if(res){
         let blob = new Blob([res.data], {
          type: 'application/vnd.ms-excel' 
        })
        let link = document.createElement('a')
        link.href = window.URL.createObjectURL(blob)
        link.download = '专利库数据导出.xls'
        var event = new MouseEvent('click')
        link.dispatchEvent(event)
      }
    })
   },
    getTableData() {
      this.loading = true;
      getPatentList(
        qs.stringify(Object.assign({}, this.pages, this.query))
      ).then((res) => {
        console.log(this.laywerList);
        if (res.code === 0) {
          res.page.list.forEach((item) => {
            this.getText(
              item.lawStatus,
              this.laywerList,
              "lawStatusText",
              item
            );
            this.getText(item.type, this.patentTypeList, "typeText", item);
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
    getText(ststus, arr, text, obj) {
      arr.forEach((item) => {
        if (item.value == ststus) {
          this.$set(obj, text, item.key);
        }
      });
    },
    delPatentData(id) {
      this.$confirm("确认是否删除?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          delPatent([id]).then((res) => {
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
    goAdd(id) {
      this.$router.push({ path: "/addPatentStore", query: { id } });
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