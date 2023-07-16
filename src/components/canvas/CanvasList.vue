<template>
  <div class="canvas-list" @mousedown.stop="containerMousedown($event)">
    <CanvasListItem
      v-for="(block, index) in data.blocks"
      :index="index"
      :block="block"
      @mousedown="blockMousedown($event, block, index)"
    ></CanvasListItem>

    <!-- 纵向参考线 -->
    <div
      class="line-x"
      v-if="markLine.x"
      :style="{ left: markLine.x + 'px' }"
    ></div>
    <!-- 横向参考线 -->
    <div
      class="line-y"
      v-if="markLine.y"
      :style="{ top: markLine.y + 'px' }"
    ></div>
  </div>
</template>

<script setup lang="ts">
import { inject } from "vue";
import { Data } from "@/type/data";
import { useStore } from "@/store";
import { useFocus } from "@/hook/useFocus";
import { useDrag } from "@/hook/useDrag";

const store = useStore();

//引入data
const data: Data = inject("data")!;

//点击选中画布的block
const { focusData, lastSelectBlock, blockMousedown, containerMousedown } =
  useFocus(data, (e: any) => mouseDown(e));

//选中拖拽画布的block
const { mouseDown, markLine } = useDrag(focusData, lastSelectBlock, data);

//
</script>

<style scoped lang="scss">
.canvas-list {
  position: relative;
  width: 100%;
  height: 100%;

  // 移动left
  .line-x {
    position: absolute;
    top: 0;
    bottom: 0;
    border-left: 2px dashed rgb(157, 224, 240);
  }
  // 移动top
  .line-y {
    position: absolute;
    left: 0;
    right: 0;
    border-top: 2px dashed rgb(157, 224, 240);
  }
}
</style>
