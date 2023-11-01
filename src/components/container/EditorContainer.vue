<template>
  <!-- 中间画布区 -->
  <div class="editor-container">
    <div class="wrapper" ref="wapperRef" v-resize="handleResize">
      <!--  这个可以传入图标 -->
      <SketchRule :thick="state.thick" :scale="store.canvas.scale" :width="state.rulerWidth" :height="state.rulerHeight"
        :start-x="state.startX" :start-y="state.startY" :shadow="shadow" :isShowReferLine="state.isShowReferLine"
        :lines="state.lines">
      </SketchRule>
      <div id="screens" ref="screensRef" @wheel="handleWheel" @scroll="handleScroll">
        <div ref="containerRef" class="screen-container">
          <!-- 画布 -->
          <div id="canvas" ref="canvasRef" :style="canvasStyle">
            <!-- 背景网格 -->
            <BackgroundGrid></BackgroundGrid>
            <!-- 画布组件容器 -->
            <CanvasList></CanvasList>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import {
  computed,
  ref,
  reactive,
  onMounted,
  nextTick,
  inject,
  onBeforeUnmount,
} from "vue";

import { SketchRule } from "vue3-sketch-ruler";
import "vue3-sketch-ruler/lib/style.css";
import { useStore } from "@/store";
import { Data } from "@/type/data";

const key = ref(Date.now());
// 获取仓库
const store = useStore();

//接收父组件传来的data
const data: Data = inject("data")!; // ! 是 TypeScript 中的非空断言操作符

//rectWidth,rectHeight为画布宽高
const rectWidth = computed(() => data.container.width);
const rectHeight = computed(() => data.container.height);
const screensRef: any = ref(null);
const containerRef: any = ref(null);
const wapperRef: any = ref(null);
const canvasRef: any = ref(null);

//将canvasRef的值复制给store的canvas,传给其他组件
store.canvas.canvasRef = computed(() => canvasRef.value);

//标尺的属性
const state = reactive({
  startX: 0,
  startY: 0,
  //标尺的宽高
  rulerWidth: 0,
  rulerHeight: 0,
  lines: {
    h: [0, 750],
    v: [0, 525],
  },
  thick: 20,
  isShowRuler: true, // 显示标尺
  isShowReferLine: false, // 显示参考线
});


//背景阴影
const shadow = computed(() => {
  return {
    x: 0,
    y: 0,
    width: rectWidth.value,
    height: rectHeight.value,
  };
});

//画布尺寸
const canvasStyle = computed(() => {
  return {
    width: `${rectWidth.value}px`,
    height: `${rectHeight.value}px`,
    transform: `scale(${store.canvas.scale})`,
  };
});


//监听窗口变化改变标尺宽高
const handleResize = () => {
  state.rulerWidth = wapperRef.value?.offsetWidth - state.thick;
  state.rulerHeight = wapperRef.value?.offsetHeight - state.thick
};

onMounted(() => {
  handleResize();
  // 滚动居中
  screensRef.value.scrollLeft =
    containerRef.value.getBoundingClientRect().width / 2 - 200;
  screensRef.value.scrollTop =
    containerRef.value.getBoundingClientRect().height / 2 - 150;
});

// 控制滚动后画布的尺寸
const handleScroll = () => {
  const screensRect = document
    .querySelector("#screens")
    ?.getBoundingClientRect()!;
  const canvasRect = document
    .querySelector("#canvas")
    ?.getBoundingClientRect()!;

  // 标尺开始的刻度
  const startX =
    (screensRect.left + state.thick - canvasRect.left) / store.canvas.scale;
  const startY =
    (screensRect.top + state.thick - canvasRect.top) / store.canvas.scale;
  state.startX = startX;
  state.startY = startY;
};

// 控制缩放值
const handleWheel = (e: {
  ctrlKey: any;
  metaKey: any;
  preventDefault: () => void;
  deltaY: number;
}) => {
  if (e.ctrlKey || e.metaKey) {
    e.preventDefault();
    const nextScale = parseFloat(
      Math.max(0.2, store.canvas.scale - e.deltaY / 500).toFixed(2)
    );
    store.canvas.scale = nextScale;
  }
  nextTick(() => {
    handleScroll();
  });
};

// 滚动居中
// function scrollCenter() {
//   screensRef.value.scrollLeft =
//     containerRef.value.getBoundingClientRect().width / 2 - 20;
//   screensRef.value.scrollTop =
//     containerRef.value.getBoundingClientRect().height / 2 - 20;
// }

// onMounted(() => {
//   // 滚动居中
//   scrollCenter();
// });

// // 监控左右两个收缩的按钮，重新渲染整个容器组件
// // 不知道为啥不能重新渲染标尺组件
// // 监控左侧栏的宽度，宽度改变时重新渲染
// watch(
//   () => [store.operator.isShowOperator, store.material.isShowMaterial,store.material.materialWidth],
//   () => {
//     key.value = Date.now();
//     nextTick(() => {
//       // 滚动居中
//       scrollCenter()
//     });
//   }
// );
</script>

<style lang="scss" scoped>
.editor-container {
  flex: 1;
  position: relative;
  width: 100%;
  height: 91%;
  border-top: 1px solid rgba(0, 0, 0, 0.06);

  .wrapper {
    position: absolute;
    /* 特别注意,这个width要和传入组件的width成对应关系,
   也就是 780width +thick20 =800
   否则影子不和容器搭配,这个在2X中会进行自动匹配修正,省得配置麻烦
    */
    width: 100%;
    height: 100%;
    background-color: #ebebf1;
    // border: 1px solid #dadadc;
  }

  #screens {
    position: absolute;
    width: 100%;
    height: 100%;
    overflow: auto;

    /* 设置滚动条的样式 */
    &::-webkit-scrollbar {
      width: 6px;
      height: 6px;
      border-radius: 5px;
    }

    /* 滚动槽 */
    &::-webkit-scrollbar-track {
      background-color: #ebebf1;
    }

    /* 滚动条滑块 */
    &::-webkit-scrollbar-thumb {
      width: 100px;
      height: 100px;
      border-radius: 5px;
      background: #c9c9c9;
      border: 0.1px solid #fff;
      margin: 2px;
    }
  }

  .screen-container {
    position: absolute;
    width: 5000px;
    height: 3000px;
  }

  #canvas {
    position: absolute;
    top: 50%;
    left: 50%;
    background-color: #fff;
    background-size: 100% 100%;
    transform-origin: 50% 50%;
  }
}
</style>
