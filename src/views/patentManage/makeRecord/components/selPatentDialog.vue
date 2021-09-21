<template>
    <el-dialog
      title="选择专利"
      :visible.sync="isShow"
      width="80%"
      class="add_make"
      :before-close="handleClose">
      <div class="tab">
      <el-table
        :data="tableData"
        v-loading="loading"
        stripe
        style="width: 100%"
        @current-change="getCurrentObj"
      >
        <el-table-column type="index" label="序号"> </el-table-column>
        <el-table-column prop="patentName" label="专利名称" width="180">
        </el-table-column>
        <el-table-column label="专利类型"  width="120">
          <template slot-scope="{ row }">
            {{ row.typeText }}
          </template>
        </el-table-column>
        <el-table-column label="法律状态"  width="120">
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
        <el-table-column prop="agencyPeople" label="代理人"  width="180"> </el-table-column>
        <el-table-column prop="estimatedPrice" label="预估价">
        </el-table-column>
        <el-table-column prop="status" label="状态"  width="120">
          <template slot-scope="{ row }">
            {{ row.statusText }}
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
      <span slot="footer" class="dialog-footer">
        <el-button @click="handleClose()">取 消</el-button>
    <el-button type="primary" @click="save()">确 定</el-button>
  </span>
</el-dialog>
</template>
<script>
import { getPatentList } from "@/api/patentStore";
import { mixin } from "@/mixins/patentStoreMixin";
import qs from "qs";
export default {
    props:{
        isShowMakeRecordDialog:{
            type:Boolean,
            default:false
        },
        id:{
            type:String,
            default:''
        }
    },
    mixins:[mixin],
    data(){
        return{
          isShow:false,
          tableData: [],
          pages: {
            totalCount: 0,
            limit: 10,
            page: 1,
          },
          loading: false,
          currentObj:{}
        }
    },
    watch:{
        isShowMakeRecordDialog(val){
            this.isShow = val
        }
    },
    created(){
      this.getTableData()
    },
    methods:{
    getTableData() {
      this.loading = true;
      getPatentList(
        qs.stringify(Object.assign({}, this.pages, this.query))
      ).then((res) => {
        console.log(this.laywerList);
        if (res.code === 0) {
          res.page.list.forEach((item) => {
            console.log(item.lawStatus);
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
     getCurrentObj(val) {
        this.currentObj = val
      },
    save(){
       this.$emit('selObj',this.currentObj)
       this.handleClose()
    },
    getText(ststus, arr, text, obj) {
      arr.forEach((item) => {
        if (item.value == ststus) {
          this.$set(obj, text, item.key);
        }
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
        handleClose(){
         this.isShow = false
         this.$emit('update:isShowMakeRecordDialog',false)
        }
    }
}
</script>
<style lang="less" scoped>
 .add_make{
     .pagezition {
        margin-top: 20px;
        text-align: right;
      }
 }
</style>