<template>
  <div class="background-grid" ref="backgroundGridRef"></div>
</template>

<script setup lang="ts">
import { ref, onMounted, inject, watch } from "vue";
import { useStore } from "@/store";
import { Data } from "@/type/data";
// 引入x6的Graph,使用x6来配置网格背景
import { Graph, Shape } from "@antv/x6";
// 获取仓库
const store = useStore();
//接收父组件传来的data
const data: Data = inject("data")!;

// 背景网格容器
const backgroundGridRef = ref();

// 将graph设为全局变量
let graph: any;

// 初始化graph
function initGraph() {
  graph = new Graph({
    container: backgroundGridRef.value,
    width: data.container.width,
    height: data.container.height,
    grid: {
      visible: store.operator.isShowGrid,
      size: store.operator.gridSpacingValue,
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

// 校验页面方向函数（横向模式和竖向模式）
function checkDirection() {
  if (
    store.operator.canvaDirectionValue === "transverse" &&
    data.container.width < data.container.height
  ) {
    [data.container.width, data.container.height] = [
      data.container.height,
      data.container.width,
    ];
  } else if (
    store.operator.canvaDirectionValue === "vertical" &&
    data.container.width > data.container.height
  ) {
    [data.container.width, data.container.height] = [
      data.container.height,
      data.container.width,
    ];
  }
}

onMounted(() => {
  // X6配置
  initGraph();
});

// 监听画布页面方向和预设画布类型
watch(
  () => [store.operator.canvaDirectionValue, store.operator.pageSizeValue],
  () => {
    checkDirection();
  },
  { immediate: true }
);

// 监听数据变化，重新绘制背景网格
watch(
  () => [
    store.operator.gridTypeValue,
    store.operator.gridSpacingValue,
    store.operator.gridColorMainValue,
    store.operator.gridColorSecondValue,
    store.operator.gridBackgroundColorValue,
    data,
    store.operator.isShowGrid,
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

<style scoped>
.background-grid {
  position: absolute;
  top: 0px;
  left: 0px;
  width: 100%;
  height: 100%;
}
</style>
