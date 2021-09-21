<template>
  <div class="patent_store_box add_patent_store">
    <el-form ref="form" class="add_patent" :model="form" label-width="80px">
      <el-form-item label="专利名称">
        <el-input v-model="form.patentName" placeholder="单行输入"></el-input>
      </el-form-item>
      <el-form-item label="预估价">
        <el-input
          v-model="form.estimatedPrice"
          placeholder="单行输入"
        ></el-input>
      </el-form-item>
      <el-form-item label="图片">
        <!-- <el-upload
          class="upload-demo inline-block"
          action="string"
          :http-request="httpRequest"
          :on-remove="handleRemove"
          :show-file-list="true"
          :file-list="fileList"
          :limit="1"
          :on-exceed="handleExceed"
        >
          <el-button type="primary" size="medium">上传</el-button>
        </el-upload> -->
        <el-upload
          action="string"
          list-type="picture-card"
          :http-request="httpRequest"
          :on-preview="handlePictureCardPreview"
          :on-remove="handleRemove"
          :show-file-list="true"
          :file-list="fileList"
          :limit="1"
          :on-exceed="handleExceed"
        >
          <i class="el-icon-plus"></i>
        </el-upload>
        <el-dialog :visible.sync="dialogVisible">
          <img width="100%" :src="form.img" alt="" />
        </el-dialog>
      </el-form-item>
      <el-form-item label="申请号">
        <el-input v-model="form.applyNo" placeholder="单行输入"></el-input>
      </el-form-item>
      <el-form-item label="申请日">
        <el-date-picker
          v-model="form.applyDate"
          type="datetime"
          value-format="yyyy-MM-dd hh:mm:ss"
          placeholder="选择日期"
        >
        </el-date-picker>
      </el-form-item>
      <el-form-item label="公开号">
        <el-input v-model="form.publicNo" placeholder="单行输入"></el-input>
      </el-form-item>
      <el-form-item label="公开日">
        <el-date-picker
          v-model="form.publicDate"
          type="datetime"
          value-format="yyyy-MM-dd hh:mm:ss"
          placeholder="选择日期"
        >
        </el-date-picker>
      </el-form-item>
      <el-form-item label="专利类型">
        <el-select v-model="form.type" placeholder="请选择">
          <el-option
            v-for="item in patentTypeList"
            :key="item.value"
            :label="item.key"
            :value="item.value"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="法律状态">
        <el-select v-model="form.lawStatus" placeholder="请选择">
          <el-option
            v-for="item in laywerList"
            :key="item.value"
            :label="item.key"
            :value="item.value"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="发明人">
        <el-input v-model="form.inventor" placeholder="单行输入"></el-input>
      </el-form-item>
      <el-form-item label="申请人">
        <el-input v-model="form.applyPeople" placeholder="单行输入"></el-input>
      </el-form-item>
      <el-form-item label="专利权人">
        <el-input v-model="form.patentee" placeholder="单行输入"></el-input>
      </el-form-item>
      <el-form-item label="代理机构">
        <el-input v-model="form.agency" placeholder="单行输入"></el-input>
      </el-form-item>
      <el-form-item label="代理人">
        <el-input v-model="form.agencyPeople" placeholder="单行输入"></el-input>
      </el-form-item>
      <el-form-item label="专利维持">
        <el-select v-model="form.maintainState" placeholder="请选择">
          <el-option
            v-for="item in patentStatusList"
            :key="item.value"
            :label="item.key"
            :value="item.value"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="简介">
        <el-input
          type="textarea"
          :rows="4"
          v-model="form.introduction"
          placeholder="请输入"
        ></el-input>
      </el-form-item>
      <el-form-item label="详情" class="eidt">
        <TEditor ref="editor" v-model="details" />
      </el-form-item>
    </el-form>
    <el-button style="margin-left:80px" type="primary" @click="save()">保存</el-button>
    <el-button @click="$router.go(-1)">取消</el-button>
  </div>
</template>
<script>
import { uploadImg, addPatent, getPatent } from "@/api/patentStore";
import { Base64 } from "js-base64";
import { mixin } from "@/mixins/patentStoreMixin";
export default {
  data() {
    return {
      form: {
        img: "",
        details: "",
      },
      details: "",
      fileList: [],
      dialogVisible: false,
    };
  },
  mixins: [mixin],
  created() {
    this.id && this.getPatentData();
  },
  computed: {
    id() {
      return this.$route.query.id;
    },
  },
  mounted() {},
  methods: {
    handlePictureCardPreview(file) {
      this.form.img = file.url;
      this.dialogVisible = true;
    },
    getPatentData() {
      getPatent(this.id).then((res) => {
        if (res.code === 0) {
          this.details = Base64.decode(res.cgPatent.details);
          res.cgPatent.type = `${res.cgPatent.type}`;
          res.cgPatent.lawStatus = `${res.cgPatent.lawStatus}`;
          res.cgPatent.maintainState = `${res.cgPatent.maintainState}`;
          if (res.cgPatent.img) {
            this.fileList = [{ url: res.cgPatent.img }];
            document.querySelector(".el-upload").style.display = "none";
          }
          this.form = res.cgPatent;
        }
      });
    },
    save() {
      this.form.details = Base64.encode(this.details);
      addPatent(this.form).then((res) => {
        if (res.code === 0) {
          this.$message.success("操作成功");
          this.$router.push("/");
        } else {
          this.$message.error(res.msg);
        }
      });
    },
    httpRequest(params) {
      const formData = new FormData();
      formData.append("file", params.file);
      formData.append("flag", 1);

      uploadImg(formData)
        .then((res) => {
          if (res.code === 0) {
            console.log(res);
            document.querySelector(".el-upload").style.display = "none";
            this.form.img = res.url;
          }
        })
        .catch((e) => {
          console.log("e:", e);
          this.$message.error(e);
        });
    },
    handleRemove() {
      this.form.img = "";
      document.querySelector(".el-upload").style.display = "block";
    },
    handleExceed(files, fileList) {
      this.$message.warning(
        `当前限制选择 1 个文件，本次选择了 ${files.length} 个文件，共选择了 ${
          files.length + fileList.length
        } 个文件`
      );
    },
  },
};
</script>
<style lang="less">
.patent_store_box {
  width: calc(100% - 234px);
  height: calc(100% - 112px);
  background: #fff;
  margin: 24px 0 24px 234px;
}
.add_patent_store {
  padding: 24px;

  .add_patent {
    .el-form-item__content {
      width: 30%;
    }
    .eidt {
      .el-form-item__content {
        width: 70%;
      }
    }
  }
}
</style>
