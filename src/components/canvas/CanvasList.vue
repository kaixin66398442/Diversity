<template>
  <div class="canvas-list" ref="canvasListRef" id="center">

  </div>
</template>

<script setup lang="ts">
import { inject, ref, onMounted, watch, reactive, nextTick, toRefs } from "vue";
import { Data } from "@/type/data";
import { useStore } from "@/store";
// 引入x6的Graph
// 使用x6来配置网格背景
import { Graph } from "@antv/x6";


// 获取仓库
const store = useStore();
//引入data
const data: Data = inject("data")!;


// 背景网格容器
const canvasListRef = ref();

// 将graph设为全局变量
let graph: any;

onMounted(() => {
  // X6配置
  initGraph();
});

function initGraph() {
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
    initGraph();
  },
  {
    deep: true,
  }
);
</script>

<style scoped lang="scss">
.canvas-list {
  position: absolute;
  top: 0px;
  left: 0px;
  width: 100%;
  height: 100%;
  border-right: 0.5px solid #ddd;
  border-bottom: 0.5px solid #ddd;
}
</style>
