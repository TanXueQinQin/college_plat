<template>
  <div class="patent_store_box store_box">
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
        @selection-change="handleSelectionChange"
      >
        <el-table-column type="selection" width="55" />
        <el-table-column type="index" label="序号"> </el-table-column>
        <el-table-column
          prop="cgPatent.patentName"
          label="专利名称"
          width="180"
        >
        </el-table-column>
        <el-table-column prop="cgPatent.publicNo" label="公开号" width="180">
        </el-table-column>
        <el-table-column prop="cgPatent.type" label="专利类型" width="120">
          <template slot-scope="{ row }">
            {{ row.cgPatent.typeText }}
          </template>
        </el-table-column>
        <el-table-column prop="cgPatent.agency" label="代理机构" width="180">
        </el-table-column>
        <el-table-column
          prop="cgPatent.agencyPeople"
          label="代理人"
          width="180"
        >
        </el-table-column>
        <el-table-column
          prop="cgPatent.estimatedPrice"
          label="预估价"
          width="120"
        >
        </el-table-column>
        <el-table-column prop="nickName" label="用户信息" width="180">
          <template slot-scope="{ row }">
            <img v-if="row.wxAvatarUrl" class="avtar" :src="row.wxAvatarUrl" />
            <span>{{ row.nickName }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="roleText" label="用户类型" width="120">
        </el-table-column>
        <el-table-column prop="applyUserName" label="联系人" width="180">
        </el-table-column>
        <el-table-column prop="phone" label="联系电话" width="120">
        </el-table-column>
        <el-table-column prop="createDate" label="申请时间" width="180">
        </el-table-column>
        <el-table-column fixed="right" label="操作" width="120">
          <template slot-scope="{ row }">
            <el-button @click="goDetail(row.id)" type="text" size="medium"
              >详情</el-button
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
import { getPatentFrowordList, delPatentForword,exportDetails } from "@/api/patentForword";
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
      getPatentFrowordList(
        qs.stringify(Object.assign({}, this.pages, this.query))
      ).then((res) => {
        if (res.code === 0) {
          res.page.list.forEach((item) => {
            if (item.cgPatent && item.cgPatent.type) {
              this.getText(
                item.cgPatent.type,
                this.patentTypeList,
                "typeText",
                item.cgPatent
              );
            }
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
   download () {
    var query = Object.assign(this.query)
    exportDetails(query).then(res=>{
      if(res){
         let blob = new Blob([res.data], {
          type: 'application/vnd.ms-excel' 
        })
        let link = document.createElement('a')
        link.href = window.URL.createObjectURL(blob)
        link.download = '专利预约数据导出.xls'
        var event = new MouseEvent('click')
        link.dispatchEvent(event)
      }
    })
   },
    delPatentData(id) {
      this.$confirm("确认是否删除?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          delPatentForword([id]).then((res) => {
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
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
    goDetail(id) {
      this.$router.push({
        path: "/patentForwordView",
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
.store_box {
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