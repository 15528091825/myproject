<template>
  <div class="layout">
    <!-- 左侧导航 -->
    <Leftmenu/>
    <!-- 右侧导航 -->
    <div class="main">
      <!-- 右侧头部 -->
      <Mainheader/>
      <!-- 右侧内容 -->
      <div class="content">
        <router-view class="maincontent"></router-view>
      </div>
    </div>
  </div>
</template>

<script>
import Leftmenu from "@/views/Layout/Layoutmenu.vue"
import Mainheader from "@/views/Layout/Mainheader.vue"
  export default {
    components:{
      Leftmenu,
      Mainheader
    }
  }
</script>

<style lang="less" scoped>
.layout {
  height: 100%;
  display: flex;

  .main {
    flex: 1;
    display: flex;
    flex-direction: column;
    background-color: #f0f2f5;
    .content {
      flex: 1;
      overflow-y: scroll;
      padding: 8px;
      /*隐藏滚轮*/
      &::-webkit-scrollbar {
        display: none;
      }
      .maincontent {
        background-color: #ffffff;
      }
    }
  }
}
</style>