<template>
  <div class="patent_store">
    <Aside></Aside>
    <Header></Header>
    <router-view></router-view>
  </div>
</template>
<script>
import Header from "@/components/header";
import Aside from "@/components/aside";
export default {
  components: { Header, Aside },
};
</script>
<style lang="less">
.patent_store {
  padding-top: 64px;
}
</style>