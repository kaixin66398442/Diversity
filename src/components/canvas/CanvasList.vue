<template>
  <div class="canvas-list" @mousedown.stop="containerMousedown($event)">
    <CanvasListItem
      v-for="(block, index) in data.blocks"
      :index="index"
      :block="block"
      @mousedown="blockMousedown($event, block, index)"
      @contextmenu="onContextMenuBlock($event)"
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
import { inject, watch, onMounted, watchEffect } from "vue";
import { Data, Block } from "@/type/data";
import { useStore } from "@/store";
import { useFocus } from "@/hook/useFocus";
import { useDrag } from "@/hook/useDrag";
import { useCommand } from "@/hook/useCommand";
import { createComponent } from "@/hook/createVNode";

const store = useStore();

//引入data
const data: Data = inject("data")!;

//点击选中画布的block
const { focusData, lastSelectBlock, blockMousedown, containerMousedown } =
  useFocus(data, (e: any) => mouseDown(e));

//选中拖拽画布的block
const { mouseDown, markLine } = useDrag(focusData, lastSelectBlock, data);

//按钮操作
const { commands } = useCommand(data, focusData);

//右键点击出现菜单栏
const onContextMenuBlock = (e: MouseEvent) => {
  e.preventDefault();
  e.stopPropagation();

  //调用函数，动态创建组件
  createComponent(e, commands, store.canvas.canvasRef);
};

//监听lastSelectBlock,更新store.lastSelectBlock
watch(lastSelectBlock, (newval) => {
  store.canvas.lastSelectBlock = newval;
});
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

  // #dropdown {
  //   position: absolute;
  //   display: flex;
  //   flex-direction: column;
  //   justify-content: center;
  //   align-items: center;
  //   width: 70px;
  //   height: 250px;
  //   background-color: #ebe4e4;
  //   border: 1px dotted #9f9f9f;
  //   z-index: 2;

  //   button {
  //     margin: 2px;
  //   }
  // }
}
</style>
