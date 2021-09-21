<template>
  <div class="aside">
    <el-scrollbar style="height: 90%">
      <el-menu :default-openeds="['1', '3']">
        <el-menu-item index="7" @click="$router.push('/showindex')">
          <i class="el-icon-menu"></i>
          <span slot="title">主页</span>
        </el-menu-item>
        <el-submenu
          v-for="(item, index) in menuList"
          :key="index"
          :index="item.index"
        >
          <template slot="title"
            ><i class="el-icon-message"></i>{{ item.label }}</template
          >
          <el-menu-item-group v-for="(it, i) in item.children" :key="i">
            <el-menu-item :index="it.index" @click="$router.push(it.value)">{{
              it.label
            }}</el-menu-item>
          </el-menu-item-group>
        </el-submenu>
      </el-menu>
    </el-scrollbar>
  </div>
</template>
<script>
export default {
  data() {
    return {
      menuList: [
        {
          label: "专利管理",
          index: "1",
          children: [
            {
              label: "专利库",
              value: "/patentStore",
              index: "1-0",
            },
            {
              label: "专利预约",
              value: "/petentForword",
              index: "1-1",
            },
            {
              label: "需求管理",
              value: "/demandManage",
              index: "1-2",
            },
            {
              label: "成交记录",
              value: "/makeRecord",
              index: "1-3",
            },
          ],
        },
        {
          label: "服务机构",
          index: "2",
          children: [
            {
              label: "机构列表",
              value: "/organizationList",
              index: "2-0",
            },
          ],
        },
        {
          label: "创新中心",
          index: "3",
          children: [
            {
              label: "资讯列表",
              value: "/infoList",
              index: "3-0",
            },
          ],
        },
        {
          label: "企校通",
          index: "4",
          children: [
            {
              label: "企业管理",
              value: "/companyManage",
              index: "4-0",
            },
          ],
        },
        {
          label: "用户管理",
          index: "5",
          children: [
            {
              label: "用户列表",
              value: "/userList",
              index: "5-0",
            },
            {
              label: "认证审核",
              value: "/certAudit",
              index: "5-1",
            },
          ],
        },
        {
          label: "系统管理",
          index: "6",
          children: [
            {
              label: "关于我们",
              value: "/aboutUs",
              index: "6-0",
            },
            {
              label: "数据字典",
              value: "/diction",
              index: "6-1",
            },
            {
              label: "系统用户列表",
              value: "/systemUserList",
              index: "6-2",
            },
          ],
        },
      ],
    };
  },
};
</script>
<style lang="less" >
.aside {
  position: fixed;
  width: 210px;
  height: 100%;
  padding-top: 64px;
  background: #2d3d50;
  top: 0;

  .el-menu {
    border-right: none;
    background: none !important;
    .el-menu.el-menu--inline {
      background: none !important;
    }
  }
  .el-submenu__title,
  .el-menu-item-group__title,
  .el-menu-item {
    color: #f4f4f5;
  }
  .el-submenu__title:hover,
  .el-menu-item:hover {
    color: #409eff;
    background: rgba(255, 255, 255, 0.3);
  }
  .el-menu-item.is-active {
    background: rgba(255, 255, 255, 0.3);
  }
}
</style>