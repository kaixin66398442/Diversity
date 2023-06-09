<template>
  <!-- 中间画布区 -->
  <div class="editor-container">
    <!-- 产生滚动条 -->
    <div class="editor-container-canvas">
      <div
        class="editor-container-canvas-content"
        :style="containerStyles"
      ></div>
    </div>
  </div>
</template>

<script setup lang="ts">
// import useDataStore from '@/store/modules/data'
import { computed, defineProps } from "vue";
const props: any = defineProps({
  state: { type: Object },
});
const containerStyles = computed(() => ({
  width: props.state.container.width + "px",
  height: props.state.container.height + "px",
}));
// 获取小仓库对象
// let dataStore = useDataStore()
</script>

<style lang="scss" scoped>
.editor-container {
  padding: 100px 40px 35px 250px;
  height: 100%;
  box-sizing: border-box;
  background-color: #ebebf1;
  border-top: 1px solid rgba(0, 0, 0, 0.06);

  &-canvas {
    overflow: scroll;
    width: 100%;
    height: 100%;

    // /* 设置滚动条的样式 */
    // &::-webkit-scrollbar {
    //   width: 5px;
    //   height: 5px;
    //   border-radius: 5px;
    // }

    // /* 滚动槽 */
    // &::-webkit-scrollbar-track {
    //   background-color: #fff;
    // }

    // /* 滚动条滑块 */
    // &::-webkit-scrollbar-thumb {
    //   width: 20px;
    //   border-radius: 5px;
    //   background: #d2d3d4;
    // }

    &-content {
      width: 800px;
      height: 450px;
      margin: 20px auto;
      background-color: #e1e1e1;
      position: relative;
    }
  }
}
</style>
