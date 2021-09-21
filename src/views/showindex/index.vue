<template>
  <div class="patent_store_box show_index">
    <el-scrollbar style="height: 90%">
    <el-row>
      <el-col :span="8">
        <div class="patent_info">
          <span class="title">专利信息</span>
          <el-row>
            <el-col :span="8">
              <span>15262</span>
              <span>专利库</span>
            </el-col>
            <el-col :span="8">
              <span>15262</span>
              <span>专利库</span>
            </el-col>
            <el-col :span="8">
              <span>15262</span>
              <span>专利库</span>
            </el-col>
          </el-row>
        </div>
      </el-col>
      <el-col :span="16">
        <div class="people_info">
          <el-row>
            <el-col :span="6">
              <div class="info_box">
                <el-row>
                  <el-col :span="12">
                    <div class="img_box">
                      <img src="../../assets/img/shuijiao.jpg" alt="" />
                    </div>
                  </el-col>
                  <el-col :span="12">
                    <span>123456</span>
                    <span>用户</span>
                  </el-col>
                </el-row>
              </div>
            </el-col>
            <el-col :span="6">
              <div class="info_box">
                <el-row>
                  <el-col :span="12">
                    <div class="img_box">
                      <img src="../../assets/img/shuijiao.jpg" alt="" />
                    </div>
                  </el-col>
                  <el-col :span="12">
                    <span>123456</span>
                    <span>用户</span>
                  </el-col>
                </el-row>
              </div>
            </el-col>
            <el-col :span="6">
              <div class="info_box">
                <el-row>
                  <el-col :span="12">
                    <div class="img_box">
                      <img src="../../assets/img/shuijiao.jpg" alt="" />
                    </div>
                  </el-col>
                  <el-col :span="12">
                    <span>123456</span>
                    <span>用户</span>
                  </el-col>
                </el-row>
              </div>
            </el-col>
            <el-col :span="6">
              <div class="info_boxs">
                <el-row>
                  <el-col :span="12">
                    <div class="img_box">
                      <img src="../../assets/img/shuijiao.jpg" alt="" />
                    </div>
                  </el-col>
                  <el-col :span="12">
                    <span>123456</span>
                    <span>用户</span>
                  </el-col>
                </el-row>
              </div>
            </el-col>
          </el-row>
        </div>
      </el-col>
    </el-row>
    <div class="time_box">
      <div>
        <el-radio-group v-model="radio4" size="mini">
          <el-radio-button label="今日"></el-radio-button>
          <el-radio-button label="昨日"></el-radio-button>
          <el-radio-button label="7日"></el-radio-button>
          <el-radio-button label="汇总"></el-radio-button>
        </el-radio-group>
      </div>
      <div class="date_box">
        <el-date-picker
          v-model="value1"
          type="datetimerange"
          range-separator="至"
          start-placeholder="开始时间"
          end-placeholder="结束时间"
        >
        </el-date-picker>
      </div>
      <div class="btn">
        <el-button type="primary">导出</el-button>
      </div>
    </div>
    <div class="plat_data">
      <span class="title">平台数据</span>
      <div class="data_box">
        <div>
          <span>新增用户</span>
          <span><i class="iconfont icon-yonghu"></i>101</span>
        </div>
        <div>
          <span>新增用户</span>
          <span><i class="iconfont icon-yonghu"></i>101</span>
        </div>
        <div>
          <span>新增用户</span>
          <span><i class="iconfont icon-yonghu"></i>101</span>
        </div>
        <div>
          <span>新增用户</span>
          <span><i class="iconfont icon-yonghu"></i>101</span>
        </div>
        <div>
          <span>新增用户</span>
          <span><i class="iconfont icon-yonghu"></i>101</span>
        </div>
      </div>
    </div>
    <el-row>
      <el-col :span="12">
        <div class="echart_box">
          <span class="title">近七日访问走势</span>
          <div>
            <div id="myChart" :style="{ width: '100%', height: '100%' }"></div>
          </div>
        </div>
      </el-col>
      <el-col :span="12">
        <div class="echart_box">
          <span class="title">近七日访问走势</span>
          <div>
            <div
              id="rightChart"
              :style="{ width: '100%', height: '100%' }"
            ></div>
          </div>
        </div>
      </el-col>
    </el-row>
    </el-scrollbar>
  </div>
</template>
<script>
export default {
  data() {
    return {
      radio4: "",
      value1: "今日",
    };
  },
  mounted() {
    this.drawLine();
    this.drawRIghtLine();
  
  },
  methods: {
    drawLine() {
      // 基于准备好的dom，初始化echarts实例
      let myChart = this.$echarts.init(document.getElementById("myChart"));
      // 绘制图表
      myChart.setOption({
        xAxis: {
          type: "category",
          data: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
        },
        legend: {
          data: ["访问量"],
        },
        grid: {
          left: "3%",
          right: "4%",
          bottom: "3%",
          containLabel: true,
        },
        yAxis: {
          type: "value",
        },
        series: [
          {
            name: "访问量",
            data: [150, 230, 224, 218, 135, 147, 260],
            type: "line",
          },
        ],
      });
    },
    drawRIghtLine() {
      // 基于准备好的dom，初始化echarts实例
      let myChart = this.$echarts.init(document.getElementById("rightChart"));
      // 绘制图表
      myChart.setOption({
        xAxis: {
          type: "category",
          data: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
        },
        legend: {
          data: ["一日后", "三日后"],
        },
        grid: {
          left: "3%",
          right: "4%",
          bottom: "3%",
          containLabel: true,
        },
        yAxis: {
          type: "value",
        },
        series: [
          {
            name: "一日后",
            data: [150, 230, 224, 218, 135, 147, 260],
            type: "line",
          },
          {
            name: "三日后",
            data: [225, 323, 132, 218, 223, 333, 563],
            type: "line",
          },
        ],
      });
    },
  },
};
</script>
<style lang="less" scoped>
.people_info,
.patent_info {
  &.patent_info {
    padding-bottom: 12px;
  }
  border: 1px solid #ccc;
  margin: 12px;
  span {
    display: block;
    text-align: center;
    font-size: 14px;
    line-height: 24px;
  }

  .img_box {
    text-align: center;
    img {
      width: 40px;
      height: 40px;
      border-radius: 50%;
    }
  }

  .info_box {
    padding: 32px;
    border-right: 1px solid #ccc;
  }
  .info_boxs {
    padding: 32px;
  }
}

.time_box {
  padding: 20px 16px;
  > div {
    display: inline-block;
    margin-right: 8px;
    &.btn {
      float: right;
    }
  }
}
.plat_data {
  border: 1px solid #ccc;
  margin: 12px;

  .title {
    display: block;
    padding: 16px;
    text-align: center;
    border-bottom: 1px solid #ccc;
  }
  .data_box {
    padding: 24px 0;
    > div {
      display: inline-block;
      width: 20%;
      span {
        display: block;
        text-align: center;
        font-size: 14px;
        padding: 8px 0;
      }
    }
  }
}
.title {
  display: block;
  line-height: 32px;
  padding: 0 12px;
  border-bottom: 1px solid #ccc;
  text-align: left;
  font-size: 14px;
}
.echart_box {
  border: 1px solid #ccc;
  margin: 12px;
  > div {
    height: 300px;
  }
}
</style>