<template>
  <div class="patent_store_box add_organ">
    <el-form ref="form" class="add_patent" :model="form" label-width="160px">
      <el-form-item label="文章类型：">
        <el-select v-model="form.type" placeholder="请选择">
          <el-option
            v-for="item in newsList"
            :key="item.value"
            :label="item.key"
            :value="item.value"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="标题：">
        <el-input v-model="form.title" placeholder="单行输入"></el-input>
      </el-form-item>
      <el-form-item label="作者：">
        <el-input v-model="form.author" placeholder="单行输入"></el-input>
      </el-form-item>
      <el-form-item label="封面图片：">
        <el-upload
          action="string"
          class="img_box"
          list-type="picture-card"
          :http-request="httpRequest"
          :on-remove="imgRemove"
          :show-file-list="true"
          :limit="1"
          :file-list="imgFileList"
        >
          <i class="el-icon-plus"></i>
        </el-upload>
        <el-dialog :visible.sync="dialogVisible">
          <img width="100%" :src="form.img" alt="" />
        </el-dialog>
      </el-form-item>
      <el-form-item label="状态：">
        <el-switch
          v-model="status"
          active-color="#409eff"
          inactive-color="#ff4949"
        >
        </el-switch>
      </el-form-item>
      <el-form-item label="简介">
        <el-input
          type="textarea"
          :rows="4"
          v-model="form.introduction"
          placeholder="请输入"
        ></el-input>
      </el-form-item>
      <el-form-item label="内容：" class="eidt">
        <TEditor ref="editor" v-model="details" />
      </el-form-item>
    </el-form>
    <el-button style="margin-left:160px" type="primary" @click="save()">保存</el-button>
    <el-button @click="$router.go(-1)">取消</el-button>
  </div>
</template>
<script>
import { addInfodata, getInfoData } from "@/api/infoList";
import { uploadImg } from "@/api/patentStore";
import { Base64 } from "js-base64";

import { mixin } from "@/mixins/patentStoreMixin";

export default {
  data() {
    return {
      form: { status: 1 },
      currentObj: {},
      status: false,
      bisibessImg: "",
      dialogVisible: false,
      details: "",
      imgFileList: [],
    };
  },
  mixins: [mixin],
  computed: {
    id() {
      return this.$route.query.id;
    },
  },
  created() {
    this.id && this.getInfoDatas();
  },

  methods: {
    getInfoDatas() {
      getInfoData(this.id).then((res) => {
        if (res.code === 0) {
          this.details = Base64.decode(res.cgNews.content);
          this.status = res.cgNews.status == 1 ? true : false;
          res.cgNews.type = `${res.cgNews.type}`;
          if (res.cgNews.img) {
            this.imgFileList = [{ url: res.cgNews.img }];
            document.querySelector(".img_box .el-upload").style.display =
              "none";
          }
          this.form = res.cgNews;
        }
      });
    },
    save() {
      this.form.status = this.status ? 1 : 0;
      this.form.content = Base64.encode(this.details);
      addInfodata(this.form).then((res) => {
        if (res.code === 0) {
          this.$message.success("操作成功");
          this.$router.go(-1);
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
            document.querySelector(".img_box .el-upload").style.display =
              "none";
            this.form.img = res.url;
          }
        })
        .catch((e) => {
          console.log("e:", e);
          this.$message.error(e);
        });
    },
    imgRemove() {
      this.form.img = "";
      document.querySelector(".img_box .el-upload").style.display = "block";
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
.add_organ {
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
