<template>
  <div
    class="canvas-list"
    ref="canvasListRef"
    @mousedown.stop="containerMousedown($event)"
  >
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
import { inject, ref, onMounted, watch, computed } from "vue";
import { Data } from "@/type/data";
import { useStore } from "@/store";
import { useFocus } from "@/hook/useFocus";
import { useDrag } from "@/hook/useDrag";
// 引入x6的Graph
// 使用x6来配置网格背景
import { Graph } from "@antv/x6";

const store = useStore();
//引入data
const data: Data = inject("data")!;

//点击选中画布的block
const { focusData, lastSelectBlock, blockMousedown, containerMousedown } =
  useFocus(data, (e: any) => mouseDown(e));

//选中拖拽画布的block
const { mouseDown, markLine } = useDrag(focusData, lastSelectBlock, data);

// 背景网格容器
const canvasListRef = ref();

// 将graph设为全局变量
let graph: any;

onMounted(() => {
  // X6配置
  init();
});

function init() {
  graph = new Graph({
    container: canvasListRef.value,
    width: data.container.width - 20,
    height: data.container.height - 20,
    grid: {
      size: store.operator.gridSpacingValue,
      visible: true,
      type: store.operator.gridTypeValue,
      args: [
        {
          color: store.operator.gridColorMainValue, // 主网格线颜色(mesh,dot,fixedDot)
          thickness: 1, // 主网格线宽度
        },
        {
          color: store.operator.gridColorSecondValue, // 次网格线颜色 (深)
          thickness: 1, // 次网格线宽度
          factor: 4, // 主次网格线间隔
        },
      ],
    },
  });
  graph.drawBackground({
    color: store.operator.gridBackgroundColorValue,
  });
}

// 监听数据变化，重新绘制背景网格
watch(
  () => [
    store.operator.gridTypeValue,
    store.operator.gridSpacingValue,
    store.operator.gridColorMainValue,
    store.operator.gridColorSecondValue,
    store.operator.gridBackgroundColorValue,
    data,
  ],
  () => {
    graph.dispose();
    init();
  },
  {
    deep: true,
  }
);
</script>

<style scoped lang="scss">
.canvas-list {
  position: absolute;
  top: 10px;
  left: 10px;
  width: 100%;
  height: 100%;
  border-right: 0.5px solid #ddd;
  border-bottom: 0.5px solid #ddd;

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
